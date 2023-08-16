
import {SetupNetworkResult } from "./SetupNetwork";

export type SystemCalls = ReturnType<typeof CreateSystemCalls>;

export function CreateSystemCalls(
    { execute,syncWorker }: SetupNetworkResult,
) {
    const InitWorld = async () => {
        const tx = await execute("InitWorld", []);

        await syncWorker.sync(tx.transaction_hash);
    }
    
    const InitAccount = async () => {
        const tx = await execute("InitAccount", []);
        await syncWorker.sync(tx.transaction_hash);
    }
    const CreateCell = async (nickname:string,seed:string,property:number) => {
        const tx = await execute("CreateCell", [nickname,seed,property]);
        await syncWorker.sync(tx.transaction_hash);
    }
    const AddCellToMap = async (index:number) => {
        const tx = await execute("AddCellToMap", [index]);
        await syncWorker.sync(tx.transaction_hash);
    }
    return {
        InitWorld,
        InitAccount,
        CreateCell,
        AddCellToMap
    };
}