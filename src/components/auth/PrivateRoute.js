import React from 'react';
import api from 'api';
import { Route, Redirect } from 'react-router-dom';
import Signout from './Signout';
import useStore from 'state/context';

const PrivateRoute = ({ children, ...rest }) => {
    const { getState } = useStore();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                getState().isAuthenticated ? (
                    <>
                        <Signout />
                        {children}
                    </>
                ) : (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
