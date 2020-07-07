import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Signin from 'components/signin/Signin';
import Dashboard from 'components/dashboard/Dashboard';
import Order from 'components/order/Order';
import PrivateRoute from 'components/auth/PrivateRoute';
import SigninRoute from 'components/auth/SigninRoute';

export default function Routing() {
    return (
        <Router>
            <Switch>
                <SigninRoute exact path="/">
                    <Signin />
                </SigninRoute>
                <PrivateRoute path="/dashboard">
                    <Dashboard />
                </PrivateRoute>
                <PrivateRoute path="/order">
                    <Order />
                </PrivateRoute>
            </Switch>
        </Router>
    );
}
