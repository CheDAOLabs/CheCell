import { HomeManagerEvent } from "../../common/Config";

const { regClass, property } = Laya;
 
 
@regClass()
export class MarketPageAskCategorySelectedItem extends Laya.Script {
    @property( { type: Laya.Button } )
    private button:Laya.Button;
    @property( { type: Number } )
    public index:Number;
    onAwake() {
        this.button.on(Laya.Event.CLICK,this,this.onButtonEvent.bind(this));
      
    }
    SetGray(disabled:boolean){
        this.button.disabled = disabled;
    }
    onButtonEvent(param:any){
        Laya.stage.event(HomeManagerEvent.OnTouchMarketAskItem,this.index);  
    }
}
 