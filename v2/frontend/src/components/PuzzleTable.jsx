import React from 'react'

const PuzzleTable = ({puzzle, dispatch}) => {
  let numbers = puzzle ? puzzle[puzzle.difficulty].puzzle : []

  const updatePuzzle = (index, value) =>{ dispatch({type: 'updatePuzzle', index, value}) }

  return(
    <div className='puzzleTable'>
      <table cellSpacing={0}>
        {[1,2,3,4,5,6,7,8,9].map(row => {
          return <tr className={'row'+ row}>
            {[1,2,3,4,5,6,7,8,9].map(num => {
              let index = (row-1)*9 + num - 1
              return <td><input 
                type="text"
                id={'num'+index} 
                maxLength={1} 
                onChange={(e) => { updatePuzzle(index, e.target.value) }}
                defaultValue={numbers[index] === 0 ? null:numbers[index]}
              /></td>
              })}
          </tr>
        })}
      </table>
    </div>
  )
};
export {PuzzleTable}