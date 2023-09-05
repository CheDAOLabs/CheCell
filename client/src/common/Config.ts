export const InitCellPoint = 100; 
export const GAMEID = BigInt('1261689743971040193644');
export const WORLDID = BigInt('512970878052');

export const enum CommonManagerEvent {
      Confirm = 'Confirm',
};


export const enum HomeManagerEvent {
    OnTouchInfoCell = 'OnTouchInfoCell',
    OnTouchEvolutionCell = 'OnTouchEvolutionCell',
    OnTouchMarketCell = 'OnTouchMarketCell',
    OnTouchMarketBidCell = 'OnTouchMarketBidCell',

    OnTouchMarketBidItem = 'OnTouchMarketBidItem',
    OnTouchMarketAskItem = 'OnTouchMarketAskItem',

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
    OnGain = 'OnGain',
    OnCellBreedCancel = 'OnCellBreedCancel',

    OnEvolutionGain = 'OnEvolutionGain',
    OnCellBreedAsk = 'OnCellBreedAsk',
    OnCellBreedBid = 'OnCellBreedBid',
    OnCellBreedBidCancel = 'OnCellBreedBidCancel',

};

export const enum NetManagerEvent {
      OnCreateCellCB = 'OnCreateCellCB',
      OnEnhanceCellBodySizeCB = 'OnEnhanceCellBodySizeCB',
      OnEnhanceCellPropertyCB = 'OnEnhanceCellPropertyCB',
      OnExploreCB = 'OnExploreCB',
      OnGainCB = 'OnGainCB',
      OnEvolutionGainCB = 'OnEvolutionGainCB',
      OnCellBreedAskCB = 'OnCellBreedAskCB',
      OnCellBreedBidCB = 'OnCellBreedBidCB',

      OnCellBreedCancelCB = 'OnCellBreedCancelCB',
  };

export const enum CCMapType{
      Null = '0b0720',
      Desert = 'F3D899',
      StoneTemple = '967E67',
      ForestRuins = '2F590E',
      MountainDeep = '36230F',
      UnderwaterKeep = '006669',
      EmbersGlow = '340D07'

}

export const enum CellState{
      Normal = 0,
      Exploring = 1,
      Evolving = 2,
      Onshelves = 3
};

export const enum CellListPageType{
      Info = 0,
      Evolving = 1,
      Market = 2,
      MarketBid = 3
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