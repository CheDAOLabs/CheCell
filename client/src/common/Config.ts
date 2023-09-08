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

export enum CellAvatarTitleEnum{
      CAT1 = 'Cthulhu',
      CAT2 = 'Ubbo-Sathla',
      CAT3 = 'Yog-Sothoth',
      CAT4 = 'Yig',
      CAT5 = 'Elder Thing',
      CAT6 = 'Star Vampire',
}

export enum CellAvatarInfoEnum{
      CAI1 = "Cthulhu is a sleeping god and the lord of R'lyeh, one of the beings symbolizing 'water'. It has the appearance of an octopus head and human body, with bat-like wings on its back. Cthulhu occasionally makes contact with unspecified humans through telepathy. Humans who come into contact with Cthulhu are generally very sensitive, and many of them go mad due to mental contact. However, sometimes some artists become famous because they get inspiration from this madness.",
      CAI2 = "At the dark beginning of the Earth, the huge and intangible Ubbo-Sathla rested in the mud and steam. It had no head, organs, or limbs, and its slimy body flowed slowly and steadily like a wave. This worm-like form is the prototype of all life on earth. Scattered around it are magnificent stone tablets carved from extraterrestrial stones, recording the strange wisdom of the gods before creation.",
      CAI3 = "Yog-Sothoth knows where the gate is. Because Yog-Sothoth is the gate, Yog-Sothoth is the key to the gate, and the watcher. In the past, now, and in the future, everything is in Yog-Sothoth. He knows where the Old Ones broke through in the past and where they will break through again. He knows which lands in this world have been trampled by them and which lands still bear their footsteps. He also knows why no one can see their appearance when they trample on the suffering land... Yog-Sothoth is the key to the gate, and countless spaces converge here by this gate.",
      CAI4 = "The Shantak bird is not like any other bird or bat known to earth or the dreamland, because they are larger than elephants and have horse-like heads. Carter knew they must be the snake gods mentioned by the tribes living on the central plain of Yuggoth, which may have evolved into the god of the feathered serpent or Kukulkan, widely worshipped in the southern region. This god is a humanoid and capricious devil, extremely capricious and changeable... The horrifying stories circulating in secret suggest what kind of revenge mortals will face when they despise him or deliberately harm his offspring wriggling. His favorite revenge is to torture his victim appropriately before turning his enemy into a spotted snake.",
      CAI5 = "Their bodies are like folds of undulating barrels, with thin tentacles extending horizontally from the middle of the barrel body like spokes on a wheel. They have prominent nodular protrusions at the top and bottom of the barrel, and five flat, elongated arms extending from the nodules, which taper off like starfish at the ends.",
      CAI6 = "I saw the vague outline of something. The invisible creature from the stars takes on a visible form after sucking blood. It is all red and dripping with blood, pulsating with countless tentacles on its deep red body, like a constantly wriggling, pulsating jelly. At the tips of the tentacles are sucker-like mouthpieces that open and close greedily... This monster is bloated and repulsive: it has no head, no face, no eyes, only an insatiable mouth and sharp claws befitting its identity as a star-spawned creature. After sucking human blood, it finally takes form.",
}