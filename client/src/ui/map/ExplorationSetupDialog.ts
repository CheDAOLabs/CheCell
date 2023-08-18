import { HomeManagerEvent } from "../../common/Config";
import { ExplorationSetupDialogBase } from "./ExplorationSetupDialog.generated";

 
const { regClass, property } = Laya;
 
@regClass()
export class ExplorationSetupDialog extends ExplorationSetupDialogBase {
    c_id:number; 
    onAwake() {
        this.cancel_button.on(Laya.Event.CLICK,this,this.onCancelButtonEvent.bind(this));
        this.confirm_button.on(Laya.Event.CLICK,this,this.onConfirmButtonEvent.bind(this));

        this.time_bar.changeHandler = new Laya.Handler(this, this.onChange);
    }
    onOpened(param: any): void {
        this.c_id = param;
    }
    onCancelButtonEvent(param: any): void {
         this.close();
    }
    onConfirmButtonEvent(param: any): void {
        let data = {
            c_id:this.c_id,
            time:Number(this.time_cur_label.text)
        }
        Laya.stage.event(HomeManagerEvent.OnExplore,data);  
        this.close();
   }
   private onChange(value: number): void {
        let v =  Math.trunc(value);
        this.time_cur_label.text = v.toString();
   }
}
 