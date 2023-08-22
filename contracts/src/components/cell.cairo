use array::{ArrayTrait, SpanTrait};

#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Cell {
    #[key]
    id:felt252,

    init:bool,
    name:felt252,
    seed:felt252,
    exp:u32,
    breed_count:u32,
    body_size:u8,
    category:u8,
    state:u8,
    explore_time:u32,
    explore_end_time:u64
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
struct CreateCellEvent {
    address: felt252,
    number:u32,
} 
 