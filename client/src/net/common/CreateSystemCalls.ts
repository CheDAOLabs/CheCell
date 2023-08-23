
import {SetupNetworkResult } from "./SetupNetwork";

export type SystemCalls = ReturnType<typeof CreateSystemCalls>;

export function CreateSystemCalls(
    { execute,syncWorker }: SetupNetworkResult,
) {
    const InitWorld = async () => {
        const tx = await execute("InitWorld", []);
        return await syncWorker.sync(tx.transaction_hash);
    }
    
    const InitAccount = async () => {
        const tx = await execute("InitAccount", []);
        return await syncWorker.sync(tx.transaction_hash);
    }
    const CreateCell = async (nickname:string,seed:string,property:number) => {
        const tx = await execute("CreateCell", [nickname,seed,property]);
        return await syncWorker.sync(tx.transaction_hash);
    }
    const AddCellBodySize = async (c_id:number) => {
        const tx = await execute("AddCellBodySize", [c_id]);
        return await syncWorker.sync(tx.transaction_hash);
    }
    const AddCellProperty = async (c_id:number,p_id:number,property:number) => {
        const tx = await execute("AddCellProperty", [c_id,p_id,property]);
        return await syncWorker.sync(tx.transaction_hash);
    }
    const CellExplore = async (c_id:number,time:number) => {
        const tx = await execute("CellExplore", [c_id,time]);
        return await syncWorker.sync(tx.transaction_hash);
    }
    const CellExploreGain = async (c_id:number) => {
        const tx = await execute("CellExploreGain", [c_id]);
        return await syncWorker.sync(tx.transaction_hash);
    }
    const CellEvolution = async (c_id:number) => {
        const tx = await execute("CellEvolution", [c_id]);
        return await syncWorker.sync(tx.transaction_hash);
    }
    const CellEvolutionGain = async (c_id:number) => {
        const tx = await execute("CellEvolutionGain", [c_id]);
        return await syncWorker.sync(tx.transaction_hash);
    }
    return {
        InitWorld,
        InitAccount,
        CreateCell,
        AddCellBodySize,
        AddCellProperty,
        CellExplore,
        CellExploreGain,
        CellEvolution,
        CellEvolutionGain
    };
}