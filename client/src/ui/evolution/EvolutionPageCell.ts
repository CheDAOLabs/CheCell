import { HasValue, getComponentValue } from "@latticexyz/recs";
import { NetMgr } from "../../net/NetMgr";
import { Utils } from "../../net/core";
 
import { CellListPageType, CellState, GAMEID, HomeManagerEvent, WORLDID } from "../../common/Config";
import { EvolutionPageCellBase } from "./EvolutionPageCell.generated";
import { felt252ToStr } from "../../net/core/utils";
import { getCurrentTimestamp, secondsToMinutes } from "../../common/Tool";
import { CellListItem } from "../common/CellListItem";

const { regClass, property } = Laya;
 
@regClass()
export class EvolutionPageCell extends EvolutionPageCellBase {
    c_id:number;
    selected_node:Laya.Node;
    onAwake() {
        this.result_button.on(Laya.Event.CLICK,this,this.onResultButtonEvent.bind(this));
        Laya.stage.on(HomeManagerEvent.OnTouchEvolutionCell,this,this.onTouchEvolutionCellEvent.bind(this));
     
    }
    onResultButtonEvent(param: any): void {
        Laya.stage.event(HomeManagerEvent.OnEvolutionGain,this.c_id);  
         
     }
    onUpdateCellList(): void {
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
                    if(cell_info.state == CellState.Evolving){
                        let data = {
                            name:felt252ToStr(cell_info.name),
                            index:i+1,
                            type:CellListPageType.Evolving
                        }
                        script.SetData(data);
                        item.x = 10;
                        item.y = 5+index*70;
                        this.cell_list.addChildAt(item,index);
                        if(index == 0){
                            this.onTouchEvolutionCellEvent(1);
                            script.onSelected(true);
                        };
                        index++;
                    }
                     
                }
        });
        
     }
     onTouchEvolutionCellEvent(param: any): void {
        if(this.selected_node != undefined){
            (this.selected_node.getComponent(Laya.Script) as CellListItem).onSelected(false);
        }
          
        this.selected_node = this.cell_list.getChildAt(param-1);
        (this.selected_node.getComponent(Laya.Script) as CellListItem).onSelected(true);
        const index = (this.selected_node.getComponent(Laya.Script) as CellListItem).index;
     
        this.SetData(index);

     }
     SetData(c_id:number){
        
        this.c_id = c_id;
        const {
            network:{
                account,
            },
            components:{
                
                Cell,
            },
   
           } = NetMgr.GetInstance().GetNet();
        const entityid = account.address;
           
        const cell_info = getComponentValue(Cell,Utils.getEntityIdFromKeys([GAMEID,WORLDID,BigInt(entityid),BigInt(c_id)]));
 
        Laya.timer.clearAll(this);
        if(Number(cell_info.evolution_end_time) > getCurrentTimestamp()){
            let time = Number(cell_info.evolution_end_time)-getCurrentTimestamp();
            this.count_down_value_label.text = secondsToMinutes(time);
            this.onUpdateUI(1);
            Laya.timer.loop(1000, this, () => {
                if(Number(cell_info.evolution_end_time) > getCurrentTimestamp()){
                    let time = Number(cell_info.evolution_end_time)-getCurrentTimestamp();
                    this.count_down_value_label.text = secondsToMinutes(time);
                }else{
                    Laya.timer.clearAll(this);
                  
                    this.onUpdateUI(0);
                }
            })
        }else{
            this.onUpdateUI(0);
        }
    }
    onUpdateUI(type:number){
        if(type == 0){
            this.result_button.visible = true;
            this.count_down_value_label.visible = false;
            this.count_down_label.text = 'Evolution Complete';
        }else if(type == 1){
            this.result_button.visible = false;
            this.count_down_value_label.visible = true;
            this.count_down_label.text = 'Evolution Countdown';
        } 
    }
}
 