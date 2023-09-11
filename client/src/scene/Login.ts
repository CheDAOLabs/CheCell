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
      this.skip_button.on(Laya.Event.CLICK,this,this.onSkipButtonEvent.bind(this))
 
      this.onStoryScroll();
    }
    onStoryScroll(){
        Laya.timer.loop(100, this, () => {
          this.message_label.y -= 2;
      })
    }
    onSkipButtonEvent(param: any){
      Laya.timer.clearAll(this);
      this.story_image.visible = false;
      this.base.visible = true;
    }
    async onLoginButtonEvent(param: any): Promise<void> {
      if(!isNumericString(this.input.text)){
        Laya.Scene.open("resources/prefab/common/P_Common_Dialog.lh", false, {"text":'index error !'});
          return;
      }
      let data = this.onGetInitAccount(Number(this.input.text));
      await Laya.Scene.open("resources/prefab/common/P_Common_Loading.lh", false);
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
         
         const world = getComponentValue(WorldInfo,Utils.getEntityIdFromKeys([GAMEID,WORLDID]));
         if(world == undefined){
          //  console.log('init world');
            await InitWorld();
         }
 
         const ac = getComponentValue(Account,Utils.getEntityIdFromKeys([GAMEID,WORLDID,BigInt(account.address)]));
         
         if(ac == undefined){
         // console.log('init account');
            await InitAccount();
         }
        await Laya.Scene.close("resources/prefab/common/P_Common_Loading.lh");
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
        data.address = '0x33c627a3e5213790e246a917770ce23d7e562baa5b4d2917c23b1be6d91961c';
        data.privatekey = '0x333803103001800039980190300d206608b0070db0012135bd1fb5f6282170b';
      }else if(index == 2){
        data.address = '0x1d98d835e43b032254ffbef0f150c5606fa9c5c9310b1fae370ab956a7919f5';
        data.privatekey = '0x7ca856005bee0329def368d34a6711b2d95b09ef9740ebf2c7c7e3b16c1ca9c';
      }else if(index == 3){
        data.address = '0x697aaeb6fb12665ced647f7efa57c8f466dc3048556dd265e4774c546caa059';
        data.privatekey = '0x9f6d7a28c0aec0bb42b11600b2fdc4f20042ab6adeac0ca9e6696aabc5bc95';
      }
      return data;
    }
}
/*
| Account address |  0x3ee9e18edc71a6df30ac3aca2e0b02a198fbce19b7480a63a0d71cbd76652e0 
| Private key     |  0x300001800000000300000180000000000030000000000003006001800006600
| Public key      |  0x1b7b37a580d91bc3ad4f9933ed61f3a395e0e51c9dd5553323b8ca3942bb44e

| Account address |  0x33c627a3e5213790e246a917770ce23d7e562baa5b4d2917c23b1be6d91961c 
| Private key     |  0x333803103001800039980190300d206608b0070db0012135bd1fb5f6282170b
| Public key      |  0x4486e2308ef3513531042acb8ead377b887af16bd4cdd8149812dfef1ba924d

| Account address |  0x1d98d835e43b032254ffbef0f150c5606fa9c5c9310b1fae370ab956a7919f5 
| Private key     |  0x7ca856005bee0329def368d34a6711b2d95b09ef9740ebf2c7c7e3b16c1ca9c
| Public key      |  0x7006c42b1cfc8bd45710646a0bb3534b182e83c313c7bc88ecf33b53ba4bcbc

| Account address |  0x697aaeb6fb12665ced647f7efa57c8f466dc3048556dd265e4774c546caa059 
| Private key     |  0x9f6d7a28c0aec0bb42b11600b2fdc4f20042ab6adeac0ca9e6696aabc5bc95
| Public key      |  0x76e247c83b961e3ac33082406498a8629a51c1c9e465f4302018565ec1841ff
*/