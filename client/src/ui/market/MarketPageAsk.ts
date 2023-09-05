const { regClass, property } = Laya;
 
import { getComponentValue } from '@latticexyz/recs';
import { CellListPageType, GAMEID, HomeManagerEvent, WORLDID } from '../../common/Config';
import { getCellInfo1,getCellInfo2 } from '../../logic/gamelogic';
import { NetMgr } from '../../net/NetMgr';
import { Utils } from '../../net/core';
import { CellListItem } from '../common/CellListItem';
import { felt252ToStr } from '../../net/core/utils';
import { MarketPageAskBase } from './MarketPageAsk.generated';
import { MarketPageAskCategorySelectedItem } from './MarketPageAskCategorySelectedItem';
import { isBitSet, isNumericString, setBitToOne, setBitToZero } from '../../common/Tool';
import { CellAvatar } from '../common/CellAvatar';
 
@regClass()
export class MarketPageAsk extends MarketPageAskBase {
    selected_node:Laya.Node;
    category:number;
    onAwake() {
        Laya.stage.on(HomeManagerEvent.OnTouchMarketCell,this,this.onTouchMarketCellEvent.bind(this));
        Laya.stage.on(HomeManagerEvent.OnTouchMarketAskItem,this,this.onTouchMarketAskItemEvent.bind(this));
      
         
        this.confirm_button.on(Laya.Event.CLICK,this,this.onConfirmButtonEvent.bind(this));
        
    }
    onRefresh(){
        this.UpdateCellList();
    }
    UpdateCellList(): void {
        this.category = 0;
        this.cell_info.visible = false;
        this.selected_node =undefined;
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
                            type:CellListPageType.Market
                        }
                        script.SetData(data);
                        item.x = 10;
                        item.y = 5+index*70;

                        this.cell_list.addChildAt(item,index);
                 
                        if(index == 0){
                            this.onTouchMarketCellEvent(1);
                            script.onSelected(true);
                        };
                        index++;
                    }
                }
        });
        
     }
    onTouchMarketCellEvent(param: any): void {
        if(this.selected_node != undefined){
            (this.selected_node.getComponent(Laya.Script) as CellListItem).onSelected(false);
        }
        
        this.selected_node = this.cell_list.getChildAt(param-1);
        (this.selected_node.getComponent(Laya.Script) as CellListItem).onSelected(true);
        const index = (this.selected_node.getComponent(Laya.Script) as CellListItem).index;
        this.onUpdateCellInfo(index);
     }
     onTouchMarketAskItemEvent(param: any){
        this.category = setBitToOne(this.category,param);
     }
    onUpdateCellInfo(c_id:number){
        this.cell_info.visible = true;
        const info = getCellInfo1(c_id);
        (this.cell_avatar as CellAvatar).SetAvatar(Number(info.cell_info.avatar));
        this.breed_count_value_label.text = (info.cell_info.breed_count).toString();
        this.stock_value_label_2.text = info.cell_info.exp.toString()+')';
        for (let i = 0; i < 9; i++) {
            if(isBitSet(Number(info.cell_info.category),i)){
                (this.category_group.getChildAt(i).getComponent(Laya.Script) as MarketPageAskCategorySelectedItem).SetGray(false);
            }else{
                (this.category_group.getChildAt(i).getComponent(Laya.Script) as MarketPageAskCategorySelectedItem).SetGray(true);
            }
         } 
    }
    onConfirmButtonEvent(param:any){
        if(isNumericString(this.pay_input.text) == false || this.pay_input.text == '0'){
            let message = 'cost set error'; 
            Laya.Scene.open("resources/prefab/common/P_Common_Dialog.lh", false, {"text":message});
            return;
        }
        
        (this.selected_node.getComponent(Laya.Script) as CellListItem).index;
        let data = {
            c_id:(this.selected_node.getComponent(Laya.Script) as CellListItem).index,
            category:this.category,
            pay_number:Number(this.pay_input.text),
        }
        console.log(data);
        Laya.stage.event(HomeManagerEvent.OnCellBreedAsk,data);  
    }
}
 