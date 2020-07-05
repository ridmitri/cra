import React from 'react';
import api from 'api';
import { Route, Redirect } from 'react-router-dom';

const SigninRoute = ({ children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                api.isAuthenticated ? (
                    <Redirect
                        to={{
                            pathname: '/dashboard',
                            state: { from: location },
                        }}
                    />
                ) : (
                    children
                )
            }
        />
    );
};

export default SigninRoute;
