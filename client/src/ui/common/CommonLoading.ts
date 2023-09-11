import { CommonDialogBase } from "./CommonDialog.generated";
import { CommonLoadingBase } from "./CommonLoading.generated";

const { regClass, property } = Laya;
 
 
@regClass()
export class CommonLoading extends CommonLoadingBase {
 
    onAwake() {
        Laya.timer.loop(100, this, () => {
            this.loading_image.rotation += 2;
        });
          
    }
    onDestroy(): void {
        Laya.timer.clearAll(this);
    }
     
}
 