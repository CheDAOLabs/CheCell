 export function getPVEGameConfig(level:number){
    return {
      
        slotNum: Math.floor(Math.min(5+level/20,9)),
    
        composeNumMin: Math.floor(Math.min(2+level/80,3)),
    
        composeNumMax: Math.floor(Math.min(3+level/10,7)),
        
        cardRatio:2,
        
        typeNum: Math.floor(Math.min(4+level/10,18)),
       
        viewSize:9,
   
        totalNum: Math.floor(Math.min(10+level/10,30)),
    
        stageNum: Math.floor(Math.min(1+level/30,5)),
  
        passScore: Math.floor(Math.min(4+level/10,18)*Math.min(3+level/10,7)*2*15/10),

        playFee: Math.floor(100+level/100),

        rewardPoint:100
        
  };

}