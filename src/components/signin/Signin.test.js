import React from 'react';
import { render } from '@testing-library/react';
import Signin from './Signin';

describe('Signin page', () => {
    it('renders Sign in', () => {
        const { getByText } = render(<Signin />);
        const linkElement = getByText(/Sign in/i);
        expect(linkElement).toBeInTheDocument();
    });
});
