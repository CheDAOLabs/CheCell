#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Account {
    #[key]
    id: felt252,
    
    init:bool,
    cell_number:u32,
    address:felt252,
}
 