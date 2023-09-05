import { CellState } from "../../common/Config";
import { isBitSet } from "../../common/Tool";
import { CellAvatarBase } from "./CellAvatar.generated";

const { regClass, property } = Laya;
 
@regClass()
export class CellAvatar extends CellAvatarBase {
    onAwake() {
     
    }
    SetState(type:CellState){
        if(type == CellState.Exploring){
            this.state_bg_img.visible = true;
            this.state_label.text = 'exploring';
        
        }else if(type == CellState.Evolving){
            this.state_bg_img.visible = true;
            this.state_label.text = 'evolving';
        }else if(type == CellState.Onshelves){
            this.state_bg_img.visible = true;
            this.state_label.text = 'on shelves';
        }else{
            this.state_bg_img.visible = false;
        } 
    }
    SetAvatar(index:number){
        console.log('avatar :  ',index);
        const center = Math.floor(index/16);
        this.center_part_image.skin = 'resources/ui/cell/cell_00'+center.toString()+'01.png';
        if(isBitSet(index,0)){
            this.up_part_image.skin = 'resources/ui/cell/cell_00'+center.toString()+'02.png';
        }else{
            this.up_part_image.skin = 'resources/ui/common/common_frame_cell_avatar.png';
        }
        if(isBitSet(index,1)){
            this.left_part_image.skin = 'resources/ui/cell/cell_00'+center.toString()+'03.png';
        }else{
            this.left_part_image.skin = 'resources/ui/common/common_frame_cell_avatar.png';
        }
        if(isBitSet(index,2)){
            this.right_part_image.skin = 'resources/ui/cell/cell_00'+center.toString()+'04.png';
        }else{
            this.right_part_image.skin = 'resources/ui/common/common_frame_cell_avatar.png';
        }
        if(isBitSet(index,3)){
            this.down_part_image.skin = 'resources/ui/cell/cell_00'+center.toString()+'05.png';
        }else{
            this.down_part_image.skin = 'resources/ui/common/common_frame_cell_avatar.png';
        }
      
    }
    
}
 