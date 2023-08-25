use starknet::ContractAddress;
#[starknet::interface]
trait IContractB<TContractState> {
    fn set_value(ref self: TContractState, value: u128);

    fn get_value(self: @TContractState) -> u128;
}

 