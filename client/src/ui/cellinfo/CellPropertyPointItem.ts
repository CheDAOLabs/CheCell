import { HomeManagerEvent } from "../../common/Config";

const { regClass, property } = Laya;
 
@regClass()
export class CellPropertyPointItem extends Laya.Script {
    @property( { type: Laya.Image } )
    private bg_image:Laya.Image;
    @property( { type: Laya.Image } )
    private selected_image:Laya.Image;
    index:number;
    onAwake() {
        this.bg_image.on(Laya.Event.CLICK,this,this.onClickEvent.bind(this));
      
    }
    
    SetData(index:number,color:string){
        console.log('color',color);
        this.index = index;
        this.bg_image.color = color;
    }
    GetIndex(){
        return this.index;
    }
    Select(visible:boolean){
        this.selected_image.visible = visible;
    }
    onClickEvent(param: any): void {
        Laya.stage.event(HomeManagerEvent.OnTouchCellPropertyPoint,this.index);
    }
}
 