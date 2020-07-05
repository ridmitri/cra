import React from 'react';
import { render } from '@testing-library/react';
import Order from './Order';

test('renders learn react link', () => {
    const { getByText } = render(<Order />);
    const linkElement = getByText(/Order/i);
    expect(linkElement).toBeInTheDocument();
});
