const { regClass, property } = Laya;
 
import { CreateCellData, HomeManagerEvent, InitCellPoint, NetManagerEvent } from '../../common/Config';
import { Color,rgbToHex } from '../../common/Tool';
import { CreateCellPageBase } from './CreateCellPage.generated';
@regClass()
export class CreateCellPage extends CreateCellPageBase {
    baseColor:Color;
    onAwake() {
       
        Laya.stage.on(HomeManagerEvent.OnUpdateCreateCell,this,this.onUpdateCreateCellEvent.bind(this));
        Laya.stage.on(NetManagerEvent.OnCreateCellCB,this,this.onCreateCellCBEvent.bind(this));
         
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


       this.baseColor = {r:0,g:0,b:0};

       this.confirm_button.on(Laya.Event.CLICK,this,this.onConfirmButtonEvent.bind(this));
    }
    private onUpdateCreateCellEvent(param: any){

       this.attack_bar.slider.allowClickBack = false;
       this.attack_bar.slider.bar.mouseEnabled = false;

       this.agility_bar.slider.allowClickBack = false;
       this.agility_bar.slider.bar.mouseEnabled = false;

       this.perception_bar.slider.allowClickBack = false;
       this.perception_bar.slider.bar.mouseEnabled = false;

       this.attack_bar.upButton.disabled = true;
       this.agility_bar.upButton.disabled = true;
       this.perception_bar.upButton.disabled = true;


       this.baseColor = {r:0,g:0,b:0};
       this.onChangeR(0);
       this.onChangeG(0);
       this.onChangeB(0);
       this.attack_bar.slider.value = 0;
       this.agility_bar.slider.value = 0;
       this.perception_bar.slider.value = 0;

       this.name_input.text = '';
       this.seed_input.text = '';
    }
    private onCreateCellCBEvent(param: any){
        console.log('onCreateCellCBEvent',param);
        let message ='';
        if(param){
            message = 'Create Cell success!';
        }else{
            message = 'Create Cell error!';
        }
         
        Laya.Scene.open("resources/prefab/common/P_Common_Dialog.lh", false, {"text":message});
        if (param == false){
            return;
        }
        this.attack_bar.slider.allowClickBack = false;
        this.attack_bar.slider.bar.mouseEnabled = false;
 
        this.agility_bar.slider.allowClickBack = false;
        this.agility_bar.slider.bar.mouseEnabled = false;
 
        this.perception_bar.slider.allowClickBack = false;
        this.perception_bar.slider.bar.mouseEnabled = false;
 
        this.attack_bar.upButton.disabled = true;
        this.agility_bar.upButton.disabled = true;
        this.perception_bar.upButton.disabled = true;
 
 
        this.baseColor = {r:0,g:0,b:0};
        this.onChangeR(0);
        this.onChangeG(0);
        this.onChangeB(0);
        this.attack_bar.slider.value = 0;
        this.agility_bar.slider.value = 0;
        this.perception_bar.slider.value = 0;

        this.name_input.text = '';
        this.seed_input.text = '';
     }

     
    private onChangeR(value: number): void {
        let v =  Math.trunc(value);

        if(v+this.baseColor.g+this.baseColor.b >= InitCellPoint){
            this.attack_bar.downButton.disabled = true;
            this.agility_bar.downButton.disabled = true;
            this.perception_bar.downButton.disabled = true;
            if(v+this.baseColor.g+this.baseColor.b > InitCellPoint){
                return;
            }   
        }else{
            this.attack_bar.downButton.disabled = false;
            this.agility_bar.downButton.disabled = false;
            this.perception_bar.downButton.disabled = false;
        }

        if(v <= 0){
            this.attack_bar.upButton.disabled = true;
        }else{
            this.attack_bar.upButton.disabled = false;
        }
 
        this.baseColor.r = v;
        this.cell_image.color = rgbToHex(this.baseColor.r,this.baseColor.g,this.baseColor.b);
        this.attack_cur_value_label.text = this.baseColor.r.toString();
        this.changeAttrTitle();
    }
    private onChangeG(value: number): void {
        let v =  Math.trunc(value);
        if(v+this.baseColor.r+this.baseColor.b >= InitCellPoint){
            this.attack_bar.downButton.disabled = true;
            this.agility_bar.downButton.disabled = true;
            this.perception_bar.downButton.disabled = true;
            if(v+this.baseColor.r+this.baseColor.b > InitCellPoint){
                return;
            }  
        }else{
            this.attack_bar.downButton.disabled = false;
            this.agility_bar.downButton.disabled = false;
            this.perception_bar.downButton.disabled = false;
        }

        if(v <= 0){
            this.agility_bar.upButton.disabled = true;
        }else{
            this.agility_bar.upButton.disabled = false;
        }

        this.baseColor.g = v;
        this.cell_image.color = rgbToHex(this.baseColor.r,this.baseColor.g,this.baseColor.b);
        this.agility_cur_value_label.text = this.baseColor.g.toString();
        this.changeAttrTitle();
    }
    private onChangeB(value: number): void {
        let v =  Math.trunc(value);
        if(v+this.baseColor.r+this.baseColor.g >= InitCellPoint){
            this.attack_bar.downButton.disabled = true;
            this.agility_bar.downButton.disabled = true;
            this.perception_bar.downButton.disabled = true;
            if(v+this.baseColor.r+this.baseColor.g > InitCellPoint){
                return;
            }  
        }else{
            this.attack_bar.downButton.disabled = false;
            this.agility_bar.downButton.disabled = false;
            this.perception_bar.downButton.disabled = false;
        }

        if(v <= 0){
            this.perception_bar.upButton.disabled = true;
        }else{
            this.perception_bar.upButton.disabled = false;
        }

        this.baseColor.b = v;
        this.cell_image.color = rgbToHex(this.baseColor.r,this.baseColor.g,this.baseColor.b);
        this.perception_cur_value_label.text = this.baseColor.b.toString();
        this.changeAttrTitle();
    }
    private changeAttrTitle(){
        let text = 'allocate attributes [color=#f6daff](';
        text += (this.baseColor.r+this.baseColor.g+this.baseColor.b).toString();
        text += '/';
        text += InitCellPoint.toString();
        text += ')[/color]';
        this.cell_color_label.text = text;
    }
    onConfirmButtonEvent(param: any): void {
        if(this.name_input.text == ''){
            console.log('name void');
            return;
        }
        if(this.seed_input.text == ''){
            console.log('seed void');
            return;
        }
        let data = {
            name:this.name_input.text,
            seed:this.seed_input.text,
            color:this.baseColor
        } as CreateCellData;
        Laya.stage.event(HomeManagerEvent.OnCreateCell,data);  
     }
}
 