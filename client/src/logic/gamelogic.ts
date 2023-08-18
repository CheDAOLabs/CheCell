import { getComponentValue } from "@latticexyz/recs";
import { Color, GAMEID, WORLDID } from "../common/Config";
import { NetMgr } from "../net/NetMgr";
import { Utils } from "../net/core";

 export function getEnhanceAttrCost(base:Color,cur:Color){
    return ((cur.r-base.r)+(cur.g-base.g)+(cur.b-base.b))*2;
 }

 export function getEnhanceBodyCost(body:number){
  return 5;
}

export function getCellInfo1(c_id:number){
   const {
       network:{
           account,
       },
       components:{
           Cell,
           CellProperty
       },
      } = NetMgr.GetInstance().GetNet();
      const entityid = account.address;
      const cell_info = getComponentValue(Cell,Utils.getEntityIdFromKeys([GAMEID,WORLDID,BigInt(entityid),BigInt(c_id)]));
     
      const property_number = Number(cell_info.body_size);
      let property_info = {
       p1:0,
       p2:0,
       p3:0
      }
      for (let i = 0; i < property_number; i++) {
           const cell_property_info = getComponentValue(CellProperty,Utils.getEntityIdFromKeys([GAMEID,WORLDID,BigInt(entityid),BigInt(c_id),BigInt(i+1)]));
           property_info.p1 += Number(cell_property_info.p1);
           property_info.p2 += Number(cell_property_info.p2);
           property_info.p3 += Number(cell_property_info.p3);
      }
      return {
        cell_info,
        property_info
      }
}

export function getCellInfo2(c_id:number,p_id:number){
   const {
       network:{
           account,
       },
       components:{
           Cell,
           CellProperty
       },
      } = NetMgr.GetInstance().GetNet();
      const entityid = account.address;
      const cell_info = getComponentValue(Cell,Utils.getEntityIdFromKeys([GAMEID,WORLDID,BigInt(entityid),BigInt(c_id)]));
     
      let property_info = {
       p1:0,
       p2:0,
       p3:0
      }
      const cell_property_info = getComponentValue(CellProperty,Utils.getEntityIdFromKeys([GAMEID,WORLDID,BigInt(entityid),BigInt(c_id),BigInt(p_id)]));
      property_info.p1 += Number(cell_property_info.p1);
      property_info.p2 += Number(cell_property_info.p2);
      property_info.p3 += Number(cell_property_info.p3);
      return {
        cell_info,
        property_info
      }
}