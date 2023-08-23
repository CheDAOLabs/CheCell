const { regClass, property } = Laya;
 
 
@regClass()
export class MarketPageAskCategorySeletedItem extends Laya.Script {
    @property( { type: Laya.Button } )
    private button:Laya.Button;
    @property( { type: Number } )
    public index:Number;
    onAwake() {
      
    }
    SetGray(disabled:boolean){
        this.button.disabled = disabled;
    }
}
 