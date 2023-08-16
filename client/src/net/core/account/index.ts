import { Provider, Account, stark,ec } from "starknet";
import { GetBaseUrl } from "../constants";

export class HotAccount {
    public account: Account
    public address: string

    public GetInitAccount(){
     // initialize provider
        const provider = new Provider({ sequencer: { baseUrl:GetBaseUrl() } });
    // initialize existing pre-deployed account 0 of Devnet
        const privateKey = "0x04929b5202c17d1bf1329e0f3b1deac313252a007cfd925d703e716f790c5726";
        const accountAddress = "0x04514dd4ce4762369fc108297f45771f5160aeb7c864d5209e5047a48ab90b52";
        this.account = new Account(provider, accountAddress, privateKey);
    }
    public GetHotAccount(){
          // initialize provider
          const provider = new Provider({ sequencer: { baseUrl:GetBaseUrl() } });
          // initialize existing pre-deployed account 0 of Devnet
          const privateKey = stark.randomAddress();
          const accountAddress = ec.starkCurve.getStarkKey(privateKey);
          this.account = new Account(provider, accountAddress, privateKey);
    }
    public GetAccountByPrivateKey(privateKey:string){
        
        const provider = new Provider({ sequencer: { baseUrl:GetBaseUrl() } });
        const accountAddress = ec.starkCurve.getStarkKey(privateKey);
        this.account = new Account(provider, accountAddress, privateKey);
    }
}