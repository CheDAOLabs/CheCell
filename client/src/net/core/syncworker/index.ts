import { Components } from "@latticexyz/recs";
import { Providers } from "..";
import { setComponentFromEntitiesQuery, setComponentFromEvent } from "../utils";
import { Event } from "starknet";
import { getEntities } from "../network/graphql";
import { GetGraphQLUrl } from "../constants";

export class SyncWorker<C extends Components> {
  private provider: Providers.RPCProvider;
  private components: C;
  private event_key: String;


  constructor(provider: Providers.RPCProvider, components: C, event_key: String) {
    console.log("Creating SyncWorker...");
    this.provider = provider;
    this.components = components;
    this.event_key = event_key;
    //this.init();
  }

  public async init() {
   for (const key of Object.keys(this.components)) {
        const component = this.components[key];
        if (component.metadata && component.metadata.name) {
            // call provider.entities for each component to get all entities linked to that component
            const entities = await this.provider.entities(component.metadata.name as string, "0", Object.keys(component.schema).length);
            setComponentFromEntitiesQuery(component, entities);
            }
        }
    console.log('SyncWorker initialized');
    }
    public async initGQL() {
        for (const key of Object.keys(this.components)) {
             const component = this.components[key];
             if (component.metadata && component.metadata.name) {
                 // call provider.entities for each component to get all entities linked to that component
                 
               //  const data = await getEntities(GetGraphQLUrl(),component.metadata.name as String,component.schema);
               //  console.log(data);
                const entities = await this.provider.entities(component.metadata.name as string, "0", Object.keys(component.schema).length);
                 setComponentFromEntitiesQuery(component, entities);
                 }
             }
         console.log('SyncWorker initialized');
         }
    public async sync(txHash: string):Promise<boolean> {
        const receipt = await this.provider.provider.getTransactionReceipt(txHash);
        console.log(receipt);
        receipt.events.filter((event) => {
            return event.keys.length === 1 &&
            event.keys[0] === this.event_key;
        }).map((event: Event) => {
            console.log("event    ---  ",event);
            setComponentFromEvent(this.components, event.data);
        });
        return receipt.events.length != 0;
    }
}