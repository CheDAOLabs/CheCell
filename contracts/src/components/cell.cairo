use array::{ArrayTrait, SpanTrait};
use serde::Serde;
use clone::Clone;
use option::OptionTrait;
use traits::{Into, TryInto};

#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Cell {
    #[key]
    id:felt252,

    init:bool,
    name:felt252,
    seed:felt252,
    exp:u32,
 
    body_size:u8,
    category:u32,
    avatar:u32,
    
    state:u8,
    explore_time:u32,
    explore_end_time:u64,
    evolution_end_time:u64,

    breed_count:u32,
    breed_cost:u32,
    breed_category:u32,

    target_category:u32,
    map:u32,
    bonus:u32
}

#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct CellProperty {
    #[key]
    id:felt252,
    
    init:bool,
    p1:u8,
    p2:u8,
    p3:u8,
}

#[derive(Drop, starknet::Event)]
struct ExploreGainEvent {
    address:felt252,
    bonus:u32
}
 