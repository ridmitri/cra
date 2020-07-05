import React from 'react';
import fakeAuth from '../api';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
	useHistory,
	useLocation,
} from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
	return (
		<Route
			{...rest}
			render={({ location }) =>
				fakeAuth.isAuthenticated ? (
					children
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
