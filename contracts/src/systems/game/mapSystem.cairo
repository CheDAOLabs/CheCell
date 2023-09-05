     
#[system]
mod CellExplore {
    use array::ArrayTrait;
    use box::BoxTrait;
    use option::OptionTrait;
    use traits::{Into,TryInto,BitAnd};
    use dojo::world::Context;
    use poseidon::poseidon_hash_span;


    use CheCell::utils::constants::{GAME_ID,WORLD_ID,PropertyTypes,PACKAGE_BIT_SIZE};  
    use CheCell::utils::math::{decodePackage};  
    use CheCell::utils::cal::{getAttrCost,getSizeCost}; 
    use CheCell::utils::random::{random_s}; 

    use CheCell::components::account::{Account};
    use CheCell::components::worldInfo::{WorldInfo};
    use CheCell::components::cell::{Cell,CellProperty};

    fn execute(ctx: Context,c_id:u32,time:u32) {

        let mut world_key_arr:Array<felt252> = ArrayTrait::new();
        world_key_arr.append(2);
        world_key_arr.append(GAME_ID);
        world_key_arr.append(WORLD_ID);
 
        let world_key = poseidon::poseidon_hash_span(world_key_arr.span());
        let mut world = get !(
            ctx.world,
            world_key, 
            WorldInfo
        );
        assert(world.init == true , 'world is invaild');

        let mut account_key_arr:Array<felt252> = ArrayTrait::new();
        account_key_arr.append(3);
        account_key_arr.append(GAME_ID);
        account_key_arr.append(WORLD_ID);
        account_key_arr.append(ctx.origin.into());
 
        let account_key = poseidon::poseidon_hash_span(account_key_arr.span());
        let mut account = get !(
            ctx.world,
            account_key, 
            Account
        );
        assert(account.init == true , 'account is invaild');
 

        let mut cell_key_arr:Array<felt252> = ArrayTrait::new();
        cell_key_arr.append(4);
        cell_key_arr.append(GAME_ID);
        cell_key_arr.append(WORLD_ID);
        cell_key_arr.append(ctx.origin.into());
        cell_key_arr.append(c_id.into());
        let cell_key = poseidon::poseidon_hash_span(cell_key_arr.span());
        let mut cell:Cell = get !(
            ctx.world,
            cell_key, 
            Cell
        );
 
        assert(cell.init == true , 'cell is invaild');
        assert(cell.state == 0_u8, 'cell state is invaild');
        assert(cell.explore_end_time == 0, 'cell explore is invaild');

        cell.state = 1;
        cell.explore_time = time;
        cell.explore_end_time = starknet::get_block_timestamp() + 60_u64 * time.into();
        cell.map = getEnvironment(starknet::get_block_timestamp());
        
        set !(
            ctx.world,
            (cell)
        );
 
        return ();
    }

    fn getEnvironment(seed:u64)->u32{
        let rand = random_s(seed.into(), 0, 100);

        if(rand >= 70) {
            return 0;
        } else if(rand >= 45) {
            return 1;
        } else if(rand >= 25) {
            return 2;
        } else if(rand >= 13) {
            return 3;
        } else if(rand >= 4) {
            return 4;
        } else {
            return 5;
        }
    }
    fn getCCMap(ref self: ContractState,
            address: starknet::ContractAddress,
            selector: felt252,
            calldata: Array<felt252>){
        let mut res = starknet::call_contract_syscall(address, selector, calldata.span()).unwrap_syscall();
        let result = Serde::<bool>::deserialize(ref res).unwrap();
    } 
}
     
#[system]
mod CellExploreGain {
    use array::ArrayTrait;
    use box::BoxTrait;
    use option::OptionTrait;
    use traits::{Into,TryInto,BitAnd};
    use dojo::world::Context;
    use poseidon::poseidon_hash_span;


    use CheCell::utils::constants::{GAME_ID,WORLD_ID,PropertyTypes,PACKAGE_BIT_SIZE};  
    use CheCell::utils::math::{checkBitZero};  
    use CheCell::utils::cal::{getAttrCost,getSizeCost}; 
    use CheCell::utils::random::{random_s};  

    use CheCell::components::account::{Account};
    use CheCell::components::worldInfo::{WorldInfo};
    use CheCell::components::cell::{ExploreGainEvent,Cell,CellProperty};

    fn execute(ctx: Context,c_id:u32) {

        let mut world_key_arr:Array<felt252> = ArrayTrait::new();
        world_key_arr.append(2);
        world_key_arr.append(GAME_ID);
        world_key_arr.append(WORLD_ID);
 
        let world_key = poseidon::poseidon_hash_span(world_key_arr.span());
        let mut world = get !(
            ctx.world,
            world_key, 
            WorldInfo
        );
        assert(world.init == true , 'world is invaild');

        let mut account_key_arr:Array<felt252> = ArrayTrait::new();
        account_key_arr.append(3);
        account_key_arr.append(GAME_ID);
        account_key_arr.append(WORLD_ID);
        account_key_arr.append(ctx.origin.into());
 
        let account_key = poseidon::poseidon_hash_span(account_key_arr.span());
        let mut account = get !(
            ctx.world,
            account_key, 
            Account
        );
        assert(account.init == true , 'account is invaild');
 

        let mut cell_key_arr:Array<felt252> = ArrayTrait::new();
        cell_key_arr.append(4);
        cell_key_arr.append(GAME_ID);
        cell_key_arr.append(WORLD_ID);
        cell_key_arr.append(ctx.origin.into());
        cell_key_arr.append(c_id.into());
        let cell_key = poseidon::poseidon_hash_span(cell_key_arr.span());
        let mut cell:Cell = get !(
            ctx.world,
            cell_key, 
            Cell
        );
 
        assert(cell.init == true , 'cell is invaild');
        assert(cell.state == 1_u8, 'cell state is invaild');
        assert(cell.explore_end_time <= starknet::get_block_timestamp(), 'cell explore time is invaild');


        let mut category_seed_arr:Array<felt252> = ArrayTrait::new();
        category_seed_arr.append(GAME_ID);
        category_seed_arr.append(WORLD_ID);
        category_seed_arr.append(ctx.origin.into());
        category_seed_arr.append(starknet::get_block_timestamp().into());
        let category_seed = poseidon::poseidon_hash_span(category_seed_arr.span());

        
        let v = random_s(category_seed,0_u128,100_u128);
        let mut exp = 0;
        if(v < 5_u128){
            exp = 1;
        }else if(v < 15_u128){
            exp = 2;
        }else if(v < 40_u128){
            exp = 3;
        }else if(v < 65_u128){
            exp = 4;
        }else if(v <= 85_u128){
            exp = 5;
        }else{
            exp = 6;
        }
        let value:u32 = exp*cell.explore_time*100;
        cell.exp += value;
        cell.bonus = value;
        cell.state = 0;
        cell.explore_end_time = 0;
        cell.explore_time = 0;

        let avatar:u32 = cell.avatar%16;
        if(avatar != 15){
            let s = random_s(category_seed,0_u128,10_u128);
            if(s == 1){
                if(checkBitZero(avatar.into(),0)){
                    cell.avatar += 1;
                }else if (checkBitZero(avatar.into(),1)){
                    cell.avatar += 2;
                }else if (checkBitZero(avatar.into(),2)){
                    cell.avatar += 4;
                }else if (checkBitZero(avatar.into(),3)){
                    cell.avatar += 8;
                }
            }
        }
         
        
        set !(
            ctx.world,
            (cell)
        );

       
       // emit!(ctx.world,ExploreGainEvent{address:ctx.origin,value});

        return ();
    }
    
}
    