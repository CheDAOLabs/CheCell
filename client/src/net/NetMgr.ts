import { Provider, Contract, Account, ec, json,constants,CallData, cairo } from "starknet";
import { SetupNetwork } from "./common/SetupNetwork";
import { CreateClientComponents } from "./common/CreateClientComponents";
import { CreateSystemCalls } from "./common/CreateSystemCalls";
 
export class NetMgr {
    starknet:any = undefined;
    netType:number = 0;
    provider:Provider = null;
    rpcUrl:string = 'http://127.0.0.1:5050';
    contractAPI:any = undefined;
    private constructor() {
    }

    private static instance: NetMgr | undefined
    private net:any |undefined;
    static GetInstance():NetMgr{
        if(NetMgr.instance === undefined) {
            NetMgr.instance = new NetMgr();
        }
        return NetMgr.instance;
    }
 
    public async InitArgentX(){
        // Let the user pick a wallet (on button click)
        /*
        this.starknet = await connect();
        if (!this.starknet) {
            throw Error("User rejected wallet selection or silent connect found nothing")
        }

        await this.starknet.enable();
        console.log("--------");
 
        if(this.starknet.isConnected) {
          
            console.log("success");
        } else {
           console.log("error");
        }
        */
    }
    public GetNet():any{
        if(NetMgr.GetInstance().net === undefined){
            console.log('no init!');
        }
        return NetMgr.GetInstance().net;
    }
    public async setup(address?:any,privatkey?:any){
        const network = await SetupNetwork(address,privatkey);
        const components = CreateClientComponents(network);
        const systemCalls = CreateSystemCalls(network);
        NetMgr.GetInstance().net = {  
            network,
            components,
            systemCalls,
        }
    }
}
 