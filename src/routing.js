import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Signin from 'components/signin/Signin';
import Dashboard from 'components/dashboard/Dashboard';
import Order from 'components/order/Order';
import PrivateRoute from 'components/auth/PrivateRoute';

export default function Routing() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Signin />
                </Route>
                <PrivateRoute path="/dashboard">
                    <Dashboard />
                </PrivateRoute>
                <PrivateRoute path="/:id" children={<Order />} />
            </Switch>
        </Router>
    );
}
