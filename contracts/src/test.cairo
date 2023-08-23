#[cfg(test)]
mod tests {
use core::{traits::Into, result::ResultTrait};
use array::{ArrayTrait, SpanTrait};
use option::OptionTrait;
use traits::TryInto;
use box::BoxTrait;
use debug::PrintTrait;

use starknet::{ContractAddress, syscalls::deploy_syscall};
use starknet::class_hash::{ClassHash, Felt252TryIntoClassHash};
use dojo::database::query::{IntoPartitioned, IntoPartitionedQuery};
use dojo::interfaces::{
    IComponentLibraryDispatcher, IComponentDispatcherTrait, ISystemLibraryDispatcher,
    ISystemDispatcherTrait
};
use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
 
    use dojo::test_utils::spawn_test_world;

    use CheCell::components::position::{position,Position};
    use CheCell::components::account::{account,Account};
    use CheCell::systems::game::gameSystem::InitPosition;
    use CheCell::systems::game::gameSystem::AddPosition; 
    use CheCell::systems::account::accountSystem::InitAccount;
    

    #[test]
    #[available_gas(30000000)]
    fn test_InitAccount() {
        let caller = starknet::contract_address_const::<0x0>();

        // components
        let mut components = array::ArrayTrait::new();
        components.append(position::TEST_CLASS_HASH);
        components.append(account::TEST_CLASS_HASH);
        // systems
        let mut systems = array::ArrayTrait::new();
        systems.append(InitPosition::TEST_CLASS_HASH);
        systems.append(AddPosition::TEST_CLASS_HASH);
        systems.append(InitAccount::TEST_CLASS_HASH);

        // deploy executor, world and register components/systems
        let world = spawn_test_world(components, systems);

        let mut tempArray = array::ArrayTrait::<felt252>::new();
        world.execute('InitAccount'.into(), tempArray.span());
  
    }
 
}