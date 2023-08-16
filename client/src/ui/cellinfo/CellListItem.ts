const { regClass, property } = Laya;
 
import { HomeManagerEvent } from '../../common/Config';
 
@regClass()
export class CellListItem extends Laya.Script {
    @property( { type: Laya.Button } )
    private button:Laya.Button;
    index:number;
    onAwake() {
        this.button.on(Laya.Event.CLICK,this,this.onButtonEvent.bind(this));
      
    }
    SetIndex(index:number){
        this.index = index;
    }
    onSelected(selected:boolean){
        this.button.selected = selected;
    }
    onButtonEvent(param: any): void {
        Laya.stage.event(HomeManagerEvent.OnTouchCellListButton,this.index);  
         
     }
}
 