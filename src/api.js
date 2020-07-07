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
    updateStatus: (id, status) => {
        const orders = readOrders();
        const update = orders.map((order) => {
            if (order.id === id) {
                order.status = status;
            }
            return order;
        });
        localStorage.setItem('orders', JSON.stringify(update));
        return success(true);
    },
    order: (order) => {
        const orders = readOrders();
        orders.push(order);
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
    signout() {
        api.isAuthenticated = false;
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        return success(true);
    },
};

export default api;
