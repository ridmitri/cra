import React from 'react';
import { render } from '@testing-library/react';
import Dashboard from './Dashboard';
import { withRouter } from 'setupTests';

test('renders learn react link', () => {
    const { getByText } = render(withRouter(<Dashboard />));
    const header = getByText(/Dashboard/i);
    expect(header).toBeInTheDocument();
});
