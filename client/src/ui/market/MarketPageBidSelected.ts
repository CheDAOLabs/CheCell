const { regClass, property } = Laya;
 
import { getComponentValue } from '@latticexyz/recs';
import { CellListPageType, GAMEID, HomeManagerEvent, WORLDID } from '../../common/Config';
import { getCellInfo1,getCellInfo2 } from '../../logic/gamelogic';
import { NetMgr } from '../../net/NetMgr';
import { Utils } from '../../net/core';
import { CellListItem } from '../common/CellListItem';
import { felt252ToStr } from '../../net/core/utils';
import { MarketPageAskCategorySelectedItem } from './MarketPageAskCategorySelectedItem';
import { bitToCategory, isBitSet, setBitToOne, setBitToZero } from '../../common/Tool';
import { MarketPageBidSelectedBase } from './MarketPageBidSelected.generated';
 
@regClass()
export class MarketPageBidSelected extends MarketPageBidSelectedBase {
    selected_node:Laya.Node;
    t_id:bigint;
    cost:number;
    category:number;
    onAwake() {
        Laya.stage.on(HomeManagerEvent.OnTouchMarketBidCell,this,this.onTouchMarketBidCellEvent.bind(this));
       
        this.confirm_button.on(Laya.Event.CLICK,this,this.onConfirmButtonEvent.bind(this));
        this.cancel_button.on(Laya.Event.CLICK,this,this.onCancelButtonEvent.bind(this));
        
    }
    onSetData(data:any){
        this.t_id = data.t_id;
        this.cost = data.cost;
        this.category = data.category;
        this.UpdateCellList();
    }
    onRefresh(){
        this.UpdateCellList();
    }
    UpdateCellList(): void {
        this.cell_info.visible = false;
        this.selected_node = undefined;
        this.cell_list.removeChildren();

        Laya.loader.load("resources/prefab/common/P_Common_Page_Cell_List_Item.lh").then((res)=>{
            const {
                network:{
                    account,
                },
                components:{
                    Account,
                    Cell,
                },
       
               } = NetMgr.GetInstance().GetNet();
     
                const entityid = account.address;
                const value = getComponentValue(Account,Utils.getEntityIdFromKeys([GAMEID,WORLDID,BigInt(entityid)]));
                if (value === undefined) {
                    return;
                }
                const cell_max = Number(value.cell_number);
                let index = 0;
                for (var i: number = 0; i < cell_max; i++) {
                    let item = res.create();
                    let script = item.getComponent(Laya.Script) as CellListItem;
                    const cell_info = getComponentValue(Cell,Utils.getEntityIdFromKeys([GAMEID,WORLDID,BigInt(entityid),BigInt(i+1)]));
                    if(cell_info.state == 0){
                        let data = {
                            name:felt252ToStr(cell_info.name),
                            index:i+1,
                            type:CellListPageType.MarketBid
                        }
                        script.SetData(data);
                         
                        this.cell_list.addChildAt(item,index);
                        if(index == 0){
                            this.onTouchMarketBidCellEvent(1);
                            script.onSelected(true);
                        };
                        index++;
                    }
                }
        });
        
     }
    onTouchMarketBidCellEvent(param: any): void {
        if(this.selected_node != undefined){
            (this.selected_node.getComponent(Laya.Script) as CellListItem).onSelected(false);
        }
       
        this.selected_node =  this.cell_list.getChildAt(param-1);
        (this.selected_node.getComponent(Laya.Script) as CellListItem).onSelected(true);
        const index = (this.selected_node.getComponent(Laya.Script) as CellListItem).index;
        this.onUpdateCellInfo(index);
     }
    
    onUpdateCellInfo(c_id:number){
        this.cell_info.visible = true;
        const info = getCellInfo1(c_id);
        this.category_value_label.text = bitToCategory(Number(info.cell_info.category));
        this.cost_value_label.text = this.cost.toString();
    }
    onConfirmButtonEvent(param:any){
         
        let data = {
            c_id:(this.selected_node.getComponent(Laya.Script) as CellListItem).index,
            category:this.category,
            t_id:this.t_id
        }
        Laya.stage.event(HomeManagerEvent.OnCellBreedBid,data);  
    }
    onCancelButtonEvent(param:any){
 
        Laya.stage.event(HomeManagerEvent.OnCellBreedBidCancel);  
    }
}
 