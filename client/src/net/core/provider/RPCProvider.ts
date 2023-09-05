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

        try {
            const response = await this.provider.callContract(call);

            return response.result as unknown as Array<bigint>;
        } catch (error) {
            throw error;
        }
    }

    public async entities(component: string, partition: string, length: number): Promise<Array<bigint>> {
 
        const call: Call = {
            entrypoint: WorldEntryPoints.entities,
            contractAddress: this.getWorldAddress(),
            calldata: [strTofelt252Felt(component),partition,length]
        }
 
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
    public async eventsList(){
        const lastBlock = await this.provider.getBlock('latest');
        let result:any[] = [];
        const max = parseInt(lastBlock.block_number/400);
        const dx = parseInt(lastBlock.block_number%400);
        
        for (let i = 0; i < max; i++) {
            const list =  await this.provider.getEvents({
                address: this.getWorldAddress(),
                from_block: {block_number: i*400},
                to_block: {block_number: (i+1)*400},
                chunk_size: 400,
                keys:[]
            });
            result.push(...list.events);
        }   
        if(dx != 0){
             const list =  await this.provider.getEvents({
                address: this.getWorldAddress(),
                from_block: {block_number: lastBlock.block_number-dx},
                to_block: {block_number: lastBlock.block_number},
                chunk_size: dx,
                keys:[]
            });
            result.push(...list.events);
        }
        /*
        const list =  await this.provider.getEvents({
            address: this.getWorldAddress(),
            from_block: {block_number: 0},
            to_block: {block_number: lastBlock.block_number},
            chunk_size: 400,
            keys:[['0x1a2f334228cee715f1f0f54053bb6b5eac54fa336e0bc1aacf7516decb0471d']]
        });
     //   console.log(list);
        return list.events;
        */
       return result;
    }
    public async execute(account: Account, system: string, call_data:BigNumberish[]): Promise<InvokeFunctionResponse> {

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