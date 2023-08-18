import { getComponentValue } from "@latticexyz/recs";
import { NetMgr } from "../../net/NetMgr";
import { MapInfoPageBase } from "./MapInfoPage.generated";
import { Utils } from "../../net/core";
import { GAMEID, WORLDID } from "../../common/Config";
import { felt252ToStr } from "../../net/core/utils";
import { random } from "../../logic/rand";
import { getCurrentTimestamp, secondsToMinutes } from "../../common/Tool";

const { regClass, property } = Laya;
 
@regClass()
export class MapInfoPage extends MapInfoPageBase {
    c_id:number;
    onAwake() {
     
       this.explore_button.on(Laya.Event.CLICK,this,this.onExploreButtonEvent.bind(this));
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

        this.name_cur_value_label.text = felt252ToStr(cell_info.name);

        Laya.Tween.clearAll(this.cell_avatar);
        Laya.timer.clearAll(this);
        if(cell_info.state == 1){
            this.explore_button.disabled = true;
            this.count_down_image.visible = true;
            this.onCellAvatarAction1();
            if(Number(cell_info.explore_end_time) > getCurrentTimestamp()){
                Laya.timer.loop(1000, this, () => {
                    let time = Number(cell_info.explore_end_time)-getCurrentTimestamp();
                    this.count_down_value_label.text = secondsToMinutes(time);
                })
            }
             
        }else{
            this.count_down_image.visible = false;
        }
    }
    onExploreButtonEvent(param: any): void {
        Laya.Scene.open("resources/prefab/P_Exploration_Setup_Dialog.lh",false,this.c_id);
    }
    onCellAvatarAction1(){
        Laya.Tween.to(this.cell_avatar, {alpha:0}, 2000, Laya.Ease.expoInOut,Laya.Handler.create(this,this.onCellAvatarAction2.bind(this)))
    }
   
    onCellAvatarAction2(args:any){
        this.cell_avatar.x = Math.ceil(Math.random()*15)*106+106;
        this.cell_avatar.y = Math.ceil(Math.random()*5)*106+106;
        Laya.Tween.to(this.cell_avatar, {alpha:1}, 2000,Laya.Ease.expoInOut,Laya.Handler.create(this,this.onCellAvatarAction1.bind(this)));
    }
}
 