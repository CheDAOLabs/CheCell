const { regClass, property } = Laya;
 
@regClass()
export class CellPropertyPointItem extends Laya.Script {
    @property( { type: Laya.Image } )
    private img:Laya.Image;
    index:number;
    onAwake() {
    
    }
    
    SetData(index:number,color:string){
        this.index = index;
        this.img.color = color;
    }
   
}
 