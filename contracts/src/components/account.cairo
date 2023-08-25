#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Account {
    #[key]
    id: felt252,
    
    init:bool,
    cell_number:u32,
    address:felt252,
}
 
 #[derive(Drop, starknet::Event)]
struct CreateAccountEvent {
    address: felt252,
    number:u32,
    test:u32
} 
 