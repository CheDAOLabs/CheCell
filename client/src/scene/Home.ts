const { regClass, property } = Laya;
import { NetMgr } from '../net/NetMgr';
import { KATANA_ACCOUNT_1_ADDRESS } from '../net/common/SetupNetwork';
import { Query, Utils } from '../net/core';
import { EntityIndex, getComponentValue } from '@latticexyz/recs';
import { HomeBase } from './Home.generated';
 
import { CreateCellData, HomeManagerEvent } from '../common/Config';
@regClass()
export class Home extends HomeBase {
 
    onAwake() {
        console.log("Home start");
        this.info_button.on(Laya.Event.CLICK,this,this.onInfoButtonEvent.bind(this));
        this.map_button.on(Laya.Event.CLICK,this,this.onMapButtonEvent.bind(this));
       
        this.onSelect(0);

        Laya.stage.on(HomeManagerEvent.OnCreateCellEvent,this,this.onCreateCellEvent.bind(this));

        
    }
 
    async onOpened(param: any): Promise<void> {
        await NetMgr.GetInstance().setup();
        const {
 
            systemCalls:{
                InitWorld,
                InitAccount,
            }
           } = NetMgr.GetInstance().GetNet();
           console.log('init----');
     
           await InitWorld();
           await InitAccount();
           console.log(NetMgr.GetInstance().GetNet());
    }
    onInfoButtonEvent(param: any): void {
        this.onSelect(0);
    }
    onMapButtonEvent(param: any): void {
        this.onSelect(1);
    }
    private onSelect(index: number): void {
        this.info_button.selected = false;
        this.map_button.selected = false;
        this.reproduce_button.selected = false;
        this.leaderborad_button.selected = false;
        this.market_button.selected = false;
        switch (index) {
            case 0:
                this.info_button.selected = true;
                break;
            case 1:
                this.map_button.selected = true;
                break;
            case 2:
                this.reproduce_button.selected = true;
                break;
            case 3:
                this.leaderborad_button.selected = true;
                break;
            case 4:
                this.market_button.selected = true;
                break;
            default:
                break;
        }
        this.page_stack.selectedIndex = index;
    }
    async onCreateCellEvent(param: any): Promise<void> {
        let data = param as CreateCellData;

        const {
            systemCalls:{
                CreateCell
            }
           } = NetMgr.GetInstance().GetNet();
           console.log('add---');
           let property = data.color.r;
           property += data.color.g<<8;
           property += data.color.b<<16;
  
           const name = Utils.strTofelt252Felt(data.name);
           const seed = Utils.strTofelt252Felt(data.seed);
           await CreateCell(name,seed,property);
         
          
     }
  
 
    
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
 
            const component = 'WorldInfo';
            const query: Query = { address_domain: '0x1ab6f53cceb069a0aa1142b781321e05d3cbdd2060089a40f8d714cff8f583', partition:'0',keys: [BigInt(2),BigInt('1261689743971040193644'),BigInt('512970878052')] };
            const offset = 0;
            const length = 2;

            const result = await provider.entity(component, query);
          
            console.log('get---',result);
          // const entityid = account.address;
        //    const value = getComponentValue(Cell,Utils.getEntityIdFromKeys([BigInt('1261689743971040193644'),BigInt('512970878052'),BigInt(entityid),BigInt(1)]));
         //   console.log(this.net);
         //   console.log(value);
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
}
 