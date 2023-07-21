import React, {useEffect} from "react"
import Button from "react-bootstrap/Button";

import { PuzzleTable } from '../components/PuzzleTable'

const NYT = ({dispatch, state}) => {
  useEffect(() => {
    // fetch, process and dispatch puzzle data 
    fetchPuzzleJson()
    .then(puzzleJson => {
      let puzzle = processPuzzle(puzzleJson)
      dispatch({type: 'setPuzzle', puzzle })
    })
    .catch(console.error);
  }, [])

  const fetchPuzzleJson = async () => {
    // fetch and return json data from backend 
    const response = await fetch('http://localhost:3001/nyt', {mode:'cors'})
    return await response.json() 
  }
  
  const processPuzzle = (rawJson) => {
    // process data into structured puzzle format
    let puzzle = {
      name: 'The New York Times',
      dayOfWeek: rawJson.easy.day_of_week,
      difficulty: 'easy',
      easy: rawJson.easy.puzzle_data,
      medium: rawJson.medium.puzzle_data,
      hard: rawJson.hard.puzzle_data,
    }
    return puzzle
  }

  const changeDifficulty = (e) => { dispatch({type:'setPuzzleDifficulty', difficulty: e.target.name }) }

    return (
      <section className='puzzle nytScreen'>
        <div className='title'>
          <h1>Sudoku Player</h1>
          <h3>Play {state.puzzle ? state.puzzle.dayOfWeek : 'today'}'s {state.puzzle ? state.puzzle.difficulty : 'easy'} sudoku puzzle by {state.puzzle ? state.puzzle.name : ''}.</h3>
        </div>

        <PuzzleTable puzzle={state.puzzle ? state.puzzle : null} dispatch={dispatch} />
        
        <div className='controls'>
          <Button tabIndex='0' name='easy' onClick={(e) => {changeDifficulty(e)}}>Easy</Button>
          <Button tabIndex='1' name='medium' onClick={(e) => {changeDifficulty(e)}}>Medium</Button>
          <Button tabIndex='2' name='hard' onClick={(e) => {changeDifficulty(e)}}>Hard</Button>
        </div>
      </section>
    )
}

export default NYT;