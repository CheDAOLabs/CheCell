const { regClass, property } = Laya;
 
import { getComponentValue } from '@latticexyz/recs';
import { NetMgr } from '../net/NetMgr';
import { Utils } from '../net/core';
import { LoginBase } from './Login.generated';
import { GAMEID, WORLDID } from '../common/Config';
import { isNumericString } from '../common/Tool';
 
 

@regClass()
export class Login extends LoginBase {
    net:any;
    onAwake() {
      this.login_button.on(Laya.Event.CLICK,this,this.onLoginButtonEvent.bind(this));

    }
    async onLoginButtonEvent(param: any): Promise<void> {
      if(!isNumericString(this.input.text)){
        Laya.Scene.open("resources/prefab/common/P_Common_Dialog.lh", false, {"text":'index error !'});
          return;
      }
      let data = this.onGetInitAccount(Number(this.input.text));
      await NetMgr.GetInstance().setup(data.address,data.privatekey);
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
            console.log('init world');
            await InitWorld();
         }
 
         const ac = getComponentValue(Account,Utils.getEntityIdFromKeys([GAMEID,WORLDID,BigInt(account.address)]));
         
         if(ac == undefined){
          console.log('init account');
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
    onGetInitAccount(index:number){
      let data = {
        address:'',
        privatekey:''
      }
      if(index == 0){
        data.address = '0x517ececd29116499f4a1b64b094da79ba08dfd54a3edaa316134c41f8160973';
        data.privatekey = '0x1800000000300000180000000000030000000000003006001800006600';
      }else if(index == 1){
        data.address = '0x5686a647a9cdd63ade617e0baf3b364856b813b508f03903eb58a7e622d5855';
        data.privatekey = '0x33003003001800009900180300d206308b0070db00121318d17b5e6262150b';
      }else if(index == 2){
        data.address = '0x765149d6bc63271df7b0316537888b81aa021523f9516a05306f10fd36914da';
        data.privatekey = '0x1c9053c053edf324aec366a34c6901b1095b07af69495bffec7d7fe21effb1b';
      }else if(index == 3){
        data.address = '0x5006399928dad095cc39818cae15dc022592d47d883701e7814c9db19e96efc';
        data.privatekey = '0x736adbbcdac7cc600f89051db1abbc16b9996b46f6b58a9752a11c1028a8ec8';
      }
      return data;
    }
}
 