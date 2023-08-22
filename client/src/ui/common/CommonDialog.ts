import { CommonDialogBase } from "./CommonDialog.generated";

const { regClass, property } = Laya;
 
 
@regClass()
export class CommonDialog extends CommonDialogBase {
 
    onAwake() {
        this.cancel_button.on(Laya.Event.CLICK,this,this.onCancelButtonEvent.bind(this));
        this.confirm_button.on(Laya.Event.CLICK,this,this.onConfirmButtonEvent.bind(this));
    }
    onOpened(param: any) {
        this.content_label.text = param.text;
    }
    onCancelButtonEvent(param: any): void {
        this.close();
       // this.onGetButtonEvent();
    }
    onConfirmButtonEvent(param: any): void {
        this.close();
       // this.onGetButtonEvent();
    }
}
 