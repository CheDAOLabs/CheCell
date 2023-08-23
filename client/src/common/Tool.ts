import { number } from "starknet";
import { Color } from "./Config";

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

export function insertDataDescendingOrder(dataArray:any[], newData:any) {
  let inserted = false;
  for (let i = 0; i < dataArray.length; i++) {
    if (newData.cell_number > dataArray[i].cell_number) {
      dataArray.splice(i, 0, newData);
      inserted = true;
      break;
    }
  }
  if (!inserted) {
    dataArray.push(newData);
  }
  return dataArray;
}