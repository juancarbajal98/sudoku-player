import React, {useEffect} from "react"

// import '../styles/PuzzleScreen.css' // add this once /puzzles/nyt pattern implemented and remove styles from global

const NYT = ({dispatch, state}) => {
  useEffect(() => {
    const fetchPuzzleData = async () => {
      const response = await fetch('http://localhost:8080/nyt', {mode:'cors'})
      const puzzleData = await response.json()
      dispatch({type: 'setPuzzleData', puzzleData})
    }
    fetchPuzzleData().catch(console.error);
  }, [])

  
    
    return (
      <React.Fragment>
        <h1>NYT Puzzle</h1>
        {JSON.stringify(state.puzzleData)}
      </React.Fragment>
    )
}

export default NYT;