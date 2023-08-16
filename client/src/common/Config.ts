export const InitCellPoint = 100; 
export const GameID = BigInt('1261689743971040193644');
export const WORLDID = BigInt('512970878052');

export const enum CommonManagerEvent {
      Confirm = 'Confirm',
};

export const enum HomeManagerEvent {
      OnTouchCellListButton = 'OnTouchCellListButton',
      OnCreateCellEvent = 'OnCreateCellEvent',
      OnUpdateCellList = 'OnUpdateCellList'
      
};
 
export interface Color{

      r:number;
  
      g:number;
      
      b:number;
}

export interface CreateCellData{

      name:string;
  
      seed:string;
      
      color:Color;
  }