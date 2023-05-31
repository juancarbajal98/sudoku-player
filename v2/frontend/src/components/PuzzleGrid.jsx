import React from 'react'

const PuzzleGrid = ({data, dispatch}) => {

  return(
    <div className='puzzleGrid'>
      <div className='rows'>{[1,2,3,4,5,6,7,8].map(r => {return <div className='line row' id={'row' + r} key ={r} ></div>})}</div>
      <div className='cols'>{[1,2,3,4,5,6,7,8].map(c => {return <div className='line col' id={'col' + c} key ={c} ></div>})}</div>
      {/* <p>{JSON.stringify(data.nyt[data.nyt.selectedDifficulty].puzzle)}</p> */}
    </div>
  )
};
export {PuzzleGrid}