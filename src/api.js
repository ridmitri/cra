import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation,
} from 'react-router-dom';

const USER = {
    email: 'admin@mailinator.com',
    password: '123456',
};
const api = {
    isAuthenticated: false,
    authenticate({ email, password }) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email === USER.email && password === USER.password) {
                    api.isAuthenticated = true;
                    localStorage.setItem('email', email);
                    localStorage.setItem('password', password);
                    resolve();
                } else {
                    reject('Wrong credentials.');
                }
            }, 100); // fake async
        });
    },
    signout(cb) {
        api.isAuthenticated = false;
        setTimeout(cb, 100);
    },
};

export default api;

function AuthButton() {
    let history = useHistory();

    return api.isAuthenticated ? (
        <p>
            Welcome!{' '}
            <button
                onClick={() => {
                    api.signout(() => history.push('/'));
                }}
            >
                Sign out
            </button>
        </p>
    ) : (
        <p>You are not logged in.</p>
    );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                api.isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
}

function PublicPage() {
    return <h3>Public</h3>;
}

function ProtectedPage() {
    return <h3>Protected</h3>;
}

function LoginPage() {
    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: '/' } };
    let login = () => {
        api.authenticate(() => {
            history.replace(from);
        });
    };

    return (
        <div>
            <p>You must log in to view the page at {from.pathname}</p>
            <button onClick={login}>Log in</button>
        </div>
    );
}
