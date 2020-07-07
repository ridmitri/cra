import React from 'react';
import { render } from '@testing-library/react';
import Signin from './Signin';
import { withState } from 'setupTests';

jest.mock('api', () => ({
    restoreSession: jest.fn().mockImplementation(() => Promise.resolve()),
}));

describe('Signin page', () => {
    it('renders Sign in form after loading is done', () => {
        const { getByText } = render(withState({ isLoaded: true })(<Signin />));
        const header = getByText(/Sign in/i);
        expect(header).toBeInTheDocument();
    });
});
