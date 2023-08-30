const { regClass, property } = Laya;

import { HomeManagerEvent } from '../../common/Config';
import { bitToCategory } from '../../common/Tool';
import { felt252ToStr } from '../../net/core/utils';
import { CellInfoSubPageBase } from './CellInfoSubPage.generated';
 
@regClass()
export class CellInfoSubPage extends CellInfoSubPageBase {
    index:number;
    baseInfo:any;
    onAwake() {
        this.enhance_button.on(Laya.Event.CLICK,this,this.onEnhanceButtonEvent.bind(this));
        this.play_button.on(Laya.Event.CLICK,this,this.onPlayButtonEvent.bind(this));
    }
    
    SetData(index:number,baseInfo:any,propertyInfo:any){
        this.baseInfo = baseInfo;
        this.index = index;
        this.name_cur_value_label.text = felt252ToStr(baseInfo.name);
        this.exp_cur_value_label.text = baseInfo.exp;
        this.category_cur_value_label.text = bitToCategory(Number(baseInfo.category));
        this.bodysize_cur_value_label.text = baseInfo.body_size;
        this.bread_count_cur_value_label.text = baseInfo.bread_count;

        this.attack_cur_value_label.text = propertyInfo.p1;
        this.agility_cur_value_label.text = propertyInfo.p2;
        this.perception_cur_value_label.text = propertyInfo.p3;

        if(baseInfo.state == 1){
            this.state_bg_img.visible = true;
            this.state_label.text = 'exploring';
            this.play_button.label = 'play';
        }else if(baseInfo.state == 2){
            this.state_bg_img.visible = true;
            this.state_label.text = 'evolving';
            this.play_button.gray = true;
            this.play_button.label = 'play';
        }else if(baseInfo.state == 3){
            this.state_bg_img.visible = true;
            this.state_label.text = 'on shelves';
            this.play_button.gray = false;
            this.play_button.label = 'put off';
        }else{
            this.state_bg_img.visible = false;
            this.play_button.gray = false;
            this.play_button.label = 'play';
        } 
        
    }
    onEnhanceButtonEvent(param: any): void {
        Laya.stage.event(HomeManagerEvent.OnEnhanceCellBodySize,this.index);  
    }
    onPlayButtonEvent(param: any): void {
         
        if(this.baseInfo.state == 3){
            Laya.stage.event(HomeManagerEvent.OnCellBreedCancel,this.index); 
        }else{
            Laya.stage.event(HomeManagerEvent.OnPlayGame,this.index); 
        }
    }
}