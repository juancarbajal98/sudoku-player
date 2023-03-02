import React, { useEffect, useReducer  } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AppRoutes } from './routes/index'
import { defaultState, reducer } from './utils/reducer';
import './styles/global.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [state, dispatch] = useReducer(reducer, defaultState)
    useEffect(()=>{console.log('App initialized')}, [])
    
    return (
        // <h1>App</h1>
        <Router>
            <Routes>
                <Route path="">
                {/* <Route path="/" element={<Layout />}> */}
                    {AppRoutes.map((r, i) => {
                        return r.name === 'Home' ? <Route index key={i} element={React.createElement(r.component, {dispatch: dispatch, state: state})} /> :
                            <Route path={r.path} key={i} element={React.createElement(r.component, {dispatch: dispatch, state: state})} />
                    })}
                </Route>
            </Routes>
        </Router>
    )
};
export default App;