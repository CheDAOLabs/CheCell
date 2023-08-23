const { regClass, property } = Laya;
 
import { getComponentValue } from '@latticexyz/recs';
import { CellListPageType, GAMEID, HomeManagerEvent, WORLDID } from '../../common/Config';
import { NetMgr } from '../../net/NetMgr';
import { LeaderBoardPageBase } from './LeaderBoardPage.generated';
import { Utils } from '../../net/core';
import { felt252ToStr, strTofelt252Felt } from '../../net/core/utils';
import { insertDataDescendingOrder, truncateString } from '../../common/Tool';
import { LeaderBoardPageItem1 } from './LeaderBoardPageItem1';
import { LeaderBoardPageItem2 } from './LeaderBoardPageItem2';
 

@regClass()
export class LeaderBoardPage extends LeaderBoardPageBase {
    selected_node:Laya.Node;
    index:number;
    page_index:number;
    leaderboard_arr:any[];
    onAwake() {
        //this.onSelect(this.item0Tab.selectedIndex);
        this.item0Tab.selectHandler = new Laya.Handler(this, this.onSelect);      
        this.left_button.on(Laya.Event.CLICK,this,this.onLeftButtonEvent.bind(this));
        this.right_button.on(Laya.Event.CLICK,this,this.onRightButtonEvent.bind(this));
        
    }
    public onRefresh(){
        this.onSelect(this.index);
    }
    private onSelect(index: number): void {
        this.index = index;
        this.UpdateList();
        
    }
    UpdateList(){
        const {
            network:{
                account,
            },
            components:{
                Account,
                Cell,
            },
            
            
           } = NetMgr.GetInstance().GetNet();

           this.leaderboard_arr = [];
           this.page_index = 3;
           for (let [key,value] of Account.values.address) {
                const account_info = getComponentValue(Account,Utils.getEntityIdFromKeys([GAMEID,WORLDID,value]));
                this.leaderboard_arr = insertDataDescendingOrder(this.leaderboard_arr,account_info);
           }
           
            this.UpdateTop();

            this.UpdateNormal();

            let self_index = 0;
            for (let i = 0; i < this.leaderboard_arr.length; i++) {
                const element = this.leaderboard_arr[i];
                if(element.address == BigInt(account.address)){
                    self_index = i+1;
                    break;
                }
            }

            this.UpdateSelf(self_index);
    }
    UpdateTop(){
        let max = Math.min(3,this.leaderboard_arr.length);
        for (let i = 0; i < max; i++) {
            let data = {
                name:truncateString('0x'+this.leaderboard_arr[i].address.toString(16),10),
                cell_number:this.leaderboard_arr[i].cell_number,
                exp_number:'999',
            };

            (this.top_list.getChildAt(i).getComponent(Laya.Script) as LeaderBoardPageItem1).SetData(data);
            
        }
        for (let i = max; i < 3; i++) {
            let data = {
                name:'',
                cell_number:'',
                exp_number:''
            };
            (this.top_list.getChildAt(i).getComponent(Laya.Script) as LeaderBoardPageItem1).SetData(data);
        }
    }
    UpdateNormal(){
        let max = Math.min(7,Math.max(0,this.leaderboard_arr.length-this.page_index));
        for (let i = 0; i < max; i++) {
            let data = {
                index:this.page_index+i,
                name:truncateString('0x'+this.leaderboard_arr[this.page_index+i].address.toString(16),10),
                cell_number:this.leaderboard_arr[this.page_index+i].cell_number,
                exp_number:'999',
            };
            (this.normal_list.getChildAt(i).getComponent(Laya.Script) as LeaderBoardPageItem2).SetData(data);
            
        }
        for (let i = max; i < 7; i++) {
            let data = {
                index:'',
                name:'',
                cell_number:'',
                exp_number:''
            };
            (this.normal_list.getChildAt(i).getComponent(Laya.Script) as LeaderBoardPageItem2).SetData(data);
        }
    }
    UpdateSelf(index:number){
        const {
            network:{
                account,
            },
            components:{
                Account,
                Cell,
            },
            
            
           } = NetMgr.GetInstance().GetNet();


        const account_info = getComponentValue(Account,Utils.getEntityIdFromKeys([GAMEID,WORLDID,BigInt(account.address)]));
        let data = {
            index:index,
            name:truncateString('0x'+account_info.address.toString(16),10),
            cell_number:account_info.cell_number,
            exp_number:'999',
        };
        (this.self_info.getComponent(Laya.Script) as LeaderBoardPageItem2).SetData(data);
        
    }
    onLeftButtonEvent(param: any): void {
       
        this.page_index = Math.max(3,this.page_index-7);
        this.UpdateNormal();
    }
    onRightButtonEvent(param: any): void {
        if(this.page_index+7 > this.leaderboard_arr.length){

        }else{
            this.page_index +=7;
        }
        this.UpdateNormal();
    }
}
 