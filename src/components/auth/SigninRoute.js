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
                            pathname: '/order',
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
