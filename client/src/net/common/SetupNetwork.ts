
import { defineContractComponents } from "./ContractComponents";
import { world } from "./World";
import { Providers, Query, SyncWorker} from "../core";
import { Account,BigNumberish } from "starknet";
import { Provider, Contract, ec, json,constants,CallData, cairo } from "starknet";
import { connect } from "@argent/get-starknet"

export const KATANA_ACCOUNT_1_ADDRESS = "0x3ee9e18edc71a6df30ac3aca2e0b02a198fbce19b7480a63a0d71cbd76652e0"
export const KATANA_ACCOUNT_1_PRIVATEKEY = "0x300001800000000300000180000000000030000000000003006001800006600"
export const WORLD_ADDRESS = "0xf870873e1b4e39573900e0ce08ef9f3dfc0bbf6ed32678c6986b9f72acabca"
export const EVENT_KEY = "0x1a2f334228cee715f1f0f54053bb6b5eac54fa336e0bc1aacf7516decb0471d"


export type SetupNetworkResult = Awaited<ReturnType<typeof SetupNetwork>>;

export async function SetupNetwork() {

    const contractComponents = defineContractComponents(world);

    const provider = new Providers.RPCProvider(WORLD_ADDRESS);

   // const starknet = await connect();
  //  if (!starknet) {
  //      throw Error("User rejected wallet selection or silent connect found nothing")
  //  }

   // await starknet.enable();
   // const account = starknet.account;
   // console.log(account);
    const account =   new Account(provider.provider, KATANA_ACCOUNT_1_ADDRESS,KATANA_ACCOUNT_1_PRIVATEKEY);
     
    const syncWorker = new SyncWorker(provider, contractComponents, EVENT_KEY);
    await syncWorker.init();

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