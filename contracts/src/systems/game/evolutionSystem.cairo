 
     
#[system]
mod CellEvolutionGain {
    use array::ArrayTrait;
    use box::BoxTrait;
    use option::OptionTrait;
    use traits::{Into,TryInto,BitAnd};
    use dojo::world::Context;
    use poseidon::poseidon_hash_span;


    use CheCell::utils::constants::{GAME_ID,WORLD_ID,PropertyTypes,PACKAGE_BIT_SIZE};  
    use CheCell::utils::math::{pow,checkBitOne,decodePackage};  
    use CheCell::utils::cal::{getAttrCost,getSizeCost}; 
    use CheCell::utils::random::{random_s};  
    use CheCell::components::account::{Account};
    use CheCell::components::worldInfo::{WorldInfo};
    use CheCell::components::cell::{Cell,CellProperty};

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
        let mut cell = get !(
            ctx.world,
            cell_key, 
            Cell
        );
 
        assert(cell.init == true , 'cell is invaild');
        assert(cell.state == 2_u8, 'cell state is invaild');
        assert(cell.evolution_end_time <= starknet::get_block_timestamp(), 'cell evolution time is invaild');

        let mut category_seed_arr:Array<felt252> = ArrayTrait::new();
        category_seed_arr.append(GAME_ID);
        category_seed_arr.append(WORLD_ID);
        category_seed_arr.append(ctx.origin.into());
        category_seed_arr.append(starknet::get_block_timestamp().into());
        let category_seed = poseidon::poseidon_hash_span(category_seed_arr.span());

        let mut count = 9_u256;
        let mut i = 0_u256;
        let mut max = 0_u128;
        loop{
            if(i >= count){
                break();
            }
            if(checkBitOne(cell.category.into(),i)){
                max += 1_u128;
            }
            i +=1_u256;
        };

        let v = random_s(category_seed,0_u128,max);
        if(v == 1){
            cell.category += cell.target_category;
        }
        
   
        cell.target_category = 0;
        cell.state = 0;
        cell.evolution_end_time = 0;
         
        set !(
            ctx.world,
            (cell)
        );
 
        return ();
    }
    
}
    