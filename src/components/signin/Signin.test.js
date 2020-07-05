import React from 'react';
import { render } from '@testing-library/react';
import Signin from './Signin';

test('renders learn react link', () => {
    const { getByText } = render(<Signin />);
    const linkElement = getByText(/Signin/i);
    expect(linkElement).toBeInTheDocument();
});
