export const InitCellPoint = 100; 
export const GAMEID = BigInt('1261689743971040193644');
export const WORLDID = BigInt('512970878052');

export const enum CommonManagerEvent {
      Confirm = 'Confirm',
};


export const enum HomeManagerEvent {
    OnTouchCellListButton = 'OnTouchCellListButton',
    OnCreateCell = 'OnCreateCell',
    OnUpdateCreateCell = 'OnUpdateCreateCell',
    OnUpdateCellList = 'OnUpdateCellList',
    OnEnhanceCellBodySize = 'OnEnhanceCellBodySize',
    OnEnhanceCellBodySizeConfirm = 'OnEnhanceCellBodySizeConfirm',
    OnEnhanceCellProperty = 'OnEnhanceCellProperty',
    OnEnhanceCellPropertyConfirm = 'OnEnhanceCellPropertyConfirm',
    OnTouchCellPropertyPoint = 'OnTouchCellPropertyPoint',
    OnPlayGame = 'OnPlayGame',
    OnExplore = 'OnExplore',
};

export const enum NetManagerEvent {
      OnCreateCellCB = 'OnCreateCellCB',
      OnEnhanceCellBodySizeCB = 'OnEnhanceCellBodySizeCB',
      OnEnhanceCellPropertyCB = 'OnEnhanceCellPropertyCB',
      OnExploreCB = 'OnExploreCB',
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