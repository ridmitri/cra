import React from 'react';
import { render, screen } from '@testing-library/react';
import Order from './Order';
import produce from 'immer';

import { updateIngredients } from './Form';

describe('updateIngredients', () => {
    it.only('should remove an ingredient when unchecked', () => {
        const currentValues = {
            ingredients: ['Bacon', 'Mushrooms'],
        };
        const name = 'Bacon';
        const isChecked = false;
        const result = { ingredients: ['Mushrooms'] };
        const producer = produce(updateIngredients(name, isChecked));
        expect(producer(currentValues)).toEqual(result);
    });

    it.only('should not duplicate new ingredient when checked', () => {
        const currentValues = {
            ingredients: ['Bacon', 'Mushrooms'],
        };
        const name = 'Bacon';
        const isChecked = true;
        const result = { ingredients: ['Bacon', 'Mushrooms'] };

        const producer = produce(updateIngredients(name, isChecked));
        expect(producer(currentValues)).toEqual(result);
    });

    it.only('should add an ingredient when checked', () => {
        const currentValues = {
            ingredients: ['Bacon', 'Mushrooms'],
        };
        const name = 'Oil';
        const isChecked = true;
        const result = { ingredients: ['Bacon', 'Mushrooms', 'Oil'] };

        const producer = produce(updateIngredients(name, isChecked));
        expect(producer(currentValues)).toEqual(result);
    });
});

describe('Order page', () => {
    it('renders order page', () => {
        const { getByText } = render(<Order />);
        const header = getByText(/Order/i);
        expect(header).toBeInTheDocument();
    });

    it('should submit pizza', async () => {
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
});
