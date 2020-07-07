import { v4 as uuid } from 'uuid';
import { UPDATE, CREATE, SIGNIN, SIGNOUT, LOADED } from './constants';

export const signin = (orders = []) => {
    return {
        type: SIGNIN,
        orders,
    };
};

export const signout = () => {
    return {
        type: SIGNOUT,
    };
};

export const update = (id, status) => {
    return {
        type: UPDATE,
        id,
        status,
    };
};

export const createOrder = (
    order,
    id = uuid(),
    created = Date.now(),
    status = 'waiting'
) => {
    return {
        type: CREATE,
        order: {
            ...order,
            id,
            created,
            status,
        },
    };
};

export const loadingDone = () => {
    return {
        type: LOADED,
    };
};
