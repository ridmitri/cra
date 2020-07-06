import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from './Form';
import api from 'api';

jest.mock('api', () => ({
    authenticate: jest.fn(),
}));

describe('Signin Form ', () => {
    it('submits email and password', async () => {
        const { getByPlaceholderText } = render(<Form />);

        api.authenticate.mockImplementationOnce(() => Promise.resolve(true));

        await userEvent.type(
            getByPlaceholderText(/Enter your email/i),
            'admin@mailinator.com'
        );
        await userEvent.type(
            getByPlaceholderText(/Enter your password/i),
            '123456'
        );
        fireEvent.click(screen.getByText(/Login/i));

        expect(api.authenticate).toBeCalled();
    });

    it('Shows error message when credentials are incorrect', async () => {
        const { getByPlaceholderText } = render(<Form />);

        api.authenticate.mockImplementationOnce(() =>
            Promise.reject('Login error')
        );

        await userEvent.type(
            getByPlaceholderText(/Enter your email/i),
            'admin@mailinator.com'
        );
        await userEvent.type(
            getByPlaceholderText(/Enter your password/i),
            '123456'
        );

        fireEvent.click(screen.getByText(/Login/i));

        const error = await screen.findByText(/Login error/i);
        expect(error).toBeInTheDocument();
    });

    it('Removes error message when starts typing', async () => {
        const { getByPlaceholderText } = render(<Form />);

        api.authenticate.mockImplementationOnce(() =>
            Promise.reject('Login error')
        );

        await userEvent.type(
            getByPlaceholderText(/Enter your email/i),
            'admin@mailinator.com'
        );
        await userEvent.type(
            getByPlaceholderText(/Enter your password/i),
            '123456'
        );

        fireEvent.click(screen.getByText(/Login/i));

        const error = await screen.findByText(/Login error/i);

        await userEvent.type(
            getByPlaceholderText(/Enter your email/i),
            'continue'
        );
        expect(error).not.toBeInTheDocument();
    });
});
