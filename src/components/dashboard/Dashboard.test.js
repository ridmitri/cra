import React from 'react';
import { render } from '@testing-library/react';
import Dashboard from './Dashboard';
import { withRouter, withState } from 'setupTests';

const initialState = {
    isLoaded: true,
    isAuthenticated: true,
    orders: [
        {
            name: 'xxx',
            ingredients: ['Cheese'],
            id: '4c0cab84-f34f-44ae-870e-ce9050b13d28',
            created: 1594135970274,
        },
        {
            name: 'submit',
            ingredients: ['Mushrooms'],
            id: '4f101c47-b943-468e-8127-bdc22a0c8971',
            created: 1594135937167,
        },
        {
            name: '123',
            ingredients: ['Ananas', 'Bacon'],
            id: 'd018a4de-bda5-4006-96bb-3d27eeaeac04',
            created: 1594135924979,
        },
    ],
};

test('renders learn react link', () => {
    const { getByText } = render(
        withRouter(withState(initialState)(<Dashboard />))
    );
    const header = getByText(/Dashboard/i);
    expect(header).toBeInTheDocument();
});
