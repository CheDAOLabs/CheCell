/* Autogenerated file. Do not edit manually. */

import { defineComponent, Type as RecsType, World } from "@latticexyz/recs";

export function defineContractComponents(world: World) {
  return {
    Account: (() => {
      const name = "Account";
      return defineComponent(
        world,
        {
          init:RecsType.Boolean,
          cell_number: RecsType.Number,
          address:RecsType.Number,
        },
        {
          metadata: {
            name: name,
          },
        }
      );
    })(),
    CellProperty: (() => {
      const name = "CellProperty";
      return defineComponent(
        world,
        {
          init:RecsType.Boolean,
          p1: RecsType.Number,
          p2: RecsType.Number,
          p3: RecsType.Number
        },
        {
          metadata: {
            name: name,
          },
        }
      );
    })(),
    Cell: (() => {
      const name = "Cell";
      return defineComponent(
        world,
        {
          init:RecsType.Boolean,
          name:RecsType.BigInt,
          seed: RecsType.BigInt,
          exp:RecsType.Number,
           
          body_size:RecsType.Number,
          category:RecsType.Number,
          avatar:RecsType.Number,

          state:RecsType.Number,
          explore_time:RecsType.Number,
          explore_end_time:RecsType.BigInt,
          evolution_end_time:RecsType.BigInt,

          breed_count:RecsType.Number,
          breed_cost:RecsType.Number,
          breed_category:RecsType.Number,

          target_category:RecsType.Number,
          map:RecsType.Number,
          bonus:RecsType.Number
        },
        {
          metadata: {
            name: name,
          },
        }
      );
    })(),
    WorldInfo: (() => {
      const name = "WorldInfo";
      return defineComponent(
        world,
        {
          init:RecsType.Boolean
        },
        {
          metadata: {
            name: name,
          },
        }
      );
    })(),
  };
}
