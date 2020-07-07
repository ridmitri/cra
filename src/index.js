import React, { useReducer, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routing from './routing';
import * as serviceWorker from './serviceWorker';
import { reducer, initialState } from 'state/reducer';

import 'bootstrap/dist/css/bootstrap.min.css';
import api from 'api';
import { signin, loadingDone } from 'state/actions';
import { Alert } from 'reactstrap';
import { StoreContext } from 'state/context';

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { isLoaded } = state;

    useEffect(() => {
        api.restoreSession()
            .then((orders) => {
                dispatch(signin(orders));
            })
            .catch(() => {
                dispatch(loadingDone());
            });
    }, []);

    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {!isLoaded ? <Alert color="info">Loading...</Alert> : <Routing />}
        </StoreContext.Provider>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
