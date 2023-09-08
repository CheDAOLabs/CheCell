import { EntityIndex, setComponent, Component, Schema, Components } from "@latticexyz/recs";
import { Event } from "starknet";
import { poseidonHashMany } from 'micro-starknet';
import { Entity } from "../network/graphql";

export function strTofelt252Felt(str: string): string {
  const encoder = new TextEncoder();
  const strB = encoder.encode(str);
  return BigInt(
    strB.reduce((memo, byte) => {
      memo += byte.toString(16)
      return memo
    }, '0x'),
  ).toString()
}

export function felt252ToStr(felt: string): string {
  const hexString = BigInt(felt).toString(16);
  const bytes = new Uint8Array(hexString.length / 2);
  
  for (let i = 0; i < hexString.length; i += 2) {
    bytes[i / 2] = parseInt(hexString.substr(i, 2), 16);
  }
  
  const decoder = new TextDecoder();
  return decoder.decode(bytes);
}

 
export function getAllComponentNames(manifest: any): any {
  return manifest.components.map((component: any) => component.name);
}

export function getAllComponentNamesAsFelt(manifest: any): any {
  return manifest.components.map((component: any) => strTofelt252Felt(component.name));
}

export function getAllSystemNames(manifest: any): any {
  return manifest.systems.map((system: any) => system.name);
}

export function getAllSystemNamesAsFelt(manifest: any): any {
  return manifest.systems.map((system: any) => strTofelt252Felt(system.name));
}

// DISCUSSION: MUD expects Numbers, but entities in Starknet are BigInts (from poseidon hash)
// so I am converting them to Numbers here, but it means that there is a bigger risk of collisions
export function getEntityIdFromKeys(keys: bigint[]): bigint {
  if (keys.length === 1) {
    return keys[0];
   return parseInt(keys[0].toString()) as EntityIndex;
  }
  // calculate the poseidon hash of the keys
  let poseidon = poseidonHashMany([BigInt(keys.length), ...keys]);
  return poseidon;
  return parseInt(poseidon.toString()) as EntityIndex;
}
export function setComponentFromEntitiesGraphqlQuery(component: Component, entities: Entity[]) {
 
  entities.forEach((entity) => {
    //console.log( entity.node.keys);
    const keys = entity.node.keys.map((key) => BigInt(key));
    //keys.pop();
    const entityIndex = getEntityIdFromKeys(keys);
    entity.node.components.forEach((comp) => {
      if (comp.__typename === component.metadata?.name) {
        const componentValues = Object.keys(component.schema).reduce((acc: Schema, key) => {
          const value = comp[key];
          acc[key] = BigInt(value);
          return acc;
        }, {});
        setComponent(component, entityIndex, componentValues);
      }
    });
  });
}

export function setComponentFromEntitiesQuery(component: Component, entities: bigint[]) {
    
    let index = 0;
     
    // Retrieve the number of entityIds
    const numEntityIds = Number(entities[index++]);
  
    // Retrieve entityIds
    const entityIds = entities.slice(index, index + numEntityIds);
    index += numEntityIds;
  
    // Retrieve the number of entities with component values
    const numEntities = Number(entities[index++]);

    for (let i = 0; i < numEntities; i++) {
      // Retrieve the number of component values for the current entity
      const numValues = Number(entities[index++]);
  
      // Retrieve entity's component values
      const valueArray = entities.slice(index, index + numValues)
      const componentValues = Object.keys(component.schema).reduce((acc: Schema, key, index) => {
          const value = valueArray[index];
  
          acc[key] = BigInt(value);
          return acc;
      }, {});

      const entityIndex = parseInt(entityIds[i].toString()) as EntityIndex;
      setComponent(component, entityIndex, componentValues)
      
      index += numValues;
    }
}

export function setComponentFromEvent(components: Components, eventData: string[]) {
    // retrieve the component name
    
    const componentName = hex_to_ascii(eventData[0]);
 
    // retrieve the component from name
    const component = components[componentName];
    
    // get keys
    const keysNumber = parseInt(eventData[1]);
    let index = 2 + keysNumber + 1;

    const keys = eventData.slice(2, 2 + keysNumber).map((key) => BigInt(key));

    // get entityIndex from keys
    const entityIndex = getEntityIdFromKeys(keys);

    // get values
    let numberOfValues = parseInt(eventData[index++]);

    // get values
    const values = eventData.slice(index, index + numberOfValues);

    // create component object from values with schema
    const componentValues = Object.keys(component.schema).reduce((acc: Schema, key, index) => {
      const value = values[index];
      acc[key] = BigInt(value);
      return acc;
    }, {});
 
    // set component
    setComponent(component, entityIndex, componentValues);

}

export function hex_to_ascii(hex: string) {
  var str = '';
  for (var n = 2; n < hex.length; n += 2) {
    str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
  }
  return str;
}