
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
 
    const CellEvolutionGain = async (c_id:number) => {
        const tx = await execute("CellEvolutionGain", [c_id]);
        return await syncWorker.sync(tx.transaction_hash);
    }
    const CellBreedAsk = async (c_id:number,category:number,pay_number:number) => {
        const tx = await execute("CellBreedAsk", [c_id,category,pay_number]);
        return await syncWorker.sync(tx.transaction_hash);
    }
    const CellBreedBid = async (c_id:number,category:number,t_id:bigint) => {
        const tx = await execute("CellBreedBid", [c_id,category,t_id]);
        return await syncWorker.sync(tx.transaction_hash);
    }
    const CellBreedCancel = async (c_id:number) => {
        const tx = await execute("CellBreedCancel", [c_id]);
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
        CellEvolutionGain,
        CellBreedAsk,
        CellBreedBid,
        CellBreedCancel
    };
}