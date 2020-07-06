import React from 'react';
import { render, screen } from '@testing-library/react';
import Signin from './Signin';
import { MockState } from 'state/context';
import api from 'api';

jest.mock('api', () => ({
    restoreSession: jest.fn().mockImplementation(() => Promise.resolve()),
}));

describe('Signin page', () => {
    it('renders Sign in form after loading is done', () => {
        const { getByText } = render(MockState({ isLoaded: true })(<Signin />));
        const header = getByText(/Sign in/i);
        expect(header).toBeInTheDocument();
    });

    it('renders loading... when calls restore session', () => {
        api.restoreSession.mockImplementationOnce(() => Promise.reject());

        render(<Signin />);
        const loading = screen.getByText(/loading.../i);
        expect(loading).toBeInTheDocument();
        expect(api.restoreSession).toBeCalled();
    });
});
