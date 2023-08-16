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

 