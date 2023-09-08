const { regClass, property } = Laya;
 
import { getComponentValue } from '@latticexyz/recs';
import { CellListPageType, GAMEID, HomeManagerEvent, WORLDID } from '../../common/Config';
import { NetMgr } from '../../net/NetMgr';
import { LeaderBoardPageBase } from './LeaderBoardPage.generated';
import { Utils } from '../../net/core';
import { felt252ToStr, strTofelt252Felt } from '../../net/core/utils';
import { bitToCategory, insertDataDescendingOrder, truncateString } from '../../common/Tool';
import { LeaderBoardPageItem1 } from './LeaderBoardPageItem1';
import { LeaderBoardPageItem2 } from './LeaderBoardPageItem2';
import { getCellInfo0 } from '../../logic/gamelogic';
 

@regClass()
export class LeaderBoardPage extends LeaderBoardPageBase {
    selected_node:Laya.Node;
    index:number;
    page_index:number;
    leaderboard_arr:any[];
    onAwake() {
        //this.onSelect(this.item0Tab.selectedIndex);
        this.index = 0;
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
                const cell_number = Number(account_info.cell_number);
                for (let i = 0; i < cell_number; i++) {
                    const cell_info = getCellInfo0(value,i+1);
                    let data = {
                        account_info:account_info,
                        cell_info:cell_info,
                        index:i+1
                    }
                    this.leaderboard_arr = insertDataDescendingOrder(this.leaderboard_arr,data,this.index);
                }
                 
           }
           
            this.UpdateTop();

            this.UpdateNormal();

            let self_index = 0;
            for (let i = 0; i < this.leaderboard_arr.length; i++) {
                const element = this.leaderboard_arr[i];
                if(element.account_info.address == BigInt(account.address)){
                    self_index = i;
                    break;
                }
            }

            //this.UpdateSelf(self_index);
    }
    UpdateTop(){
        let max = Math.min(3,this.leaderboard_arr.length);
        if(this.index == 0){
            for (let i = 0; i < max; i++) {
 
                let data = {
                    name:truncateString('0x'+this.leaderboard_arr[i].account_info.address.toString(16),10),
                    cell_name:felt252ToStr(this.leaderboard_arr[i].cell_info.base_info.name),
                    value:bitToCategory(Number(this.leaderboard_arr[i].cell_info.base_info.category)),
                };
                (this.top_list.getChildAt(i).getComponent(Laya.Script) as LeaderBoardPageItem1).SetData(data);
            }
            for (let i = max; i < 3; i++) {
                let data = {
                    name:'',
                    cell_name:'',
                    value:''
                };
                (this.top_list.getChildAt(i).getComponent(Laya.Script) as LeaderBoardPageItem1).SetData(data);
            }
        }else{
            for (let i = 0; i < max; i++) {
                
                let data = {
                    name:truncateString('0x'+this.leaderboard_arr[i].account_info.address.toString(16),10),
                    cell_name:felt252ToStr(this.leaderboard_arr[i].cell_info.base_info.name),
                    value:(Number(this.leaderboard_arr[i].cell_info.property_info.p1)+Number(this.leaderboard_arr[i].cell_info.property_info.p2)+Number(this.leaderboard_arr[i].cell_info.property_info.p3)).toString(),
                };
                (this.top_list.getChildAt(i).getComponent(Laya.Script) as LeaderBoardPageItem1).SetData(data);
            }
            for (let i = max; i < 3; i++) {
                let data = {
                    name:'',
                    cell_name:'',
                    value:''
                };
                (this.top_list.getChildAt(i).getComponent(Laya.Script) as LeaderBoardPageItem1).SetData(data);
            }
        }
    }
    UpdateNormal(){
        let max = Math.min(7,Math.max(0,this.leaderboard_arr.length-this.page_index));
        if(this.index == 0){
            for (let i = 0; i < max; i++) {
                let data = {
                    index:this.page_index+i+1,
                    name:truncateString('0x'+this.leaderboard_arr[this.page_index+i].account_info.address.toString(16),10),
                    cell_name:felt252ToStr(this.leaderboard_arr[this.page_index+i].cell_info.base_info.name),
                    value:bitToCategory(Number(this.leaderboard_arr[this.page_index+i].cell_info.base_info.category)),
                };
                (this.normal_list.getChildAt(i).getComponent(Laya.Script) as LeaderBoardPageItem2).SetData(data);
                
            }
            for (let i = max; i < 7; i++) {
                let data = {
                    index:'',
                    name:'',
                    cell_name:'',
                    value:''
                };
                (this.normal_list.getChildAt(i).getComponent(Laya.Script) as LeaderBoardPageItem2).SetData(data);
            }
        }else{
            for (let i = 0; i < max; i++) {
                let data = {
                    index:this.page_index+i,
                    name:truncateString('0x'+this.leaderboard_arr[this.page_index+i].account_info.address.toString(16),10),
                    cell_name:felt252ToStr(this.leaderboard_arr[this.page_index+i].cell_info.base_info.name),
                    value:(Number(this.leaderboard_arr[i].cell_info.property_info.p1)+Number(this.leaderboard_arr[i].cell_info.property_info.p2)+Number(this.leaderboard_arr[i].cell_info.property_info.p3)).toString(),
                };
                (this.normal_list.getChildAt(i).getComponent(Laya.Script) as LeaderBoardPageItem2).SetData(data);
                
            }
            for (let i = max; i < 7; i++) {
                let data = {
                    index:'',
                    name:'',
                    cell_name:'',
                    value:''
                };
                (this.normal_list.getChildAt(i).getComponent(Laya.Script) as LeaderBoardPageItem2).SetData(data);
            }
        }
        
    }
    UpdateSelf(index:number){
        let data = {
            index:0,
            name:'',
            cell_name:'',
            value:''

        };
        if(this.index == 0){
            data.index = index+1;
            data.name = truncateString('0x'+this.leaderboard_arr[index].account_info.address.toString(16),10);
            data.cell_name = felt252ToStr(this.leaderboard_arr[index].cell_info.base_info.name);
            data.value = bitToCategory(Number(this.leaderboard_arr[index].cell_info.base_info.category));
        }else{
            data.index = index+1;
            data.name = truncateString('0x'+this.leaderboard_arr[index].account_info.address.toString(16),10);
            data.cell_name = felt252ToStr(this.leaderboard_arr[index].cell_info.base_info.name);
            data.value =  (Number(this.leaderboard_arr[index].cell_info.property_info.p1)+Number(this.leaderboard_arr[index].cell_info.property_info.p2)+Number(this.leaderboard_arr[index].cell_info.property_info.p3)).toString();
        }
     
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
 