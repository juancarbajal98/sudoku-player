import React, {useEffect} from "react"
import Button from "react-bootstrap/Button";

const NYT = ({dispatch, state}) => {
  useEffect(() => {
    // fetch, process and dispatch puzzle data 
    fetchPuzzleJson()
    .then(puzzleJson => {
      let puzzleData = processPuzzleData(puzzleJson)
      dispatch({type: 'setPuzzleData', puzzleData })
    })
    .catch(console.error);
  }, [])

  const fetchPuzzleJson = async () => {
    // fetch and return json data from backend 
    const response = await fetch('http://localhost:3001/nyt', {mode:'cors'})
    return await response.json() 
  }
  
  const processPuzzleData = (rawJson) => {
    // process data into structured puzzle format
    let puzzleData = {
      nyt: {
        name: 'The New York Times',
        dayOfWeek: rawJson.easy.day_of_week,
        selectedDifficulty: 'easy',
        easy: rawJson.easy.puzzle_data,
        medium: rawJson.medium.puzzle_data,
        hard: rawJson.hard.puzzle_data,
      }
    }
    return puzzleData
  }

  const changeDifficulty = (e) => { dispatch({type:'setNYTPuzzleDifficulty', difficulty: e.target.name }) }

    return (
      <section className='puzzle nytScreen'>
        <div className='title'>
          <h1>Sudoku Player</h1>
          {state.puzzleData && <h3>Play {state.puzzleData.nyt.dayOfWeek}'s {state.puzzleData.nyt.selectedDifficulty} sudoku puzzle by {state.puzzleData.nyt.name}.</h3>}
        </div>

        <div className='grid'>
          {state.puzzleData && <p>{state.puzzleData.nyt[`${state.puzzleData.nyt.selectedDifficulty}`].puzzle}</p>}
        </div>

        <div className='inputs'>
          <Button tabIndex='0' name='easy' onClick={(e) => {changeDifficulty(e)}}>Easy</Button>
          <Button tabIndex='1' name='medium' onClick={(e) => {changeDifficulty(e)}}>Medium</Button>
          <Button tabIndex='2' name='hard' onClick={(e) => {changeDifficulty(e)}}>Hard</Button>
        </div>
      </section>
    )
}

export default NYT;