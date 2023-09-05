use traits::{Into, TryInto};

fn random(ref seed: u128, minNum: u128, maxNum: u128) -> u128 {
    seed = (seed * 214013 + 2531011) % 4294967296;
    return seed%(maxNum-minNum+1)+minNum;
}

fn random_s(seed: felt252, minNum: u128, maxNum: u128) -> u128 {
    let t: u256 = seed.into();
    let range = maxNum - minNum + 1;

    return (t.low % range) + minNum;
}

#[test]
#[available_gas(30000000)]
fn test_random() {

    let mut seed  = 123_u128;
    
    let result = random(ref seed,0_u128,10_u128);
 
}