const { regClass, property } = Laya;

import { HomeManagerEvent, NetManagerEvent } from '../../common/Config';
import { MarketPageBase } from './MarketPage.generated';
import { MarketPageAsk } from './MarketPageAsk';
import { MarketPageBid } from './MarketPageBid';
import { MarketPageBidSelected } from './MarketPageBidSelected';
 
@regClass()
export class MarketPage extends MarketPageBase {
    index:number;
    onAwake() {
        this.onSelect(this.item0Tab.selectedIndex);
        this.item0Tab.selectHandler = new Laya.Handler(this, this.onSelect);       
        Laya.stage.on(NetManagerEvent.OnCellBreedAskCB,this,this.onCellBreedAskCBEvent.bind(this));
        Laya.stage.on(NetManagerEvent.OnCellBreedBidCB,this,this.onCellBreedBidCBEvent.bind(this));
        Laya.stage.on(HomeManagerEvent.OnTouchMarketBidItem,this,this.OnTouchMarketBidItemEvent.bind(this));
        Laya.stage.on(HomeManagerEvent.OnCellBreedBidCancel,this,this.onCellBreedBidCancelEvent.bind(this));

         
    }
    public onRefresh(){
        this.index = 0;
        this.item0Tab.selectedIndex = 0;
        this.onSelect(this.index);
    }
    private onSelect(index: number): void {
        this.index = index;
        this.item0Page.selectedIndex = index;
        switch (index) {
            case 0:
                (this.item0Page.selection as MarketPageBid).onRefresh();
                break;
            case 1:
                (this.item0Page.selection as MarketPageAsk).onRefresh();
                break
            default:
                break;
        }
    }
    onCellBreedAskCBEvent(param: any){
        let message ='';
        if(param){
            message = 'Cell ask success!';
        }else{
            message = 'Cell ask error!';
        }
         
        Laya.Scene.open("resources/prefab/common/P_Common_Dialog.lh", false, {"text":message});
       this.onRefresh();
    }
    onCellBreedBidCBEvent(param: any){
        let message ='';
        if(param){
            message = 'Cell bid success!';
        }else{
            message = 'Cell bid error!';
        }
         
        Laya.Scene.open("resources/prefab/common/P_Common_Dialog.lh", false, {"text":message});
        (this.item0Page.selection as MarketPageBidSelected).UpdateCellList();
    }
    OnTouchMarketBidItemEvent(param: any){
        this.onSelect(2);
    
        (this.item0Page.selection as MarketPageBidSelected).onSetData(param);
    }
    onCellBreedBidCancelEvent(param: any){
        this.onSelect(0);
    }
}
 