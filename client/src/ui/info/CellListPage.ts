const { regClass, property } = Laya;
 
import { GAMEID, HomeManagerEvent, WORLDID } from '../../common/Config';
import { getCellInfo1,getCellInfo2 } from '../../logic/gamelogic';
import { NetMgr } from '../../net/NetMgr';
import { Utils } from '../../net/core';
import { felt252ToStr } from '../../net/core/utils';
import { CellAttributeEnhancePage } from './CellAttributeEnhancePage';
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
        Laya.stage.on(HomeManagerEvent.OnEnhanceCellProperty,this,this.onEnhanceCellProperty.bind(this));


        this.item0Page.selectedIndex = -1;
    }
    onEnable(): void {
       
    }
    onOpened(param: any):void{

    }
    onUpdateCellList(param: any): void {
        this.cell_list.removeChildren();

        Laya.loader.load("resources/prefab/info/P_Cell_List_Item.lh").then((res)=>{
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
                if (value === undefined) {
                    return;
                }
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
        
        (this.selected_node.getComponent(Laya.Script) as CellListItem).onSelected(false);
         
        this.selected_node =  this.cell_list.getChildAt(param);
        (this.selected_node.getComponent(Laya.Script) as CellListItem).onSelected(true);
        this.onSelect(0);
        const cell_data =  getCellInfo1(param+1);
        
        (this.item0Page.selection as CellInfoSubPage).SetData(param+1,cell_data.cell_info,cell_data.property_info);
     }
     onEnhanceCellBodySize(param: any): void {
        this.item0Page.selectedIndex = 1;
        (this.item0Page.selection as CellBodyEnhancePage).SetData(param);
     }
     onEnhanceCellProperty(param: any): void {
        this.item0Page.selectedIndex = 2;
        (this.item0Page.selection as CellAttributeEnhancePage).SetData(param.c_id,param.p_id);
     }
    private onSelect(index: number): void {
        this.item0Page.selectedIndex = index;
       // const c_id = (this.selected_node.getComponent(Laya.Script) as CellListItem).index;
       // (this.item0Page.selection as CellBodyEnhancePage).SetData(c_id);
    }
 
}
 