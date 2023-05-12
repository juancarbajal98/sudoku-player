import React, {useEffect} from "react"
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button'


/* 
TODO eventually 'nyt' would come through a prop and would be one of many puzzles offered
could consider /puzzles/nyt pattern
*/
const NewPuzzleButton = ({dispatch, state, tabIndex}) => {
    const navigate = useNavigate()
    // useEffect(() => {
    //     const navigate = useNavigate()
    // },[])
    

    return (
        <Button tabIndex={tabIndex} onClick={() => { navigate('/nyt') }}>Play today's New York Times Puzzle</Button>
    )
}
export {NewPuzzleButton}