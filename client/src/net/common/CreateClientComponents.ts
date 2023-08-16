import { overridableComponent } from "@latticexyz/recs";
import { SetupNetworkResult } from "./SetupNetwork";
 


export type ClientComponents = ReturnType<typeof CreateClientComponents>;

export function CreateClientComponents({ contractComponents }: SetupNetworkResult) {
    return {
        ...contractComponents,
    };
}