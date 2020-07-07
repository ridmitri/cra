import React from 'react';
import { useState } from 'react';
import { Button, Form, FormGroup, Input, Card, Alert } from 'reactstrap';
import api from 'api';
import useStore from 'state/context';
import { signin } from 'state/actions';
import { validateInputs } from 'components/forms/utils';
import FormError from 'components/forms/FormError';

const initialValidationErrors = {
    email: '',
    password: '',
};

const SigninForm = () => {
    const { dispatch } = useStore();
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    const [validationErrors, setValidationErrors] = useState(
        initialValidationErrors
    );

    const [error, setError] = useState('');

    const { email, password } = values;

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = validateInputs(values);
        if (!!errors.email || !!errors.password) {
            setValidationErrors(errors);
            return;
        }

        api.authenticate(values)
            .then((orders) => {
                dispatch(signin(orders));
            })
            .catch((error) => {
                setError(error);
            });
    };

    const handleChange = (name) => (e) => {
        setValues({ ...values, [name]: e.target.value });
        setError('');
        setValidationErrors((errors) => {
            return {
                ...errors,
                [name]: '',
            };
        });
    };

    return (
        <Card body className="mt-4">
            <Form onSubmit={handleSubmit}>
                {error && (
                    <Alert color="warning" className="error-message">
                        {error}
                    </Alert>
                )}
                <FormGroup>
                    <Input
                        value={email}
                        onChange={handleChange('email')}
                        type="email"
                        className="form-control action-email"
                        placeholder="Enter your email"
                    />
                    <FormError isVisible={!!validationErrors.email} />
                </FormGroup>

                <FormGroup className="form-group">
                    <Input
                        value={password}
                        onChange={handleChange('password')}
                        type="password"
                        className="form-control action-password"
                        placeholder="Enter your password"
                    />
                    <FormError isVisible={!!validationErrors.password} />
                </FormGroup>

                <FormGroup className="flex-between d-flex">
                    <Button
                        color="primary"
                        className=" ml-auto px-4 py-2 action-submit"
                    >
                        Login
                    </Button>
                </FormGroup>
            </Form>
        </Card>
    );
};

export default SigninForm;
