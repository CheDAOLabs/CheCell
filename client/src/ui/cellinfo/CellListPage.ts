const { regClass, property } = Laya;
 
import { GAMEID, HomeManagerEvent, WORLDID } from '../../common/Config';
import { NetMgr } from '../../net/NetMgr';
import { Utils } from '../../net/core';
import { felt252ToStr } from '../../net/core/utils';
import { CellBodyEnhancePage } from './CellBodyEnhancePage';
import { CellInfoSubPage } from './CellInfoSubPage';
import { CellListItem } from './CellListItem';
import { CellListPageBase } from './CellListPage.generated';
import { EntityIndex, getComponentValue } from '@latticexyz/recs';

@regClass()
export class CellListPage extends CellListPageBase {
    selected_node:Laya.Node;
    onAwake() {
        Laya.stage.on(HomeManagerEvent.OnTouchCellListButton,this,this.onTouchCellItemEvent.bind(this));
        Laya.stage.on(HomeManagerEvent.OnUpdateCellList,this,this.onUpdateCellList.bind(this));
        Laya.stage.on(HomeManagerEvent.OnEnhanceCellBodySize,this,this.onEnhanceCellBodySize.bind(this));


        this.item0Page.selectedIndex = -1;
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
                    Account,
                    Cell,
                },
       
               } = NetMgr.GetInstance().GetNet();
     
                const entityid = account.address;
                const value = getComponentValue(Account,Utils.getEntityIdFromKeys([GAMEID,WORLDID,BigInt(entityid)]));
               
                const cell_max = Number(value.cell_number);
                for (var i: number = 0; i < cell_max; i++) {
                    let item = res.create();
                    let script = item.getComponent(Laya.Script) as CellListItem;
                    const cell_info = getComponentValue(Cell,Utils.getEntityIdFromKeys([GAMEID,WORLDID,BigInt(entityid),BigInt(i+1)]));
                   
                    script.SetIndex(i);
                    script.SetName(felt252ToStr(cell_info.name));
                     
                    this.cell_list.addChildAt(item,i);
                    if(i == 0){
                        this.selected_node = this.cell_list.getChildAt(0);
                        this.onSelect(0);
                        this.onTouchCellItemEvent(0);
                        script.onSelected(true);
                    };
                }
        });
        
     }
    onTouchCellItemEvent(param: any): void {
        console.log(param);
        (this.selected_node.getComponent(Laya.Script) as CellListItem).onSelected(false);
         
        this.selected_node =  this.cell_list.getChildAt(param);
        (this.selected_node.getComponent(Laya.Script) as CellListItem).onSelected(true);
        this.onSelect(0);
        const cell_data = this.getCellInfo(param+1)
        console.log(this.item0Page.selection);
 
        (this.item0Page.selection as CellInfoSubPage).SetData(param+1,cell_data.cell_info,cell_data.property_info);
     }
     onEnhanceCellBodySize(param: any): void {
        console.log(param);
        this.item0Page.selectedIndex = 1;
        const cell_data = this.getCellInfo(param);
        (this.item0Page.selection as CellBodyEnhancePage).SetData(param,cell_data.cell_info,cell_data.property_info);
     }
    private onSelect(index: number): void {
        this.item0Page.selectedIndex = index;
    }
    private getCellInfo(index:number){
        const {
            network:{
                account,
            },
            components:{
                Cell,
                CellProperty
            },
           } = NetMgr.GetInstance().GetNet();
           const entityid = account.address;
           const cell_info = getComponentValue(Cell,Utils.getEntityIdFromKeys([GAMEID,WORLDID,BigInt(entityid),BigInt(index)]));
           console.log('cell_info : ',cell_info);
           const property_number = Number(cell_info.body_size);
           let property_info = {
            p1:0,
            p2:0,
            p3:0
           }
           for (let i = 0; i < property_number; i++) {
                const cell_property_info = getComponentValue(CellProperty,Utils.getEntityIdFromKeys([GAMEID,WORLDID,BigInt(entityid),BigInt(index),BigInt(i+1)]));
                property_info.p1 = Number(cell_property_info.p1);
                property_info.p2 = Number(cell_property_info.p2);
                property_info.p3 = Number(cell_property_info.p3);
           }
           return {
             cell_info,
             property_info
           }
    }
}
 