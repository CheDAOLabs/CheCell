import { HasValue, getComponentValue } from "@latticexyz/recs";
import { NetMgr } from "../../net/NetMgr";
import { Utils } from "../../net/core";
 
import { CellState, GAMEID, NetManagerEvent, WORLDID } from "../../common/Config";
import { EvolutionPageBase } from "./EvolutionPage.generated";
import { EvolutionPageCell } from "./EvolutionPageCell";

const { regClass, property } = Laya;
 
@regClass()
export class EvolutionPage extends EvolutionPageBase {
    index:number;
    onAwake() {
        this.index = 0;
        Laya.stage.on(NetManagerEvent.OnEvolutionGainCB,this,this.onEvolutionGainCBEvent.bind(this));
    }
    public onRefresh(){
         
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
            let has_evo = false;
            for (var i: number = 0; i < cell_max; i++) {
                const cell_info = getComponentValue(Cell,Utils.getEntityIdFromKeys([GAMEID,WORLDID,BigInt(entityid),BigInt(i+1)]));
                if(cell_info.state == CellState.Evolving){
                    has_evo = true;
                    break;
                }
            }
            if(has_evo){
                this.index = 1;
            }else{
                this.index = 0;
            }
            this.onSelect(this.index);
    }
    private onSelect(index: number): void {
        this.index = index;
        this.item0Page.selectedIndex = index;
        if(this.index == 1){
            (this.item0Page.selection as EvolutionPageCell).onUpdateCellList();
        }
    }
    onEvolutionGainCBEvent(param: any): void {
        let message ='';
        if(param){
            message = 'Evolution Gain success!';
        }else{
            message = 'Evolution Gain error!';
        }
         
        Laya.Scene.open("resources/prefab/common/P_Common_Dialog.lh", false, {"text":message});
        this.onRefresh();
     }
}
 