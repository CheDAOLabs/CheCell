const { regClass, property } = Laya;
 
import { NetMgr } from '../net/NetMgr';
import { KATANA_ACCOUNT_1_ADDRESS } from '../net/common/SetupNetwork';
import { Query, Utils } from '../net/core';
import { EntityIndex, getComponentValue } from '@latticexyz/recs';
import { LoginBase } from './Login.generated';
 

@regClass()
export class Login extends LoginBase {
    net:any;
    onAwake() {
        console.log("Login start");
        this.init_button.on(Laya.Event.CLICK,this,this.onInitButtonEvent.bind(this));
        this.add_button.on(Laya.Event.CLICK,this,this.onAddButtonEvent.bind(this));
        this.get_button.on(Laya.Event.CLICK,this,this.onGetButtonEvent.bind(this));
      //  NetMgr.getInstance().LoadMemory();

    }
    async onOpened(param: any): Promise<void> {
        this.net =  await NetMgr.GetInstance().setup();
        console.log('net   ',this.net);
       // await NetMgr.GetInstance().InitArgentX();
       
    }
 
    async onInitButtonEvent( ){
       
       const {
        network:{
            account  
        },
 
        systemCalls:{
            InitWorld,
            InitAccount,
        }
       } = this.net;
       console.log('init----');
 
       await InitWorld();
       await InitAccount();
       console.log(this.net);
    };
    async onAddButtonEvent( ){
        const {
            systemCalls:{
                CreateCell
            }
           } = this.net;
           console.log('add---');
           let p = 1;
           p += 2<<8;
           p += 3<<16;
           p += 4<<24;
           const name = Utils.strTofelt252Felt('add');
           console.log(name);
           console.log(Utils.felt252ToStr(name));
           await CreateCell(name,123,1,p);
           
           console.log(this.net);
        
    };
    async onGetButtonEvent( ){
        const {
            network:{
                account,
                syncWorker,
                provider
            },
            components:{
                Account,
                WorldInfo,
                Cell,
            },
   
           } = this.net;
         
           console.log('get---');
          const entityid = account.address;
           const value = getComponentValue(Cell,Utils.getEntityIdFromKeys([BigInt('1261689743971040193644'),BigInt('512970878052'),BigInt(entityid),BigInt(1)]));
           console.log(this.net);
           console.log(value);
 /*
 const GAME_ID:felt252 = 1261689743971040193644;
const WORLD_ID:felt252 = 512970878052;
           const value = getComponentValue(Cell,Utils.getEntityIdFromKeys([BigInt(entityid),BigInt(1)]));
           console.log(this.net);
           console.log(Utils.felt252ToStr(value.name));

           const value1 = getComponentValue(WorldInfo,Utils.getEntityIdFromKeys([BigInt(5201314)]));
           
           console.log(BigInt(value1.init_category));
        
    */
          // console.log(Utils.felt252ToStr(String(value.name)));
    };
    onChangeScene(){
        Laya.Scene.open("resources/scene/Home.ls",true, null, null,null);
        Laya.Scene.close("resources/scene/Login.ls")
        Laya.Scene.destroy("resources/scene/Login.ls")
    }
}
 