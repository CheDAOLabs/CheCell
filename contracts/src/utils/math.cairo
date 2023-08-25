use traits::{Into,TryInto,BitAnd};
use array::ArrayTrait;
use box::BoxTrait;
use option::OptionTrait;

fn pow(base: u256, exp: u256) -> u256 {
    if(exp == 0){
        return 1;
    }

    let mut i:u256 = 1;
    let mut result:u256 = 1;
    loop{
        if(i > exp){
            break();
        }
        result *= base;
        i +=1;
    };
    return result;
}

fn max(a:u256,b:u256)->u256{
    if (a > b) {
        return a;
    }
    return b;
}

fn min(a:u256,b:u256)->u256{
    if (a < b) {
        return a;
    }
    return b;
}

fn checkBit(bit:u256,n:u256)->bool{
    return bit & n != 0;
}

fn checkBitOne(bit:u256,i:u256)->bool{
    return bit & pow(2,i) != 0;
}

fn checkBitZero(bit:u256,i:u256)->bool{
    return bit & pow(2,i) == 0;
}

fn setBitZero(bit:u256,i:u256)->u256{
    return bit+(bit & ~pow(2,i));
}

fn setBitOne(bit:u256,i:u256)->u256{
    return bit+(bit | pow(2,i));
}

fn decodePackage(package:u128,count:u8,bit_size:u8)->Span<u256>{
    let mut dataArray = ArrayTrait::<u256>::new();
    let mask_size: u128 =  (pow(2,bit_size.into()) - 1).try_into().unwrap();
    let mut i = 0;
    loop {
        if i == count {
            break ();
        }
            
        let index = i * bit_size;
        let power: u128 = pow(2, index.into()).try_into().unwrap();
        let mask: u128 = mask_size * power;
        let masked: u128 = BitAnd::bitand(mask, package);
        let result: u128 = masked / power;
        dataArray.append(result.into());
        i = i + 1;
    };
        return dataArray.span();
}

#[test]
#[available_gas(30000000)]

fn test_decodePackage() {
    let mut p:u128 = 1;
    p = p + pow(2,9).try_into().unwrap();

    let result = decodePackage(p,4,8);

    let mut c1 = 1600_u256;
    let mut c2 = 1000_u256;
    let c3 = c1/c2;
    assert(c3 == 1, 'error ');
    
}