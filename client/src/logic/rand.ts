const _a = 214013;
const _b = 2531011;
const _m = 4294967296;

export function random(minNum:number,maxNum:number,seed:number){ 
    seed = (seed  * _a + _b) % _m;
    const value = seed%(maxNum-minNum+1)+minNum;
    return {
        seed,
        value
    };
 
} 