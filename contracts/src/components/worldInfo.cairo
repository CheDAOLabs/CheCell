use array::ArrayTrait;
use traits::{Into,TryInto,BitAnd};
use box::BoxTrait;
use option::OptionTrait;
 
 
#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct WorldInfo {
    #[key]
    id:felt252,

    init:bool,
 
}
 