const { regClass, property } = Laya;
 
import { CellListPageType, HomeManagerEvent } from '../../common/Config';
 
@regClass()
export class MapSquareItem extends Laya.Script {
    @property( { type: Laya.Image } )
    private bg:Laya.Image;
  
    onAwake() {
    
    }
    SetColor(color:string){
        this.bg.color = color;
 
    }
  
}
 