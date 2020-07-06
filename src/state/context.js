import React, { createContext, useContext } from 'react';

// helps to avoid boilerplate in integration tests
const emptyContext = {
  dispatch: () => {},
  state: {}
}

export const StoreContext = createContext(emptyContext);

const useStore = () => {
    const {state, dispatch} = useContext(StoreContext);
    return {dispatch, getState: () => state};
};

export default useStore;
