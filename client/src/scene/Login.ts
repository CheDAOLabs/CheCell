const { regClass, property } = Laya;
 
import { NetMgr } from '../net/NetMgr';
import { KATANA_ACCOUNT_1_ADDRESS } from '../net/common/SetupNetwork';
import { Query, Utils } from '../net/core';
import { EntityIndex, getComponentValue } from '@latticexyz/recs';
import { LoginBase } from './Login.generated';
 

@regClass()
export class Login extends LoginBase {
    net:any;
    onAwake() {
      
      //  NetMgr.getInstance().LoadMemory();

    }
    
}
 