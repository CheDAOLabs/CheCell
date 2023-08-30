#[system]
mod CreateCell {
    use array::ArrayTrait;
    use box::BoxTrait;
    use option::OptionTrait;
    use traits::{Into,TryInto,BitAnd};
    use dojo::world::Context;
    use poseidon::poseidon_hash_span;


    use CheCell::utils::constants::{MAX_CREATE_CELL,CATEGORY_COUNT,CELL_SIZE_MAX,GAME_ID,WORLD_ID,PropertyTypes,PACKAGE_BIT_SIZE,PROPERTY_VALUE_MAX,PROPERTY_INIT_MAX,PROPERTY_INIT_TOTAL_VALUE};  
    use CheCell::utils::math::{pow,decodePackage};  
    use CheCell::utils::random::{random_s};  
 
    use CheCell::components::account::{Account};
    use CheCell::components::worldInfo::{WorldInfo};
    use CheCell::components::cell::{Cell,CellProperty};

    fn execute(ctx: Context,nickName:felt252,initSeed:felt252,property:u32) {

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
        assert(account.cell_number <= MAX_CREATE_CELL , 'CELL MAX ');
  
        account.cell_number += 1_u32;

        let mut cell_key_arr:Array<felt252> = ArrayTrait::new();
        cell_key_arr.append(4);
        cell_key_arr.append(GAME_ID);
        cell_key_arr.append(WORLD_ID);
        cell_key_arr.append(ctx.origin.into());
        cell_key_arr.append(account.cell_number.into());
        let cell_key = poseidon::poseidon_hash_span(cell_key_arr.span());
        let mut cell = get !(
            ctx.world,
            cell_key, 
            Cell
        );
        cell.init = true;
        cell.exp = 100_u32;
        cell.name = nickName;
        cell.seed = initSeed;
        cell.breed_count = 9;
        cell.body_size = 1;
         

        let mut category_seed_arr:Array<felt252> = ArrayTrait::new();
        category_seed_arr.append(GAME_ID);
        category_seed_arr.append(WORLD_ID);
        category_seed_arr.append(ctx.origin.into());
        category_seed_arr.append(initSeed);
        category_seed_arr.append(nickName);
        category_seed_arr.append(starknet::get_block_timestamp().into());
        let category_seed = poseidon::poseidon_hash_span(category_seed_arr.span());
 
        cell.category = pow(2,random_s(category_seed,0_u128,CATEGORY_COUNT.into()).into()).try_into().unwrap();
       
 
        let mut cell_property_key_arr:Array<felt252> = ArrayTrait::new();
        cell_property_key_arr.append(5);
        cell_property_key_arr.append(GAME_ID);
        cell_property_key_arr.append(WORLD_ID);
        cell_property_key_arr.append(ctx.origin.into());
        cell_property_key_arr.append(account.cell_number.into());
        cell_property_key_arr.append(cell.body_size.into());
        let cell_property_key:felt252 = poseidon::poseidon_hash_span(cell_property_key_arr.span());
        let mut cell_property = get !(
            ctx.world,
            cell_property_key, 
            CellProperty
        );

        let property_array = decodePackage(property.into(),3,PACKAGE_BIT_SIZE);
        cell_property.init = true;
        cell_property.p1 = (*property_array[0]).try_into().unwrap();
        cell_property.p2 = (*property_array[1]).try_into().unwrap();
        cell_property.p3 = (*property_array[2]).try_into().unwrap();
         
        
        assert(cell_property.p1 <= PROPERTY_INIT_MAX &&  cell_property.p2 <= PROPERTY_INIT_MAX && cell_property.p3 <= PROPERTY_INIT_MAX, 'init property is invaild');

        let init_total_value = cell_property.p1+cell_property.p2+cell_property.p3;
        assert(init_total_value <= PROPERTY_INIT_TOTAL_VALUE, 'init property total is invaild');
 
        set!(
            ctx.world,
            (account)
        );
 
        set!(
            ctx.world,
            (cell)
        );

        set!(
            ctx.world,
            (cell_property)
        );
      
        return ();
    }
    
}

#[system]
mod AddCellBodySize {
    use array::ArrayTrait;
    use box::BoxTrait;
    use option::OptionTrait;
    use traits::{Into,TryInto,BitAnd};
    use dojo::world::Context;
    use poseidon::poseidon_hash_span;


