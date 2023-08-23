const { regClass, property } = Laya;

import { HomeManagerEvent } from '../../common/Config';
import { MarketPageBase } from './MarketPage.generated';
import { MarketPageAsk } from './MarketPageAsk';
 
@regClass()
export class MarketPage extends MarketPageBase {
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
        switch (index) {
            case 0:
                
                break;
            case 1:
                (this.item0Page.selection as MarketPageAsk).UpdateCellList();
                break
            default:
                break;
        }
    }
}
 