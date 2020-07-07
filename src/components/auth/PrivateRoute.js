import React from 'react';
import api from 'api';
import { Route, Redirect } from 'react-router-dom';
import Signout from './Signout';
const PrivateRoute = ({ children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                api.isAuthenticated ? (
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
