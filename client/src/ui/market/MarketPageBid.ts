const { regClass, property } = Laya;
 
import { getComponentValue } from '@latticexyz/recs';
import { CellListPageType, GAMEID, HomeManagerEvent, WORLDID } from '../../common/Config';
import { NetMgr } from '../../net/NetMgr';
import { Utils } from '../../net/core';
import { felt252ToStr, strTofelt252Felt } from '../../net/core/utils';
import { insertDataDescendingOrder, isBit, isBitSet, truncateString } from '../../common/Tool';
import { MarketPageBidBase } from './MarketPageBid.generated';
import { MarketPageBidItem } from './MarketPageBidItem';
import { getCellInfo0 } from '../../logic/gamelogic';
 

@regClass()
export class MarketPageBid extends MarketPageBidBase {
    selected_node:Laya.Node;
    page_index:number;
    category:number;
    market_arr:any[];
    onAwake() {
        this.category = 1;
        this.category_selected_list.selectHandler = new Laya.Handler(this, this.onSelectChange);
        this.left_button.on(Laya.Event.CLICK,this,this.onLeftButtonEvent.bind(this));
        this.right_button.on(Laya.Event.CLICK,this,this.onRightButtonEvent.bind(this));
        this.reload_button.on(Laya.Event.CLICK,this,this.onReloadButtonEvent.bind(this));
    }
    public onRefresh(){
        this.UpdateList();
    }
    onSelectChange(index: number){
         
        this.category = index;
        const result = this.GetCategoryArr(index);
        this.UpdateNormal(result);
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

           this.market_arr = [];
           this.category_selected_list.selectedIndex = 0;
           this.page_index = 0;
           for (let [key,value] of Account.values.address) {
                const account_info = getComponentValue(Account,Utils.getEntityIdFromKeys([GAMEID,WORLDID,value]));
                const max = Number(account_info.cell_number);
                for (let i = 1; i <= max; i++) {
                    const cell_info = getCellInfo0(BigInt(account_info.address),BigInt(i));
                    if(cell_info.base_info.state == BigInt(3)){
                        let data = {
                            account_info:account_info,
                            cell_info:cell_info,
                            index:i,
                        };
                        this.market_arr.push(data);
                    }
                }
           }
            const result = this.GetCategoryArr(this.category);
            this.UpdateNormal(result);
 
 
    }
    GetCategoryArr(category:number){
        let result:any[] = [];
        for (let index = 0; index < this.market_arr.length; index++) {
            const data = this.market_arr[index];
            if(isBitSet(Number(data.cell_info.base_info.breed_category),category)){
                result.push(data);
            }
        }
        return result;
    }
    UpdateNormal(arr:any[]){
        let max = Math.min(8,Math.max(0,arr.length-this.page_index));
 
        for (let i = 0; i < max; i++) {
            let data = {
                index:this.page_index+i,
                c_id:Utils.getEntityIdFromKeys([GAMEID,WORLDID,BigInt(arr[this.page_index+i].account_info.address),BigInt(arr[this.page_index+i].index)]),
                player_address:truncateString('0x'+arr[this.page_index+i].account_info.address.toString(16),10),
                cell_name:felt252ToStr(arr[this.page_index+i].cell_info.base_info.name),
                breed_number:arr[this.page_index+i].cell_info.base_info.breed_count,
                pay_number:arr[this.page_index+i].cell_info.base_info.breed_cost,
                category:this.category,
            };
            (this.market_list.getChildAt(i).getComponent(Laya.Script) as MarketPageBidItem).SetData(data);
 
        }
        for (let i = max; i < 8; i++) {
            let data = {
                index:i,
                player_address:'',
                cell_name:'',
                breed_number:'',
                pay_number:'',
            };
            (this.market_list.getChildAt(i).getComponent(Laya.Script) as MarketPageBidItem).SetData(data);
        }
    }
 
    onLeftButtonEvent(param: any): void {
        this.page_index = Math.max(0,this.page_index-7);
        const result = this.GetCategoryArr(this.category);
        this.UpdateNormal(result);
    }
    onRightButtonEvent(param: any): void {
        const result = this.GetCategoryArr(this.category);
        if(this.page_index+8 > result.length){

        }else{
            this.page_index +=8;
        }
        
        this.UpdateNormal(result);
    }
    onReloadButtonEvent(param: any): void{
        this.UpdateList();
    }
        
}
 