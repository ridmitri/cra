// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import React from 'react';

import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { StoreContext } from 'state/context';

export const withState = (state) => (children) => {
    const dispatch = () => {};
    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
};

export const withRouter = (children) => {
    return <Router history={createMemoryHistory()}>{children}</Router>;
};
