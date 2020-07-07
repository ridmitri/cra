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
import { v4 as uuid } from 'uuid';

const USER = {
    email: 'admin@mailinator.com',
    password: '123456',
};

const call = (mode, ...args) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (mode === 'success') {
                resolve(...args);
            } else if (mode === 'failure') {
                reject(...args);
            }
        }, 250);
    });
};

const success = (...args) => call('success', ...args);
const failure = (...args) => call('failure', ...args);

const readOrders = () => {
    let orders = [];
    try {
        orders = JSON.parse(localStorage.getItem('orders'));
    } catch (e) {}

    return orders || [];
};

const api = {
    isAuthenticated: false,
    order: (order) => {
        const orders = readOrders();
        orders.push({
            ...order,
            id: uuid(),
            created: Date.now()
        });
        localStorage.setItem('orders', JSON.stringify(orders));
        return success(true);
    },
    restoreSession() {
        const email = localStorage.getItem('email');
        const password = localStorage.getItem('password');
        if (email === USER.email && password === USER.password) {
            api.isAuthenticated = true;
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
            const orders = readOrders();
            return success(orders);
        } else {
            return failure();
        }
    },
    authenticate({ email, password }) {
        if (email === USER.email && password === USER.password) {
            api.isAuthenticated = true;
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
            const orders = readOrders();
            return success(orders);
        } else {
            return failure('Wrong credentials.');
        }
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