    use CheCell::utils::constants::{GAME_ID,WORLD_ID,PropertyTypes,PACKAGE_BIT_SIZE,PROPERTY_VALUE_MAX,ADD_CELL_SIZE_INIT_PROPERTY};  
    use CheCell::utils::math::{decodePackage};  
    use CheCell::utils::cal::{getSizeCost}; 
 
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
        let body_size = cell.body_size+1;
        let cost = getSizeCost(body_size);
        assert(cell.exp >= cost, 'cost not enough');

        cell.exp -=cost;
        cell.body_size +=1;
 
        let mut cell_property_key_arr:Array<felt252> = ArrayTrait::new();
        cell_property_key_arr.append(5);
        cell_property_key_arr.append(GAME_ID);
        cell_property_key_arr.append(WORLD_ID);
        cell_property_key_arr.append(ctx.origin.into());
        cell_property_key_arr.append(c_id.into());
        cell_property_key_arr.append(cell.body_size.into());
        let cell_property_key:felt252 = poseidon::poseidon_hash_span(cell_property_key_arr.span());
        let mut cell_property = get !(
            ctx.world,
            cell_property_key, 
            CellProperty
        );
        
        cell_property.init = true;
        cell_property.p1 = ADD_CELL_SIZE_INIT_PROPERTY;
        cell_property.p2 = ADD_CELL_SIZE_INIT_PROPERTY;
        cell_property.p3 = ADD_CELL_SIZE_INIT_PROPERTY;
 
        set !(
            ctx.world,
            (cell)
        );

        set !(
            ctx.world,
            (cell_property)
        );
 
        return ();
    }
    
}

#[system]
mod AddCellProperty {
    use array::ArrayTrait;
    use box::BoxTrait;
    use option::OptionTrait;
    use traits::{Into,TryInto,BitAnd};
    use dojo::world::Context;
    use poseidon::poseidon_hash_span;


    use CheCell::utils::constants::{GAME_ID,WORLD_ID,PropertyTypes,PACKAGE_BIT_SIZE,PROPERTY_VALUE_MAX,PROPERTY_INIT_MAX};  
    use CheCell::utils::math::{decodePackage};  
    use CheCell::utils::cal::{getAttrCost,getSizeCost}; 

    use CheCell::components::account::{Account};
    use CheCell::components::worldInfo::{WorldInfo};
    use CheCell::components::cell::{Cell,CellProperty};

    fn execute(ctx: Context,c_id:u32,p_id:u32,property:u32) {

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
       
 
        let mut cell_property_key_arr:Array<felt252> = ArrayTrait::new();
        cell_property_key_arr.append(5);
        cell_property_key_arr.append(GAME_ID);
        cell_property_key_arr.append(WORLD_ID);
        cell_property_key_arr.append(ctx.origin.into());
        cell_property_key_arr.append(c_id.into());
        cell_property_key_arr.append(p_id.into());
        let cell_property_key:felt252 = poseidon::poseidon_hash_span(cell_property_key_arr.span());
        let mut cell_property = get !(
            ctx.world,
            cell_property_key, 
            CellProperty
        );

        assert(cell_property.init == true , 'cell property is invaild');


        let property_array = decodePackage(property.into(),4,PACKAGE_BIT_SIZE);
        let mut add_point:u256 = *property_array[0];
        add_point += *property_array[1];
        add_point += *property_array[2];
        let cost = getAttrCost(add_point.try_into().unwrap());

        assert(cell.exp >= cost , 'cost not enough');
        cell.exp -=cost;
        cell_property.p1 += (*property_array[0]).try_into().unwrap();
        cell_property.p2 += (*property_array[1]).try_into().unwrap();
        cell_property.p3 += (*property_array[2]).try_into().unwrap();
         
        assert(cell_property.p1 <= PROPERTY_INIT_MAX &&  cell_property.p2 <= PROPERTY_INIT_MAX && cell_property.p3 <= PROPERTY_INIT_MAX, 'init property is invaild');
 
        set !(
            ctx.world,
            (cell)
        );

        set !(
            ctx.world,
            (cell_property)
        );
 
        return ();
    }
    
}
   