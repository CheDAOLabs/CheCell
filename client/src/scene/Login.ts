const { regClass, property } = Laya;
 
import { getComponentValue } from '@latticexyz/recs';
import { NetMgr } from '../net/NetMgr';
import { Utils } from '../net/core';
import { LoginBase } from './Login.generated';
import { GAMEID, WORLDID } from '../common/Config';
 
 

@regClass()
export class Login extends LoginBase {
    net:any;
    onAwake() {
      this.login_button.on(Laya.Event.CLICK,this,this.onLoginButtonEvent.bind(this));

    }
    async onLoginButtonEvent(param: any): Promise<void> {
 
      await NetMgr.GetInstance().setup(this.address_input.text,this.private_input.text);
      const {    
          network:{
              account,
          },

          components:{
            Account,
            WorldInfo,
          },
          systemCalls:{
              InitWorld,
              InitAccount,
          }
         } = NetMgr.GetInstance().GetNet();
         console.log('init----');
         const world = getComponentValue(WorldInfo,Utils.getEntityIdFromKeys([GAMEID,WORLDID]));
         if(world == undefined){
            await InitWorld();
         }
         const entityid = account.address;
         console.log('entity    ',entityid);
         const ac = getComponentValue(Account,Utils.getEntityIdFromKeys([GAMEID,WORLDID,BigInt(entityid)]));
         
         if(ac == undefined){
            await InitAccount();
         }
        this.onChangeScene();

  }
    onChangeScene(){
        Laya.Scene.open("resources/scene/Home.ls",true, null, null,null);
        Laya.Scene.close("resources/scene/Login.ls")
        Laya.Scene.destroy("resources/scene/Login.ls")
    }
    onOpened(param: any): void {
     
    }
}
 