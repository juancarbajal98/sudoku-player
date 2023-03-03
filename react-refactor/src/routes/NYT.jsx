import React, {useEffect} from "react"
import axios from 'axios'
import cheerio from 'cheerio'

// import '../styles/PuzzleScreen.css' // add this once /puzzles/nyt pattern implemented and remove styles from global

const NYT = ({dispatch, state}) => {
  useEffect(() => {
    // get puzzle data
    let puzzleData = fetchPuzzleData()
    // set puzzle data through dispatch
    dispatch({type: 'setPuzzleData', puzzleData})
  }, [])

  const fetchPuzzleData = async () => {
    let d = {}
    const url = 'https://www.nytimes.com/puzzles/sudoku';
    await axios(url).then((response) => {
      const $ = cheerio.load(response.data);
      var html_data = $('script', '#js-hook-game-wrapper').text()
      html_data = html_data.substring(html_data.indexOf('{'))
      for(const [key, value] of Object.entries(JSON.parse(html_data))){ d[key] = value }
    });
    return d
  }
  
    
    return (
      <React.Fragment>
        <h1>NYT Puzzle</h1>
        {JSON.stringify(state.puzzleData)}
      </React.Fragment>
    )
}

export default NYT;