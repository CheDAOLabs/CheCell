import { getComponentValue } from "@latticexyz/recs";
import { NetMgr } from "../../net/NetMgr";
import { Utils } from "../../net/core";
import { felt252ToStr } from "../../net/core/utils";
import { CellBodyEnhancePageBase } from "./CellBodyEnhancePage.generated";
import { CellPropertyPointItem } from "./CellPropertyPointItem";
import { rgbToHex } from "../../common/Tool";
import { Color, GAMEID, HomeManagerEvent, NetManagerEvent, WORLDID } from "../../common/Config";
import { CellAttributeEnhancePageBase } from "./CellAttributeEnhancePage.generated";
import { getCellInfo1, getCellInfo2, getEnhanceAttrCost } from "../../logic/gamelogic";

const { regClass, property } = Laya;

 
@regClass()
export class CellAttributeEnhancePage extends CellAttributeEnhancePageBase {
    c_id:number;
    p_id:number;
    baseColor:Color;
    curColor:Color;
    onAwake() {
        this.baseColor = {
            r:0,
            g:0,
            b:0
        }
        this.curColor = {
            r:0,
            g:0,
            b:0
        }
        this.attack_bar.changeHandler = new Laya.Handler(this, this.onChangeR);
        this.agility_bar.changeHandler = new Laya.Handler(this, this.onChangeG);
        this.perception_bar.changeHandler = new Laya.Handler(this, this.onChangeB);

        this.attack_bar.slider.allowClickBack = false;
        this.attack_bar.slider.bar.mouseEnabled = false;

        this.agility_bar.slider.allowClickBack = false;
        this.agility_bar.slider.bar.mouseEnabled = false;

        this.perception_bar.slider.allowClickBack = false;
        this.perception_bar.slider.bar.mouseEnabled = false;

        this.attack_bar.upButton.disabled = true;
        this.agility_bar.upButton.disabled = true;
        this.perception_bar.upButton.disabled = true;

        this.confirm_button.on(Laya.Event.CLICK,this,this.onConfirmButtonEvent.bind(this));
        Laya.stage.on(NetManagerEvent.OnEnhanceCellPropertyCB,this,this.onEnhanceCellPropertyCBEvent.bind(this));
 
        
    }
    onConfirmButtonEvent(param: any): void {
        let data = {
            c_id:this.c_id,
            p_id:this.p_id,
            color:{
                r:this.curColor.r-this.baseColor.r,
                g:this.curColor.g-this.baseColor.g,
                b:this.curColor.b-this.baseColor.b,
            }
        }
        Laya.stage.event(HomeManagerEvent.OnEnhanceCellPropertyConfirm,data);  
    }
    onEnhanceCellPropertyCBEvent(param: any){
        let message ='';
        if(param){
            message = 'Enhance Cell Property success!';
        }else{
            message = 'Enhance Cell Property error!';
        }
         
        Laya.Scene.open("resources/prefab/common/P_Common_Dialog.lh", false, {"text":message});
        this.SetData(this.c_id,this.p_id);
    }
    private onChangeR(value: number): void {
        let v =  Math.trunc(value);
        
        if(v+this.curColor.g+this.curColor.b >= this.attack_bar.slider.max){
            this.attack_bar.downButton.disabled = true;
            this.agility_bar.downButton.disabled = true;
            this.perception_bar.downButton.disabled = true;
            if(v+this.curColor.g+this.curColor.b > this.attack_bar.slider.max){
                return;
            }   
        }else{
            this.attack_bar.downButton.disabled = false;
            this.agility_bar.downButton.disabled = false;
            this.perception_bar.downButton.disabled = false;
        }

        if(v < this.baseColor.r){
            this.attack_bar.upButton.disabled = true;
        }else{
            this.attack_bar.upButton.disabled = false;
        }
 
        this.curColor.r = v;
        this.cell_image.color = rgbToHex(this.curColor.r,this.curColor.g,this.curColor.b);
        this.attack_cur_value_label.text = this.curColor.r.toString();

        this.UpdateCost();
     
    }
    private onChangeG(value: number): void {
        let v =  Math.trunc(value);
        if(v+this.curColor.r+this.curColor.b >= this.agility_bar.slider.max){
            this.attack_bar.downButton.disabled = true;
            this.agility_bar.downButton.disabled = true;
            this.perception_bar.downButton.disabled = true;
            if(v+this.curColor.r+this.curColor.b > this.agility_bar.slider.max){
                return;
            }  
        }else{
            this.attack_bar.downButton.disabled = false;
            this.agility_bar.downButton.disabled = false;
            this.perception_bar.downButton.disabled = false;
        }

        if(v < this.baseColor.g){
            this.agility_bar.upButton.disabled = true;
        }else{
            this.agility_bar.upButton.disabled = false;
        }

        this.curColor.g = v;
        this.cell_image.color = rgbToHex(this.curColor.r,this.curColor.g,this.curColor.b);
        this.agility_cur_value_label.text = this.curColor.g.toString();

        this.UpdateCost();
     
    }
    private onChangeB(value: number): void {
        let v =  Math.trunc(value);
        if(v+this.curColor.r+this.curColor.g >= this.perception_bar.slider.max){
            this.attack_bar.downButton.disabled = true;
            this.agility_bar.downButton.disabled = true;
            this.perception_bar.downButton.disabled = true;
            if(v+this.curColor.r+this.curColor.g > this.perception_bar.slider.max){
                return;
            }  
        }else{
            this.attack_bar.downButton.disabled = false;
            this.agility_bar.downButton.disabled = false;
            this.perception_bar.downButton.disabled = false;
        }

        if(v < this.baseColor.b){
            this.perception_bar.upButton.disabled = true;
        }else{
            this.perception_bar.upButton.disabled = false;
        }

        this.curColor.b = v;
        this.cell_image.color = rgbToHex(this.curColor.r,this.curColor.g,this.curColor.b);
        this.perception_cur_value_label.text = this.curColor.b.toString();
        this.UpdateCost();
        
    }
    SetData(c_id:number,p_id:number){
        console.log('----');
        this.c_id = c_id;
        this.p_id = p_id;

        const data = getCellInfo1(c_id);

        this.name_value_label.text = felt252ToStr(data.cell_info.name);
        this.exp_cur_value_label.text = data.cell_info.exp.toString();
        this.category_value_label.text = data.cell_info.category.toString();
    
     
        this.attack_total_value_label.text = data.property_info.p1.toString();
        this.agility_total_value_label.text = data.property_info.p2.toString();
        this.perception_total_value_label.text = data.property_info.p3.toString();
        this.UpdateSingleProperty();
    }
    UpdateCost(){
        this.cost_cur_value_label.text = getEnhanceAttrCost(this.baseColor,this.curColor).toString();
    }
    UpdateSingleProperty(){
        const {
            network:{
                account,
            },
            components:{
                CellProperty,
            },
   
           } = NetMgr.GetInstance().GetNet();
 
            const entityid = account.address;
            const property_info = getComponentValue(CellProperty,Utils.getEntityIdFromKeys([GAMEID,WORLDID,BigInt(entityid),BigInt(this.c_id.toString()),BigInt(this.p_id.toString())]));
            


            this.attack_cur_value_label.text = property_info.p1.toString();
            this.agility_cur_value_label.text = property_info.p2.toString();
            this.perception_cur_value_label.text = property_info.p3.toString();
               
            this.attack_bar.value = Number(property_info.p1);
            this.agility_bar.value = Number(property_info.p2);
            this.perception_bar.value = Number(property_info.p3);

            this.baseColor = {
                r:Number(property_info.p1),
                g:Number(property_info.p2),
                b:Number(property_info.p3),
            }
            this.curColor = {
                r:Number(property_info.p1),
                g:Number(property_info.p2),
                b:Number(property_info.p3),
            }
            this.UpdateCost();

    }
}
 