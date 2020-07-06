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


export const MockState = (state) => children => {
  const dispatch = () => {};
  return (
      <StoreContext.Provider value={{state, dispatch}}>
          {children}
      </StoreContext.Provider>
  )
}


export default useStore;
