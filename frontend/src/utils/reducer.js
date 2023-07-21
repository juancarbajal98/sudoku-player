const defaultSettings = { // global settings- unrelated to any current puzzle
    backgroundColor: 'purple',
}

const defaultState = {
    settings: defaultSettings,
    puzzle: null,
}

const reducer = (state, action) => {
    console.log(`Reducer triggered for action: ${JSON.stringify(action)}`)
    switch(action.type){
      case 'setPuzzle': 
        return {
          ...state,
          puzzle: action.puzzle
        }

      // case 'updatePuzzle':
      //   let copy  = state.puzzle
      //   let puzzleToBeUpdated = copy[copy.difficulty].puzzle
      //   puzzleToBeUpdated[action.index] = Number(action.value)
      //   copy[copy.difficulty].puzzle = puzzleToBeUpdated
      //   return {
      //     ...state,
      //     puzzle: copy
      //   }
        
      case 'setPuzzleDifficulty':
        return {
          ...state,
          puzzle:{
            ...state.puzzle,
            difficulty: action.difficulty
          },
        }
        
      default:
        throw new Error()
    }
}

export {defaultState, reducer}