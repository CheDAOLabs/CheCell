const { regClass, property } = Laya;

import { CellInfoPageBase } from './CellInfoPage.generated';
 
@regClass()
export class CellInfoPage extends CellInfoPageBase {
 
    onAwake() {
        this.onSelect(this.item0Tab.selectedIndex);
        this.item0Tab.selectHandler = new Laya.Handler(this, this.onSelect);       
    }
    
    private onSelect(index: number): void {
        this.item0Page.selectedIndex = index;
    }
}
 