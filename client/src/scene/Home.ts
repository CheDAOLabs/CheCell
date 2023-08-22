const { regClass, property } = Laya;
import { NetMgr } from '../net/NetMgr';
import { KATANA_ACCOUNT_1_ADDRESS } from '../net/common/SetupNetwork';
import { Query, Utils } from '../net/core';
import { EntityIndex, getComponentValue } from '@latticexyz/recs';
import { HomeBase } from './Home.generated';
 
import { CreateCellData, GAMEID, HomeManagerEvent, NetManagerEvent, WORLDID } from '../common/Config';
import { truncateString } from '../common/Tool';
import { getEntities } from '../net/core/network/graphql';
import { GetGraphQLUrl } from '../net/core/constants';
import { MapInfoPage } from '../ui/map/MapInfoPage';
import { CellInfoPage } from '../ui/info/CellInfoPage';
@regClass()
export class Home extends HomeBase {
 
    onAwake() {
        console.log("Home start");
        this.info_button.on(Laya.Event.CLICK,this,this.onInfoButtonEvent.bind(this));
       // this.map_button.on(Laya.Event.CLICK,this,this.onMapButtonEvent.bind(this));
       this.evolution_button.on(Laya.Event.CLICK,this,this.onEvolutionButtonEvent.bind(this));
        this.onSelect(0);

        Laya.stage.on(HomeManagerEvent.OnCreateCell,this,this.onCreateCellEvent.bind(this));
        Laya.stage.on(HomeManagerEvent.OnPlayGame,this,this.onOnPlayGameEvent.bind(this));
        Laya.stage.on(HomeManagerEvent.OnEnhanceCellBodySizeConfirm,this,this.OnEnhanceCellBodySizeConfirmEvent.bind(this));
        Laya.stage.on(HomeManagerEvent.OnEnhanceCellPropertyConfirm,this,this.onEnhanceCellPropertyConfirmEvent.bind(this));
        Laya.stage.on(HomeManagerEvent.OnExplore,this,this.onExploreEvent.bind(this));
        Laya.stage.on(HomeManagerEvent.OnGain,this,this.onGainEvent.bind(this));

         
    }
 
    async onOpened(param: any): Promise<void> {
       
        const {
            network:{
                account,
            },
  
           } = NetMgr.GetInstance().GetNet();
            console.log('net  ',NetMgr.GetInstance().GetNet());
            const entityid = account.address;
            this.address_text.text = truncateString(entityid,10);    
    }
    onInfoButtonEvent(param: any): void {
        this.onSelect(0);
        (this.page_stack.selection as CellInfoPage).onRefresh();
    }

    onMapButtonEvent(param: any): void {
        this.onSelect(1);
    }
    onEvolutionButtonEvent(param: any): void {
        this.onSelect(2);
    }
    private onSelect(index: number): void {
        this.info_button.selected = false;
        this.map_button.selected = false;
        this.evolution_button.selected = false;
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
                this.evolution_button.selected = true;
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
           const result = await AddCellProperty(param.c_id,param.p_id,property);
           Laya.stage.event(NetManagerEvent.OnEnhanceCellPropertyCB,result);

    }
    async onExploreEvent(param: any){
        
        const {
            systemCalls:{
                CellExplore
            }
           } = NetMgr.GetInstance().GetNet();
 
           const result = await CellExplore(param.c_id,param.time);
           Laya.stage.event(NetManagerEvent.OnExploreCB,result);
    }
    async onGainEvent(param: any){
       
        const {
            systemCalls:{
                CellExploreGain
            }
           } = NetMgr.GetInstance().GetNet();
           console.log('-------------',param);
           const result = await CellExploreGain(param);
           Laya.stage.event(NetManagerEvent.OnGainCB,result);
    }
}
 