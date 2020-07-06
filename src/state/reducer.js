import React, { useReducer, createContext } from 'react';
import produce from 'immer';
import { UPDATE, CREATE, SIGNIN, SIGNOUT } from './constants';

export const initialState = {
    isAuthenticated: false,
    orders: [],
};

export const reducer = produce((draft = initialState, action) => {
    switch (action.type) {
        case UPDATE: {
            const index = draft.orders.findIndex(
                (order) => action.id === order.id
            );
            if (index !== -1) {
                draft.orders[index].status = action.status;
            }
            break;
        }

        case CREATE: {
            draft.orders.push(action.payload);
            break;
        }

        case SIGNIN: {
            draft.isAuthenticated = true;
            draft.orders = action.orders || [];
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
