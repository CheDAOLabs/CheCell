import { HomeManagerEvent } from "../../common/Config";

const { regClass, property } = Laya;
 
@regClass()
export class MarketPageBidItem extends Laya.Script {
    @property( { type: Laya.Label } )
    private player_address_label:Laya.Label;
    @property( { type: Laya.Label } )
    private cell_name_label:Laya.Label;
    @property( { type: Laya.Label } )
    private breed_number_label:Laya.Label;
    @property( { type: Laya.Label } )
    private pay_number_label:Laya.Label;
    @property( { type: Laya.Button } )
    private button:Laya.Button;
    index:number;
    c_id:number;
    category:number;
    onAwake() { 
        this.button.on(Laya.Event.CLICK,this,this.onButtonEvent.bind(this));
      
    }
    SetData(data:any){
        this.index = data.index;
        this.c_id = data.c_id;
        this.category = data.category;
        //this.rank_number_label.text = data.index;
        this.player_address_label.text = data.player_address;
        this.cell_name_label.text = data.cell_name;
        this.breed_number_label.text = data.breed_number;
        this.pay_number_label.text = data.pay_number;
    }
    onButtonEvent(param:any){
        let data = {
            t_id:this.c_id,
            category:this.category,
            cost:Number(this.pay_number_label.text)
        }
        Laya.stage.event(HomeManagerEvent.OnTouchMarketBidItem,data);  
    }
}
 