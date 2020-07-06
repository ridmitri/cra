import React from 'react';
import { useState } from 'react';
import {
    Button,
    Form,
    FormGroup,
    Input,
    Container,
    Card,
    Col,
    Row,
    Alert,
} from 'reactstrap';
import api from 'api';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation,
} from 'react-router-dom';

const SigninForm = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');

    const { email, password } = values;

    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values });
        api.authenticate(values)
            .then(() => {
                // dispatch(signedIn())
            })
            .catch((error) => {
                setError(error);
            });
    };

    const handleChange = (name) => (e) => {
        setValues({ ...values, [name]: e.target.value });
        setError('');
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
                </FormGroup>

                <FormGroup className="form-group">
                    <Input
                        value={password}
                        onChange={handleChange('password')}
                        type="password"
                        className="form-control action-password"
                        placeholder="Enter your password"
                    />
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
