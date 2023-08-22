import { getComponentValue } from "@latticexyz/recs";
import { NetMgr } from "../../net/NetMgr";
import { Utils } from "../../net/core";
import { felt252ToStr } from "../../net/core/utils";
import { CellBodyEnhancePageBase } from "./CellBodyEnhancePage.generated";
import { CellPropertyPointItem } from "./CellPropertyPointItem";
import { rgbToHex } from "../../common/Tool";
import { GAMEID, HomeManagerEvent, NetManagerEvent, WORLDID } from "../../common/Config";
import { getCellInfo1, getEnhanceBodyCost } from "../../logic/gamelogic";
import { random } from "../../logic/rand";

const { regClass, property } = Laya;

 
@regClass()
export class CellBodyEnhancePage extends CellBodyEnhancePageBase {
    index:number;
    selected_property_node:Laya.Node;
    onAwake() {
        Laya.stage.on(HomeManagerEvent.OnTouchCellPropertyPoint,this,this.onTouchCellPropertyPoint.bind(this));
        Laya.stage.on(NetManagerEvent.OnEnhanceCellBodySizeCB,this,this.onEnhanceCellBodySizeCBEvent.bind(this));

         
        this.enhance_button.on(Laya.Event.CLICK,this,this.onEnhanceButtonEvent.bind(this));
        this.confirm_button.on(Laya.Event.CLICK,this,this.onConfirmButtonEvent.bind(this))
    }
    SetData(index:number){
        this.index = index;
        const data =  getCellInfo1(this.index);
        this.name_cur_value_label.text = felt252ToStr(data.cell_info.name);
        this.exp_cur_value_label.text = data.cell_info.exp.toString();
        this.category_cur_value_label.text = data.cell_info.category.toString();
    
     
        this.attack_cur_value_label.text = data.property_info.p1.toString();
        this.agility_cur_value_label.text = data.property_info.p2.toString();
        this.perception_cur_value_label.text = data.property_info.p3.toString();

        this.selected_property_node = undefined;
        this.updateCellPropertyPointImage(Number(data.cell_info.seed),Number(data.cell_info.body_size));
        this.updateEnhanceBody(Number(data.cell_info.body_size));
    }
    onEnhanceButtonEvent(param: any): void {
        if (this.selected_property_node == undefined){
            Laya.Scene.open("resources/prefab/common/P_Common_Dialog.lh", false, {"text":'Your have not selected the point !'});
            return;
        }
        const id = (this.selected_property_node.getComponent(Laya.Script) as CellPropertyPointItem).GetIndex();
        let data = {
            c_id:this.index,
            p_id:id+1,
        }
        Laya.stage.event(HomeManagerEvent.OnEnhanceCellProperty,data);  
         
     }
     onConfirmButtonEvent(param: any): void {
        Laya.stage.event(HomeManagerEvent.OnEnhanceCellBodySizeConfirm,this.index);  
         
     }
    onTouchCellPropertyPoint(param: any){
        if(this.selected_property_node != undefined){
            (this.selected_property_node.getComponent(Laya.Script) as CellPropertyPointItem).Select(false);
        }
        this.selected_property_node = this.cell_property_point_panel.getChildAt(param);

        (this.selected_property_node.getComponent(Laya.Script) as CellPropertyPointItem).Select(true);
    }
    onEnhanceCellBodySizeCBEvent(param: any){
        let message ='';
        if(param){
            message = 'Enhance Cell Body Size success!';
        }else{
            message = 'Enhance Cell Body Size error!';
        }
         
        Laya.Scene.open("resources/prefab/common/P_Common_Dialog.lh", false, {"text":message});
        this.SetData(this.index);
    }
     
    updateCellPropertyPointImage(seed:number,point_number:number){

        this.cell_property_point_panel.removeChildren();
        Laya.loader.load("resources/prefab/info/P_Cell_Property_Point_Item.lh").then((res)=>{
            const {
                network:{
                    account,
                },
                components:{
                    CellProperty,
                },
       
               } = NetMgr.GetInstance().GetNet();
     
                const entityid = account.address;
                let random_arr = [];
                for (let i = 0; i < 256; i++) {
                    random_arr.push(i);
                };
                let data = {
                    seed:Number(seed),
                    value:0
                }
                for (var i: number = 0; i < point_number; i++) {
                    let item = res.create();
                    
                    let script = item.getComponent(Laya.Script) as CellPropertyPointItem;
                    const property_info = getComponentValue(CellProperty,Utils.getEntityIdFromKeys([GAMEID,WORLDID,BigInt(entityid),BigInt(this.index.toString()),BigInt(i+1)]));
                    console.log('property_info   ',property_info);
                    script.SetData(i,rgbToHex(Number(property_info.p1),Number(property_info.p2),Number(property_info.p3)));
                
                    if(i == 0){
                        random_arr[64] = random_arr[random_arr.length-1];
                        item.x = this.cell_property_point_panel.width/2;
                        item.y = this.cell_property_point_panel.height/2;
                    }else{
                        data = random(0,random_arr.length-1,data.seed);
                        item.x = this.cell_property_point_panel.width/2 + Math.ceil(random_arr[data.value]/16-8)*16;
                        item.y = this.cell_property_point_panel.height/2 + Math.ceil(random_arr[data.value]%16-8)*16;
                        random_arr[data.value] = random_arr[random_arr.length-1];
                    }                     
                        random_arr.pop();
                    this.cell_property_point_panel.addChildAt(item,i);
                   
                }
        });
    }
    updateEnhanceBody(size:number){
       
           const v = getEnhanceBodyCost(size);
           this.cost_cur_value_label.text = v.toString();
    }
 
}
 