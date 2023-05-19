const defaultSettings = {
    backgroundColor: 'purple'
}

const defaultState ={
    settings: defaultSettings,
    puzzleData: null
}

const reducer = (state, action) => {
    console.log(`Reducer triggered for action: ${JSON.stringify(action)}`)
    switch(action.type){
      case 'setPuzzleData': 
        return {
          ...state,
          puzzleData: action.puzzleData
        }

      case 'setNYTPuzzleDifficulty':
        return {
          ...state,
          puzzleData: {
            ...state.puzzleData,
            nyt: {
              ...state.puzzleData.nyt,
              selectedDifficulty: action.difficulty
            }
          }
        }
        
      default:
        throw new Error()
    }
}

export {defaultState, reducer}