import { reducer } from './reducer';
import { UPDATE, CREATE, SIGNIN, SIGNOUT } from './constants';

const initialState = {
    isAuthenticated: false,
    orders: [],
};

describe('Reducer', () => {
    describe('SIGNIN', () => {
        it('should set isAuthenticted on SIGNIN', () => {
            const action = {
                type: SIGNIN,
            };
            expect(reducer(initialState, action)).toEqual({
                ...initialState,
                isAuthenticated: true,
            });
        });
    });
});
