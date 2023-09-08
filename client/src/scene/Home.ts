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
import { EvolutionPage } from '../ui/evolution/EvolutionPage';
import { LeaderBoardPage } from '../ui/leaderboard/LeaderBoardPage';
import { MarketPage } from '../ui/market/MarketPage';
@regClass()
export class Home extends HomeBase {
 
    onAwake() {
        console.log("Home start");
        this.info_button.on(Laya.Event.CLICK,this,this.onInfoButtonEvent.bind(this));
       // this.map_button.on(Laya.Event.CLICK,this,this.onMapButtonEvent.bind(this));
        this.evolution_button.on(Laya.Event.CLICK,this,this.onEvolutionButtonEvent.bind(this));
        this.ranking_button.on(Laya.Event.CLICK,this,this.onRankingButtonEvent.bind(this));
        this.market_button.on(Laya.Event.CLICK,this,this.onMarketButtonEvent.bind(this));
        this.onSelect(0);

        Laya.stage.on(HomeManagerEvent.OnCreateCell,this,this.onCreateCellEvent.bind(this));
        Laya.stage.on(HomeManagerEvent.OnPlayGame,this,this.onOnPlayGameEvent.bind(this));
        Laya.stage.on(HomeManagerEvent.OnEnhanceCellBodySizeConfirm,this,this.OnEnhanceCellBodySizeConfirmEvent.bind(this));
        Laya.stage.on(HomeManagerEvent.OnEnhanceCellPropertyConfirm,this,this.onEnhanceCellPropertyConfirmEvent.bind(this));
        Laya.stage.on(HomeManagerEvent.OnExplore,this,this.onExploreEvent.bind(this));
        Laya.stage.on(HomeManagerEvent.OnGain,this,this.onGainEvent.bind(this));
        Laya.stage.on(HomeManagerEvent.OnEvolutionGain,this,this.onEvolutionGainEvent.bind(this));
        Laya.stage.on(HomeManagerEvent.OnCellBreedAsk,this,this.onCellBreedAskEvent.bind(this));
        Laya.stage.on(HomeManagerEvent.OnCellBreedBid,this,this.onCellBreedBidEvent.bind(this));
        Laya.stage.on(HomeManagerEvent.OnCellBreedCancel,this,this.onCellBreedCancelEvent.bind(this));
         
    }
 
    async onOpened(param: any): Promise<void> {
       
        const {
            network:{
                account,
            },
  
           } = NetMgr.GetInstance().GetNet();
           
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
        (this.page_stack.selection as EvolutionPage).onRefresh();
    }
    onRankingButtonEvent(param: any): void {
        this.onSelect(3);
        (this.page_stack.selection as LeaderBoardPage).onRefresh();
    }
    onMarketButtonEvent(param: any): void {
        this.onSelect(4);
        (this.page_stack.selection as MarketPage).onRefresh();
    }
     
    private onSelect(index: number): void {
        this.info_button.selected = false;
        this.map_button.selected = false;
        this.evolution_button.selected = false;
        this.ranking_button.selected = false;
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
                this.ranking_button.selected = true;
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
 
           let property = data.color.r;
           property += data.color.g<<8;
           property += data.color.b<<16;
  
           const name = Utils.strTofelt252Felt(data.name);
           const seed = 'checell';
           Laya.Scene.open("resources/prefab/common/P_Common_loading.lh", false);
           const result = await CreateCell(name,seed,property);
           Laya.Scene.close("resources/prefab/common/P_Common_loading.lh");
           Laya.stage.event(NetManagerEvent.OnCreateCellCB,result);
 
          
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
           Laya.Scene.open("resources/prefab/common/P_Common_loading.lh", false);
           const result = await AddCellBodySize(param);
           Laya.Scene.close("resources/prefab/common/P_Common_loading.lh");
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
           Laya.Scene.open("resources/prefab/common/P_Common_loading.lh", false);
           const result = await AddCellProperty(param.c_id,param.p_id,property);
           Laya.Scene.close("resources/prefab/common/P_Common_loading.lh");
           Laya.stage.event(NetManagerEvent.OnEnhanceCellPropertyCB,result);

    }
    async onExploreEvent(param: any){
        
        const {
            systemCalls:{
                CellExplore
            }
           } = NetMgr.GetInstance().GetNet();
           Laya.Scene.open("resources/prefab/common/P_Common_loading.lh", false);
           const result = await CellExplore(param.c_id,param.time);
           Laya.Scene.close("resources/prefab/common/P_Common_loading.lh");
           Laya.stage.event(NetManagerEvent.OnExploreCB,result);
    }
    async onGainEvent(param: any){
       
        const {
            systemCalls:{
                CellExploreGain
            }
           } = NetMgr.GetInstance().GetNet();
           Laya.Scene.open("resources/prefab/common/P_Common_loading.lh", false);
           const result = await CellExploreGain(param);
           Laya.Scene.close("resources/prefab/common/P_Common_loading.lh");
           Laya.stage.event(NetManagerEvent.OnGainCB,result);
    }
    async onEvolutionGainEvent(param: any){
       
        const {
            systemCalls:{
                CellEvolutionGain
            }
           } = NetMgr.GetInstance().GetNet();
           Laya.Scene.open("resources/prefab/common/P_Common_loading.lh", false);
           const result = await CellEvolutionGain(param);
           Laya.Scene.close("resources/prefab/common/P_Common_loading.lh");
           Laya.stage.event(NetManagerEvent.OnEvolutionGainCB,result);
    }
    async onCellBreedAskEvent(param: any){
       
        const {
            systemCalls:{
                CellBreedAsk
            }
           } = NetMgr.GetInstance().GetNet();
           Laya.Scene.open("resources/prefab/common/P_Common_loading.lh", false);
           const result = await CellBreedAsk(param.c_id,param.category,param.pay_number);
           Laya.Scene.close("resources/prefab/common/P_Common_loading.lh");
           Laya.stage.event(NetManagerEvent.OnCellBreedAskCB,result);
    }
    async onCellBreedBidEvent(param: any){
       
        const {
            systemCalls:{
                CellBreedBid
            }
           } = NetMgr.GetInstance().GetNet();
           Laya.Scene.open("resources/prefab/common/P_Common_loading.lh", false);
           const result = await CellBreedBid(param.c_id,param.category,param.t_id);
           Laya.Scene.close("resources/prefab/common/P_Common_loading.lh");
           Laya.stage.event(NetManagerEvent.OnCellBreedBidCB,result);
    }
    async onCellBreedCancelEvent(param: any){
       
        const {
            systemCalls:{
                CellBreedCancel
            }
           } = NetMgr.GetInstance().GetNet();
           Laya.Scene.open("resources/prefab/common/P_Common_loading.lh", false);
           const result = await CellBreedCancel(param);
           Laya.Scene.close("resources/prefab/common/P_Common_loading.lh");
           Laya.stage.event(NetManagerEvent.OnCellBreedCancelCB,result);
           
    }
}
 