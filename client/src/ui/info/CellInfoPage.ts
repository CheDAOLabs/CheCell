const { regClass, property } = Laya;

import { HomeManagerEvent } from '../../common/Config';
import { CellInfoPageBase } from './CellInfoPage.generated';
 
@regClass()
export class CellInfoPage extends CellInfoPageBase {
    index:number;
    onAwake() {
        this.onSelect(this.item0Tab.selectedIndex);
        this.item0Tab.selectHandler = new Laya.Handler(this, this.onSelect);       
    }
    public onRefresh(){
        this.onSelect(this.index);
    }
    private onSelect(index: number): void {
        this.index = index;
        this.item0Page.selectedIndex = index;
        console.log('----onSelect  ');
        switch (index) {
            case 0:
                Laya.stage.event(HomeManagerEvent.OnUpdateCreateCell);
                break;
            case 1:
                Laya.stage.event(HomeManagerEvent.OnUpdateCellList);  
                break;
            default:
                break;
        }
    }
}
 