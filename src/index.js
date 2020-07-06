import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routing from './routing';
import * as serviceWorker from './serviceWorker';
import { reducer, initialState } from 'state/reducer';

import 'bootstrap/dist/css/bootstrap.min.css';

import {StoreContext} from 'state/context';

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            <Routing />
        </StoreContext.Provider>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
