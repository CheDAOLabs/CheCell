const { regClass, property } = Laya;
import { NetMgr } from '../net/NetMgr';
import { KATANA_ACCOUNT_1_ADDRESS } from '../net/common/SetupNetwork';
import { Query, Utils } from '../net/core';
import { EntityIndex, getComponentValue } from '@latticexyz/recs';
import { HomeBase } from './Home.generated';
 
import { CreateCellData, GAMEID, HomeManagerEvent, NetManagerEvent, WORLDID } from '../common/Config';
import { truncateString } from '../common/Tool';
import { MapInfoPage } from '../ui/map/mapInfoPage';
@regClass()
export class Home extends HomeBase {
 
    onAwake() {
        console.log("Home start");
        this.info_button.on(Laya.Event.CLICK,this,this.onInfoButtonEvent.bind(this));
       // this.map_button.on(Laya.Event.CLICK,this,this.onMapButtonEvent.bind(this));
       
        this.onSelect(0);

        Laya.stage.on(HomeManagerEvent.OnCreateCell,this,this.onCreateCellEvent.bind(this));
        Laya.stage.on(HomeManagerEvent.OnPlayGame,this,this.onOnPlayGameEvent.bind(this));
        Laya.stage.on(HomeManagerEvent.OnEnhanceCellBodySizeConfirm,this,this.OnEnhanceCellBodySizeConfirmEvent.bind(this));
        Laya.stage.on(HomeManagerEvent.OnEnhanceCellPropertyConfirm,this,this.onEnhanceCellPropertyConfirmEvent.bind(this));
        Laya.stage.on(HomeManagerEvent.OnExplore,this,this.onExploreEvent.bind(this));

         
    }
 
    async onOpened(param: any): Promise<void> {
        await NetMgr.GetInstance().setup();
        const {
            network:{
                account,
                WorldInfo,
            },
            systemCalls:{
                InitWorld,
                InitAccount,
            }
           } = NetMgr.GetInstance().GetNet();
           console.log('init----');
     
           await InitWorld();
           await InitAccount();
           const entityid = account.address;
            this.address_text.text = truncateString(entityid,10);
           console.log('net:  ',NetMgr.GetInstance().GetNet());
     
    }
    onInfoButtonEvent(param: any): void {
        this.onSelect(0);
       // this.onGetButtonEvent();
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
           const result = await CreateCell(name,seed,property);
           Laya.stage.event(NetManagerEvent.OnCreateCellCB,result);
           console.log('net:  ',NetMgr.GetInstance().GetNet());
          
     }
     onOnPlayGameEvent(param: any): void {
        this.onSelect(1);
        (this.page_stack.selection as MapInfoPage).SetData(param);
    }
    async OnEnhanceCellBodySizeConfirmEvent(param: any){
 
        const {
            systemCalls:{
                AddCellBodySize
            }
           } = NetMgr.GetInstance().GetNet();
    
           const result = await AddCellBodySize(param);
           Laya.stage.event(NetManagerEvent.OnEnhanceCellBodySizeCB,result);
            
           console.log('net:  ',NetMgr.GetInstance().GetNet());
    }
    async onEnhanceCellPropertyConfirmEvent(param: any){
       
        const {
            systemCalls:{
                AddCellProperty
            }
           } = NetMgr.GetInstance().GetNet();
           let property = param.color.r;
           property += param.color.g<<8;
           property += param.color.b<<16;
           await AddCellProperty(param.c_id,param.p_id,property);
           console.log('net:  ',NetMgr.GetInstance().GetNet());
    }
    async onExploreEvent(param: any){
        console.log('onExploreEvent');
 
        const {
            systemCalls:{
                CellExplore
            }
           } = NetMgr.GetInstance().GetNet();
 
           await CellExplore(param.c_id,param.time);
           console.log('net:  ',NetMgr.GetInstance().GetNet());
    }
 
}
 