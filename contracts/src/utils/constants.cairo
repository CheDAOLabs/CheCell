enum PropertyTypes {
    ATK: (),
    AGI: (),
    SENSOR: (),
    MAX:(),
}

impl PropertyTypeIntoFelt252 of Into<PropertyTypes, felt252> {
    fn into(self: PropertyTypes) -> felt252 {
        return match self {
            PropertyTypes::ATK(()) => 0,
            PropertyTypes::AGI(()) => 1,
            PropertyTypes::SENSOR(()) => 2,
            PropertyTypes::MAX(()) => 3,
        };
    }
}

enum CellStateTypes {
    INIT: (),
    ALIVE: (),
    SERACH: (),
    FIGHT:(),
    BREED:(),
    DEAD: (),
    MAX:(),
}
 
impl CellStateTypeIntoFelt252 of Into<CellStateTypes, felt252> {
    fn into(self: CellStateTypes) -> felt252 {
        return match self {
            CellStateTypes::INIT(()) => 0,
            CellStateTypes::ALIVE(()) => 1,
            CellStateTypes::SERACH(()) => 2,
            CellStateTypes::FIGHT(()) => 3,
            CellStateTypes::BREED(()) => 4,
            CellStateTypes::DEAD(()) => 5,
            CellStateTypes::MAX(()) => 6,
        };
    }
}

const ADMIN_ADRESS:felt252 = 0x3ee9e18edc71a6df30ac3aca2e0b02a198fbce19b7480a63a0d71cbd76652e0;

const CATEGORY_COUNT:u8 = 9_u8;
const GAME_ID:felt252 = 1261689743971040193644;
const WORLD_ID:felt252 = 512970878052;
const MAP_BLOCK_CATEGORY_SIZE: u8 = 5;
const WORLD_MAP_SIZE: u8 = 16;
const PACKAGE_BIT_SIZE: u8 = 8;

const PROPERTY_VALUE_MAX:u8 = 255_u8;
const PROPERTY_INIT_MAX:u8 = 255_u8;
const PROPERTY_INIT_TOTAL_VALUE:u8 = 100_u8;
const CELL_SIZE_MAX:u8 = 255_u8;
const ADD_CELL_SIZE_INIT_PROPERTY:u8 = 0_u8;