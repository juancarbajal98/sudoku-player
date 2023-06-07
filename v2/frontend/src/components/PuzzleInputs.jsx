import React from 'react'

const PuzzleInputs = ({state, dispatch}) => {
  return(
    <div className='inputs'>
      {[...Array(82).keys()].slice(1).map(i => {return <input type='text' className='inputElem' id={'input' + i} key={i}/>})}
    </div>
  )
};
export {PuzzleInputs}