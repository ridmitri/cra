import React from 'react';
import { render, screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from './Form';
import api from 'api';
import { withState, withRouter } from 'setupTests';

jest.mock('api', () => ({
    order: jest.fn(),
}));

describe('Order page', () => {
    beforeEach(() => jest.clearAllMocks());
    it('should submit pizza', async () => {
        render(withRouter(withState()(<Form />)));

        api.order.mockImplementationOnce(() => Promise.resolve(true));

        await userEvent.type(
            screen.getByPlaceholderText(/Enter pizza name/i),
            'Mushroom'
        );

        userEvent.click(screen.getByLabelText(/Mushrooms/i));
        userEvent.click(screen.getByText(/Submit/i));

        await wait(() => expect(api.order).toBeCalled());
    });

    it('should render error message when field is empty', async () => {
        render(withRouter(withState()(<Form />)));

        api.order.mockImplementationOnce(() => Promise.resolve(true));

        await userEvent.type(
            screen.getByPlaceholderText(/Enter pizza name/i),
            'Mushroom'
        );

        userEvent.click(screen.getByText(/Submit/i));

        const error = await screen.findByText(/Field is required/i);
        expect(error).toBeInTheDocument();
        expect(api.order).not.toBeCalled();
    });
});
