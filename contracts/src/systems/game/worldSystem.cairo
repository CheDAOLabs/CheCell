#[system]
mod InitWorld {
    use array::ArrayTrait;
    use box::BoxTrait;
    use debug::PrintTrait;
    use traits::Into;
    use dojo::world::Context;
    use poseidon::poseidon_hash_span;
 

    use CheCell::utils::constants::{GAME_ID,WORLD_ID,ADMIN_ADRESS};  

    use CheCell::components::worldInfo::{WorldInfo};
 
    fn execute(ctx: Context) {

     //  assert(ctx.origin.into() == ADMIN_ADRESS, 'admin is invaild');
        let mut world_key_arr:Array<felt252> = ArrayTrait::new();
        world_key_arr.append(2);
        world_key_arr.append(GAME_ID);
        world_key_arr.append(WORLD_ID);
 
        let world_key = poseidon::poseidon_hash_span(world_key_arr.span());

        //world_key.print();
       
        let mut world:WorldInfo = get !(
            ctx.world,
            world_key, 
            WorldInfo
        );
        assert(world.init == false, 'world is invaild');
        world.init = true;
       
        set!(
            ctx.world,
            (world)
        );

        return ();
    }
}
 