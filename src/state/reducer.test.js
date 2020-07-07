import { reducer } from './reducer';
import { UPDATE, CREATE, SIGNIN, SIGNOUT, LOADED } from './constants';

const initialState = {
    isAuthenticated: true,
    isLoaded: true,
};

describe('Reducer', () => {
    it('should set isAuthenticted and isLoaded on SIGNIN', () => {
        const action = {
            type: SIGNIN,
        };

        const state = {
            isAuthenticated: false,
            isLoaded: false,
            orders: [],
        };

        expect(reducer(state, action)).toEqual({
            ...state,
            isAuthenticated: true,
            isLoaded: true,
        });
    });

    it('should set isLoaded on LOADED', () => {
        const action = {
            type: LOADED,
        };

        const state = {
            isLoaded: false,
        };

        expect(reducer(state, action)).toEqual({
            isLoaded: true,
        });
    });

    it('should cleanup on SIGNOUT', () => {
        const action = {
            type: SIGNOUT,
        };

        const state = {
            ...initialState,
            orders: [
                {
                    name: '1',
                },
                {
                    name: '2',
                },
            ],
        };

        const result = {
            isAuthenticated: false,
            isLoaded: true,
            orders: []
        }

        expect(reducer(state, action)).toEqual(result);
    });

    it('should change status on UPDATE', () => {
        const action = {
            type: UPDATE,
            id: 'xxx',
            status: 'new',
        };
        const state = {
            ...initialState,
            orders: [
                {
                    id: 'xxx',
                    status: 'old',
                },
            ],
        };
        const result = {
            ...initialState,
            orders: [
                {
                    id: 'xxx',
                    status: 'new',
                },
            ],
        };
        expect(reducer(state, action)).toEqual(result);
    });

    it('should add an order on CREATE', () => {
        const action = {
            type: CREATE,
            order: {
                name: 'test pizza',
            },
        };
        const state = {
            ...initialState,
            orders: [
                {
                    name: '1',
                },
            ],
        };
        const result = {
            ...initialState,
            orders: [
                {
                    name: 'test pizza',
                },
                {
                    name: '1',
                },
            ],
        };
        expect(reducer(state, action)).toEqual(result);
    });
});
