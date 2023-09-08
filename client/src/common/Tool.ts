import { number } from "starknet";
import { Color } from "./Config";
import { getCellInfo0, getCellInfo1 } from "../logic/gamelogic";

export function rgbToHex(r:number, g:number, b:number) {
    const hex = ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
    return `#${hex}`;
}

export function hexToRgb(hex:string) {
    // 去除可能存在的 # 号
    hex = hex.replace("#", "");
  
    // 将十六进制颜色代码拆分为红、绿、蓝三个部分
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
  
    // 返回RGB颜色值
    return { r:r, g:g, b:b } as Color;
}

export function truncateString(str:string, n:number) {
    if (str.length <= n) {
      return str;
    }
    return str.slice(0, n) + "...";
  }
export function secondsToMinutes(seconds:number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}

export function getCurrentTimestamp() {
    return Math.floor(Date.now() / 1000);
}

export function isBitSet(number:number, n:number) {
  const mask = 1 << n;
  return (number & mask) !== 0;
}

export function isBit(number:number, n:number) {
  return (number & n) !== 0;
}

export function getCategoryCount(category:number) {
  let result = 0;
    for (let i = 0; i < 9; i++) {
      result += isBitSet(category,i)?1:0;
    }
    return result;
}

export function insertDataDescendingOrder(dataArray:any[], newData:any,type:number) {
  let inserted = false;
  if(type == 0){
    for (let i = 0; i < dataArray.length; i++) {
      if (getCategoryCount(Number(newData.cell_info.base_info.category)) > getCategoryCount(Number(dataArray[i].cell_info.base_info.category))) {
        dataArray.splice(i, 0, newData);
        inserted = true;
        break;
      }
    }
    if (!inserted) {
      dataArray.push(newData);
    }
  }else{
    for (let i = 0; i < dataArray.length; i++) {
      if (Number(newData.cell_info.property_info.p1)+Number(newData.cell_info.property_info.p2)+Number(newData.cell_info.property_info.p3) > Number(dataArray[i].cell_info.property_info.p1)+Number(dataArray[i].cell_info.property_info.p2)+Number(dataArray[i].cell_info.property_info.p3)) {
        dataArray.splice(i, 0, newData);
        inserted = true;
        break;
      }
    }
    if (!inserted) {
      dataArray.push(newData);
    }
  }
  
  return dataArray;
}

export function getRandomEnumValue(enumObject:any) {
  const enumValues = Object.values(enumObject);
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  return enumValues[randomIndex];
}

export function setBitToZero(number:number, position:number) {
  const mask = ~(1 << position);
  return number & mask;
}

export function setBitToOne(number:number, position:number) {
  const mask = 1 << position;
  return number | mask;
}

export function bitToCategory(category:number):string {
  let result = ''
  for (let i = 0; i < 9; i++) {
    if(isBitSet(category,i)){
      result += String.fromCharCode(65 + i);
    }
  }
  return result;
}

export function isNumericString(str:string) {
  return /^\d+$/.test(str);
}

// 获取第n个枚举值
export function getNthEnumValue(enumObj:any, n:number) {
  const enumValues = Object.values(enumObj);
  return enumValues[n];
}
 