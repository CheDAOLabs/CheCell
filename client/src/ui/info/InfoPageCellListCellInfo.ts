import { CellAvatarInfoEnum, CellAvatarTitleEnum } from "../../common/Config";
import { getNthEnumValue } from "../../common/Tool";
import { InfoPageCellListCellInfoBase } from "./InfoPageCellListCellInfo.generated";

 
const { regClass, property } = Laya;
 
 
@regClass()
export class InfoPageCellListCellInfo extends InfoPageCellListCellInfoBase {
 
    onAwake() {
        this.confirm_button.on(Laya.Event.CLICK,this,this.onConfirmButtonEvent.bind(this)); 
    }
   
   
    onConfirmButtonEvent(param: any): void {
        this.close();
       // this.onGetButtonEvent();
    }
    onOpened(param:any){
        console.log(param.index);
        this.avatar_image.skin = 'resources/ui/cell/cell_00'+param.index.toString()+'00.png';
        this.sub_title_label.text = this.GetSubTitle(param.index);
        this.info_label.text = this.GetInfo(param.index);
 
    }
    GetSubTitle(index:number):string{
        return getNthEnumValue(CellAvatarTitleEnum,index-1) as string;
    }
    GetInfo(index:number):string{
        return getNthEnumValue(CellAvatarInfoEnum,index-1) as string;
    }
}
 