import React from 'react';
import { Fade } from 'reactstrap';

const FormError = ({ isVisible, message = 'Field is required' }) => {
    return (
        <Fade in={isVisible} tag="h5" className="mt-3">
            <p className="text-danger small">{isVisible && message}</p>
        </Fade>
    );
};

export default FormError;
