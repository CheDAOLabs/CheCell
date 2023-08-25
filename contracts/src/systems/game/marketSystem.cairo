     
#[system]
mod CellBreedAsk {
    use array::ArrayTrait;
    use box::BoxTrait;
    use option::OptionTrait;
    use traits::{Into,TryInto,BitAnd};
    use dojo::world::Context;
    use poseidon::poseidon_hash_span;


    use CheCell::utils::constants::{GAME_ID,WORLD_ID,PropertyTypes,PACKAGE_BIT_SIZE};  
    use CheCell::utils::math::{checkBitOne,decodePackage};  
    use CheCell::utils::cal::{getAttrCost,getSizeCost}; 

    use CheCell::components::account::{Account};
    use CheCell::components::worldInfo::{WorldInfo};
    use CheCell::components::cell::{Cell,CellProperty};

    fn execute(ctx: Context,c_id:u32,category:u32,pay_number:u32) {

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
        assert(cell.state == 0_u8, 'cell state is invaild');
        let mut count = 9_u256;
        let mut i = 0_u256;
        loop{
            if(i >= count){
                break();
            }
            if(checkBitOne(category.into(),i)){
                assert(checkBitOne(cell.category.into(),i), 'category is invaild');
            }
            i +=1_u256;
        };
        
        cell.state = 3;
        cell.breed_cost = pay_number;
        cell.breed_category = category;
        set !(
            ctx.world,
            (cell)
        );
 
        return ();
    }
    
}

     
#[system]
mod CellBreedBid {
    use array::ArrayTrait;
    use box::BoxTrait;
    use option::OptionTrait;
    use debug::PrintTrait;
    use traits::{Into,TryInto,BitAnd};
    use dojo::world::Context;
    use poseidon::poseidon_hash_span;


    use CheCell::utils::constants::{GAME_ID,WORLD_ID,PropertyTypes,PACKAGE_BIT_SIZE};  
    use CheCell::utils::math::{pow,checkBitOne,decodePackage};  
    use CheCell::utils::cal::{getAttrCost,getSizeCost}; 

    use CheCell::components::account::{Account};
    use CheCell::components::worldInfo::{WorldInfo};
    use CheCell::components::cell::{Cell,CellProperty};

    fn execute(ctx: Context,c_id:u32,target_category:u32,t_id:felt252) {

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
        assert(cell.state == 0_u8, 'cell state is invaild');
        assert(cell.evolution_end_time == 0, 'cell evolution is invaild');

        let mut target_cell = get !(
            ctx.world,
            t_id, 
            Cell
        );
        assert(target_cell.init == true , 'target_cell is invaild');
        assert(cell.exp >= target_cell.breed_cost, 'cost is invaild');
        assert(checkBitOne(target_cell.category.into(),target_category.into()), 'target category is invaild');
        assert(target_cell.breed_count > 0_u32, 'target cell count is invaild');


        cell.exp -= target_cell.breed_cost;
        cell.target_category = pow(2,target_category.into()).try_into().unwrap();
        cell.state = 2;
        cell.evolution_end_time = starknet::get_block_timestamp() + 60_u64;

        target_cell.exp += target_cell.breed_cost;
        target_cell.breed_count -= 1_u32;
        
        set !(
            ctx.world,
            (cell)
        );

         set !(
            ctx.world,
            (target_cell)
        );
 
        return ();
    }
    
}
     
#[system]
mod CellBreedCancel {
    use array::ArrayTrait;
    use box::BoxTrait;
    use option::OptionTrait;
    use traits::{Into,TryInto,BitAnd};
    use dojo::world::Context;
    use poseidon::poseidon_hash_span;


    use CheCell::utils::constants::{GAME_ID,WORLD_ID,PropertyTypes,PACKAGE_BIT_SIZE};  
    use CheCell::utils::math::{decodePackage};  
    use CheCell::utils::cal::{getAttrCost,getSizeCost}; 

    use CheCell::components::account::{Account};
    use CheCell::components::worldInfo::{WorldInfo};
    use CheCell::components::cell::{Cell,CellProperty};

    fn execute(ctx: Context,c_id:u32,category:u32,pay_number:u32) {

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
        assert(cell.state == 3_u8, 'cell state is invaild');
       
        cell.state = 0;
        cell.breed_cost = 0;
        cell.breed_category = 0;
        set !(
            ctx.world,
            (cell)
        );
 
        return ();
    }
    
}

