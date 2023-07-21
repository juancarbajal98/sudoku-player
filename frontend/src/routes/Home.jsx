import React from "react"
import { NewPuzzleButton } from '../components/NewPuzzleButton'

const Home = ({ dispatch, state }) => {

    return (
        <section className='homeScreen' style={{ 'backgroundColor': state.settings.backgroundColor }}>
            <div className="homeScreen--title">
                <h1>Sudoku</h1>
                <h1>Player</h1>
            </div>

            <NewPuzzleButton dispatch={dispatch} state={state} tabIndex='0' />
            {/* <SettingsButton  dispatch={dispatch} state={state} tabIndex='0' /> */}
        </section>
    )
}

export default Home;