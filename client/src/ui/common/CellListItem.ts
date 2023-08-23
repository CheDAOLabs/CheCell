const { regClass, property } = Laya;
 
import { CellListPageType, HomeManagerEvent } from '../../common/Config';
 
@regClass()
export class CellListItem extends Laya.Script {
    @property( { type: Laya.Button } )
    private button:Laya.Button;
    index:number;
    type:number;
    onAwake() {
        this.button.on(Laya.Event.CLICK,this,this.onButtonEvent.bind(this));
      
    }
    SetData(data:any){
        this.button.label = data.name;
        this.index = data.index;
        this.type = data.type;
    }
    
    onSelected(selected:boolean){
        this.button.selected = selected;
    }
    onButtonEvent(param: any): void {
        switch (this.type) {
            case CellListPageType.Info:
                Laya.stage.event(HomeManagerEvent.OnTouchInfoCell,this.index);  
                break;
            case CellListPageType.Evolving:
                Laya.stage.event(HomeManagerEvent.OnTouchEvolutionCell,this.index);  
                break;
            case CellListPageType.Market:
                Laya.stage.event(HomeManagerEvent.OnTouchMarketCell,this.index);  
                break;
            default:
                break;
        }
         
         
     }
}
 