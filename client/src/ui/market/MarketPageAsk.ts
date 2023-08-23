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
import { isBitSet } from '../../common/Tool';
 
@regClass()
export class MarketPageAsk extends MarketPageAskBase {
    selected_node:Laya.Node;
    onAwake() {
        Laya.stage.on(HomeManagerEvent.OnTouchMarketCell,this,this.onTouchMarketCellEvent.bind(this));
    }
    onEnable(): void {
       
    }
    onOpened(param: any):void{

    }
    UpdateCellList(): void {
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
                for (var i: number = 0; i < cell_max; i++) {
                    let item = res.create();
                    let script = item.getComponent(Laya.Script) as CellListItem;
                    const cell_info = getComponentValue(Cell,Utils.getEntityIdFromKeys([GAMEID,WORLDID,BigInt(entityid),BigInt(i+1)]));
                    if(cell_info.state == 0){
                        let data = {
                            name:felt252ToStr(cell_info.name),
                            index:i,
                            type:CellListPageType.Market
                        }
                        script.SetData(data);
                         
                        this.cell_list.addChildAt(item,i);
                        if(i == 0){
                            this.selected_node = this.cell_list.getChildAt(0);
               
                            this.onTouchMarketCellEvent(0);
                            script.onSelected(true);
                        };
                    }
                    
                }
        });
        
     }
    onTouchMarketCellEvent(param: any): void {
        
        (this.selected_node.getComponent(Laya.Script) as CellListItem).onSelected(false);
         
        this.selected_node =  this.cell_list.getChildAt(param);
        (this.selected_node.getComponent(Laya.Script) as CellListItem).onSelected(true);
   
        this.onUpdateCellInfo(param+1);
     }
        onUpdateCellInfo(c_id:number){
            const info = getCellInfo1(c_id);
            console.log(info);
            this.breed_count_value_label.text = (info.cell_info.breed_count).toString();
            for (let i = 0; i < 9; i++) {
                
                console.log(isBitSet(Number(info.cell_info.category),i));
                if(isBitSet(Number(info.cell_info.category),i)){
                   (this.category_group.getChildAt(i).getComponent(Laya.Script) as MarketPageAskCategorySelectedItem).SetGray(false);
                }else
                {
                    (this.category_group.getChildAt(i).getComponent(Laya.Script) as MarketPageAskCategorySelectedItem).SetGray(true);
                }
            }
    }
 
}
 