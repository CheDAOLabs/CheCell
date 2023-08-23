const { regClass, property } = Laya;
 
@regClass()
export class LeaderBoardPageItem2 extends Laya.Script {
    @property( { type: Laya.Label } )
    private rank_number_label:Laya.Label;
    @property( { type: Laya.Label } )
    private player_name_label:Laya.Label;
    @property( { type: Laya.Label } )
    private cell_number_label:Laya.Label;
    @property( { type: Laya.Label } )
    private exp_number_label:Laya.Label;
    onAwake() {
       
      
    }
    SetData(data:any){
        this.rank_number_label.text = data.index;
        this.player_name_label.text = data.name;
        this.cell_number_label.text = data.cell_number;
        this.exp_number_label.text = data.exp_number;
    }
}
 