import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Signin from 'features/signin/components/Signin';
import Dashboard from 'features/dashboard/components/Dashboard';
import PrivateRoute from 'features/signin/components/PrivateRoute';

export default function Routing() {
	return (
		<Router>
			<div>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/dashboard">Dashboard</Link>
					</li>
				</ul>

				<hr />

				<Switch>
					<Route exact path="/">
						<Signin />
					</Route>
					<PrivateRoute path="/dashboard">
						<Dashboard />
					</PrivateRoute>
				</Switch>
			</div>
		</Router>
	);
}
