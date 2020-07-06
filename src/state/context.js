import { createContext, useContext } from 'react';

// helps to avoid boilerplate in integration testing
const emptyContext = {
  dispatch: () => {},
  state: {}
}

const StoreContext = createContext(emptyContext);

export const useStore = () => {
    const {state, dispatch} = useContext(StoreContext);
    return {dispatch, getState: () => state};
};

export default StoreContext;
