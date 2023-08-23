
import { defineContractComponents } from "./ContractComponents";
import { world } from "./World";
import { Providers, Query, SyncWorker} from "../core";
import { Account,BigNumberish } from "starknet";
import { Provider, Contract, ec, json,constants,CallData, cairo } from "starknet";
import { connect, disconnect } from "get-starknet";

export const KATANA_ACCOUNT_1_ADDRESS = "0x33c627a3e5213790e246a917770ce23d7e562baa5b4d2917c23b1be6d91961c"
export const KATANA_ACCOUNT_1_PRIVATEKEY = "0x333803103001800039980190300d206608b0070db0012135bd1fb5f6282170b"
export const WORLD_ADDRESS = "0x2601d6be817c7720dfa00435672e579e4ac3ae7d231af36b47352d31fb680dd"
export const EVENT_KEY = "0x1a2f334228cee715f1f0f54053bb6b5eac54fa336e0bc1aacf7516decb0471d"


export type SetupNetworkResult = Awaited<ReturnType<typeof SetupNetwork>>;
 
export async function SetupNetwork() {

    const contractComponents = defineContractComponents(world);

    const provider = new Providers.RPCProvider(WORLD_ADDRESS);

    //const  starknet_account  = await connect();
    //const account = starknet_account.account;
    //console.log('-------',starknet_account.account);
   // const starknet = await connect();
  //  if (!starknet) {
  //      throw Error("User rejected wallet selection or silent connect found nothing")
  //  }

   // await starknet.enable();
   // const account = starknet.account;
   // console.log(account);
 
     
    const account =  new Account(provider.provider, KATANA_ACCOUNT_1_ADDRESS,KATANA_ACCOUNT_1_PRIVATEKEY);
     
    const syncWorker = new SyncWorker(provider, contractComponents, EVENT_KEY);
    await syncWorker.init();
    //await syncWorker.initGQL();
     

    return {
        contractComponents,
        provider,
        account,
        execute: async (system: string, call_data: BigNumberish[]) => provider.execute(account, system, call_data),
        entity: async (component: string, query: Query) => provider.entity(component, query),
        entities: async (component: string, partition: string) => provider.entities(component, partition,partition.length),
        world,
        syncWorker
    };
}