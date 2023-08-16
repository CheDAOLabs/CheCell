const { regClass, property } = Laya;
 
import { GameID, HomeManagerEvent, WORLDID } from '../../common/Config';
import { NetMgr } from '../../net/NetMgr';
import { Utils } from '../../net/core';
import { CellListItem } from './CellListItem';
import { CellListPageBase } from './CellListPage.generated';
import { EntityIndex, getComponentValue } from '@latticexyz/recs';

@regClass()
export class CellListPage extends CellListPageBase {
    selected_node:Laya.Node;
    onAwake() {
        Laya.stage.on(HomeManagerEvent.OnTouchCellListButton,this,this.onTouchCellItemEvent.bind(this));
        Laya.stage.on(HomeManagerEvent.OnUpdateCellList,this,this.onUpdateCellList.bind(this));

       
    }
    onEnable(): void {
        console.log('----onEnable');
    }
    onOpened(param: any):void{
        console.log('----');
        
    }
    onUpdateCellList(param: any): void {
        this.cell_list.removeChildren();

        Laya.loader.load("resources/prefab/P_Cell_List_Item.lh").then((res)=>{
            const {
                network:{
                    account,
                },
                components:{
                    Account
                },
       
               } = NetMgr.GetInstance().GetNet();
    
               console.log(NetMgr.GetInstance().GetNet());
              const entityid = account.address;
              const value = getComponentValue(Account,Utils.getEntityIdFromKeys([GameID,WORLDID,BigInt(entityid)]));
               
                const cell_max = Number(value.cell_number);
            for (var i: number = 0; i < cell_max; i++) {
                let item = res.create();
                let script = item.getComponent(Laya.Script) as CellListItem;
                script.SetIndex(i);
                this.cell_list.addChildAt(item,i);
                if(i == 0){
                    this.selected_node = this.cell_list.getChildAt(0);
                    script.onSelected(true);
                };
            }
        });
        
     }
    onTouchCellItemEvent(param: any): void {
        (this.selected_node.getComponent(Laya.Script) as CellListItem).onSelected(false);
         
        this.selected_node =  this.cell_list.getChildAt(param);
        (this.selected_node.getComponent(Laya.Script) as CellListItem).onSelected(true);
        
     }
    private onSelect(index: number): void {
        this.item0Page.selectedIndex = index;
    }
}
 