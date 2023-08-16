import { getComponentValue } from "@latticexyz/recs";
import { NetMgr } from "../../net/NetMgr";
import { Utils } from "../../net/core";
import { felt252ToStr } from "../../net/core/utils";
import { CellBodyEnhancePageBase } from "./CellBodyEnhancePage.generated";
import { CellPropertyPointItem } from "./CellPropertyPointItem";
import { rgbToHex } from "../../common/Tool";
import { GAMEID, WORLDID } from "../../common/Config";

const { regClass, property } = Laya;

 
@regClass()
export class CellBodyEnhancePage extends CellBodyEnhancePageBase {
    index:Number;
    onAwake() {
    
    }
    SetData(index:number,baseInfo:any,propertyInfo:any){
        this.index = index;
        this.name_cur_value_label.text = felt252ToStr(baseInfo.name);
        this.exp_cur_value_label.text = baseInfo.exp;
        this.category_cur_value_label.text = baseInfo.category;
    
     
        this.attack_cur_value_label.text = propertyInfo.p1;
        this.agility_cur_value_label.text = propertyInfo.p2;
        this.perception_cur_value_label.text = propertyInfo.p3;
        this.updateCellPropertyPointImg(baseInfo.seed,baseInfo.body_size);
    }
    updateCellPropertyPointImg(seed:number,point_number:number){
        Laya.loader.load("resources/prefab/P_Cell_Property_Point_Item.lh").then((res)=>{
            const {
                network:{
                    account,
                },
                components:{
                    CellProperty,
                },
       
               } = NetMgr.GetInstance().GetNet();
     
                const entityid = account.address;
 
                for (var i: number = 0; i < point_number; i++) {
                    let item = res.create();
                    
                    let script = item.getComponent(Laya.Script) as CellPropertyPointItem;
                    const property_info = getComponentValue(CellProperty,Utils.getEntityIdFromKeys([GAMEID,WORLDID,BigInt(entityid),BigInt(this.index.toString()),BigInt(i+1)]));
                   
                    script.SetData(i,rgbToHex(Number(property_info.r),Number(property_info.g),Number(property_info.b)));
                  
                    if(i == 0){
                        console.log(this.cell_property_point_panel.width);
                        console.log(this.cell_property_point_panel.height);
                        item.x = this.cell_property_point_panel.width/2;
                        item.y = this.cell_property_point_panel.height/2;
                    }else{

                    }
                    this.cell_property_point_panel.addChildAt(item,i);
                   
                }
        });
       
    }
}
 