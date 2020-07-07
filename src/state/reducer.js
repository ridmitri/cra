import produce from 'immer';
import { UPDATE, CREATE, SIGNIN, SIGNOUT, LOADED } from './constants';

export const initialState = {
    isLoaded: false,
    isAuthenticated: false,
    orders: [],
};



export const reducer = produce((draft = initialState, action) => {
    switch (action.type) {
        case UPDATE: {
            console.log(action)
            const index = draft.orders.findIndex(
                (order) => action.id === order.id
            );
            if (index !== -1) {
                draft.orders[index].status = action.status
            }
            break;
        }

        case CREATE: {
            draft.orders.unshift(action.order);
            break;
        }

        case SIGNIN: {
            draft.isAuthenticated = true;
            draft.isLoaded = true;
            draft.orders = action.orders || [];
            draft.orders = draft.orders.sort((a, b) => b.created - a.created);
            break;
        }

        case LOADED: {
            draft.isLoaded = true;
            break;
        }

        case SIGNOUT: {
            draft.isAuthenticated = false;
            draft.orders = [];
            break;
        }

        default:
            break;
    }
});
