import { getComponentValue } from "@latticexyz/recs";
import { NetMgr } from "../../net/NetMgr";
import { MapInfoPageBase } from "./MapInfoPage.generated";
import { Utils } from "../../net/core";
import { CCMapType, GAMEID, HomeManagerEvent, NetManagerEvent, WORLDID } from "../../common/Config";
import { felt252ToStr } from "../../net/core/utils";
import { random } from "../../logic/rand";
import { getCurrentTimestamp, getRandomEnumValue, secondsToMinutes } from "../../common/Tool";
import { MapSquareItem } from "./MapSquareItem";
import { getCCMapRender } from "../../logic/gamelogic";

const { regClass, property } = Laya;
 
@regClass()
export class MapInfoPage extends MapInfoPageBase {
    c_id:number;
    onAwake() {
     
       this.explore_button.on(Laya.Event.CLICK,this,this.onExploreButtonEvent.bind(this));
       this.gain_button.on(Laya.Event.CLICK,this,this.onGainButtonEvent.bind(this));
       Laya.stage.on(NetManagerEvent.OnExploreCB,this,this.onExploreCBEvent.bind(this));
       Laya.stage.on(NetManagerEvent.OnGainCB,this,this.onGainCBEvent.bind(this));
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
        this.cell_avatar.skin = 'resources/ui/cell/cell_00'+(Number(cell_info.avatar)/16).toString()+'00.png';
        Laya.Tween.clearAll(this.cell_avatar);
        Laya.timer.clearAll(this);
        if(cell_info.state == 1){
            
            this.count_down_value_label.text = secondsToMinutes(Number(cell_info.explore_end_time)-getCurrentTimestamp());
            this.count_down_image.visible = true;
            this.onCellAvatarAction1();
            if(Number(cell_info.explore_end_time) > getCurrentTimestamp()){
                this.onExploreUI(1);
                Laya.timer.loop(1000, this, () => {
                    if(Number(cell_info.explore_end_time) > getCurrentTimestamp()){
                        let time = Number(cell_info.explore_end_time)-getCurrentTimestamp();
                        this.count_down_value_label.text = secondsToMinutes(time);
                    }else{
                        Laya.timer.clearAll(this);
                        Laya.Tween.clearAll(this.cell_avatar);
                        this.onExploreUI(2);
                    }
                })
            }else{
                this.onExploreUI(2);
            }
            this.UpdateMap(getCCMapRender(Number(cell_info.map)));
        }else{
            this.onExploreUI(0);
        }
 
    
    }
    onExploreUI(type:number){
        console.log(type);
        if(type == 0){
            this.explore_button.visible = true;
            this.gain_button.visible = false;
            this.count_down_image.visible = false;
        }else if(type == 1){
            this.explore_button.visible = false;
            this.gain_button.visible = false;
            this.count_down_image.visible = true;
        }else{
            this.explore_button.visible = false;
            this.gain_button.visible = true;
            this.count_down_image.visible = false;
        }
    }
    onExploreButtonEvent(param: any): void {
        Laya.Scene.open("resources/prefab/map/P_Exploration_Setup_Dialog.lh",false,this.c_id);
    }
    onGainButtonEvent(param: any): void {
        Laya.stage.event(HomeManagerEvent.OnGain,this.c_id);  
    }
    UpdateMap(type:string){
        const cells = this.map_list.cells;
       
        for (let item of cells){
            (item.getComponent(Laya.Script) as MapSquareItem).SetColor(type);
        }
    }
     
    onExploreCBEvent(param: any){
        let message ='';
        if(param){
            message = 'Start explore success!';
        }else{
            message = 'Start explore error!';
        }
         
        Laya.Scene.open("resources/prefab/common/P_Common_Dialog.lh", false, {"text":message});
        this.SetData(this.c_id);
    }
    onGainCBEvent(param: any){
        let message ='';
      
        const {
            network:{
                account,
            },
            components:{
                
                Cell,
            },
   
           } = NetMgr.GetInstance().GetNet();
        const entityid = account.address;
           
        const cell_info = getComponentValue(Cell,Utils.getEntityIdFromKeys([GAMEID,WORLDID,BigInt(entityid),BigInt(this.c_id)]));

        if(param){
            message = 'Get reword '+Number(cell_info.bonus).toString()+" exp !";
        }else{
            message = 'Get reword error!';
        }
         
        Laya.Scene.open("resources/prefab/common/P_Common_Dialog.lh", false, {"text":message});
        this.SetData(this.c_id);
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
 