import { RpcProvider,Account, BigNumberish,  Call, InvokeFunctionResponse } from "starknet";
import { IProvider } from "./IProvider";
import { Query, WorldEntryPoints } from "../types";
import { strTofelt252Felt } from '../utils'
import { GetBaseUrl } from "../constants";
 
export class RPCProvider extends IProvider {
    public provider: RpcProvider;
   // public sequencerProvider:StarknetProvider;

    constructor(world_address: string, url: string = GetBaseUrl()) {
        super(world_address);
        this.provider = new RpcProvider({
            nodeUrl: url,
        });
       
    }

    public async entity(component: string, query: Query, offset: number = 0, length: number = 0): Promise<Array<bigint>> {
         
        const call: Call = {
            entrypoint: WorldEntryPoints.get, // "entity"
            contractAddress: this.getWorldAddress(),
            
            calldata: [
                strTofelt252Felt(component),
                query.address_domain,
                query.partition,
                query.keys.length,
                ...query.keys as any,
                offset,
                length
            ]
        }

        console.log(call)

        try {
            const response = await this.provider.callContract(call);

            return response.result as unknown as Array<bigint>;
        } catch (error) {
            throw error;
        }
    }

    public async entities(component: string, partition: string, length: number): Promise<Array<bigint>> {
        console.log(component);
        const call: Call = {
            entrypoint: WorldEntryPoints.entities,
            contractAddress: this.getWorldAddress(),
            calldata: [strTofelt252Felt(component),0,length]
        }
 
        console.log(call);
        try {
            const response = await this.provider.callContract(call);
           
            return response.result as unknown as Array<bigint>;
        } catch (error) {
            throw error;
        }
    }

    public async component(name: string): Promise<bigint> {

        const call: Call = {
            entrypoint: WorldEntryPoints.component,
            contractAddress: this.getWorldAddress(),
            calldata: [strTofelt252Felt(name)]
        }

        try {
            const response = await this.provider.callContract(call);

            return response.result as unknown as bigint;
        } catch (error) {
            throw error;
        }
    }

    public async execute(account: Account, system: string, call_data:BigNumberish[]): Promise<InvokeFunctionResponse> {

        // DISCUSS: is this needed?
        // let call_data_obj = call_data.reduce((obj: any, item, index) => {
        //     obj[index] = item;
        //     return obj;
        // }, {});

        try {

            const nonce = await account?.getNonce();
            const call = await account?.execute(
                {
                    contractAddress: this.getWorldAddress() || "",
                    entrypoint: WorldEntryPoints.execute,
                    calldata: [strTofelt252Felt(system), call_data.length, ...call_data]
                },
                undefined,
                {
                    nonce:nonce,
                    maxFee: 0 // TODO: Update
                }
            );
            
            return call;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}