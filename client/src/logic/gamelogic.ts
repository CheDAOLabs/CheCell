import { BlockSize, BlockType, GameConfig } from "../common/Config";
import {random} from './rand';

export function createBlocks(gameConfig:GameConfig,seed:number){
    let AllBlockArray = Array<BlockType>();
    let typeArray = Array<number>();
    seed = getRandomTypeArray(gameConfig,typeArray,seed);
    const viewMax = 2*(gameConfig.viewSize)-1;
    const typeNum = gameConfig.typeNum;
    const blockNumUnit = gameConfig.composeNumMax * gameConfig.cardRatio * gameConfig.typeNum;

    let v = {seed:seed,value:0}
    for (let i = 0; i < blockNumUnit; ++i) {
      v = random(0, viewMax-1,v.seed);
      let rx = v.value;
      v = random(0, viewMax-1,v.seed);
      let ry = v.value;
      const newBlock = {
      id: i+1,
      x:rx*BlockSize/2,
      y:ry*BlockSize/2,
      state:0,
      type: typeArray[i % typeNum],
      upBlockNum:0,
    } as BlockType;
     AllBlockArray.push(newBlock);
  }
   shuffleBlocks(AllBlockArray,v.seed);
   return AllBlockArray;
}
export function getRandomTypeArray(gameConfig:GameConfig,typeArray:number[],seed:number){
    const totalNum =  gameConfig.totalNum;
    const typeNum =  gameConfig.typeNum;
    let totalArray = Array<number>();
    for (let i = 0; i < totalNum;i++) {
      totalArray.push(i);
    }
    let v = {seed:seed,value:0};
    for (let i = 0; i < typeNum;i++) {
      v = random(0,totalNum-i-1,v.seed);
      typeArray[i] = totalArray[v.value];
      totalArray[v.value] = totalArray[totalNum-i-1];
    }
    return v.seed;
  }

export function shuffleBlocks(blocks:BlockType[],seed:number){
    const length = blocks.length;
    let v = {seed:seed,value:0};
    let temp;
    for (let i = 1; i < length; i++) {
      v = random(0,i,v.seed);
      temp =  blocks[i].type;
      blocks[i].type = blocks[v.value].type;
      blocks[v.value].type = temp;
    }
  }