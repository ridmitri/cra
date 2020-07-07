import React from 'react';
import { useState } from 'react';
import { Button, Form, FormGroup, Input, Card, Alert, Label } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import api from 'api';
import useStore from 'state/context';
import { createOrder } from 'state/actions';
import { updateIngredients } from './utils';
import { validateInputs } from 'components/forms/utils';
import FormError from 'components/forms/FormError';
const initialValues = {
    name: '',
    ingredients: [],
};

const initialChecked = {
    Bacon: false,
    Mushrooms: false,
    Cheese: false,
    Ananas: false,
};

const initialValidationErrors = {
    name: '',
    ingredients: '',
};

const OrderForm = () => {
    const { dispatch } = useStore();
    const [values, setValues] = useState(initialValues);
    const [checked, setChecked] = useState(initialChecked);
    const [error, setError] = useState('');
    const [validationErrors, setValidationErrors] = useState(
        initialValidationErrors
    );
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = validateInputs(values);
        if (!!errors.name || !!errors.ingredients) {
            setValidationErrors(errors);
            return;
        }

        api.order(values)
            .then(() => {
                dispatch(createOrder(values));
                setSubmitted(true);
            })
            .catch((error) => {
                setError(error);
            });
    };

    const handleChange = (name) => (e) => {
        setValues({ ...values, [name]: e.target.value });
        setValidationErrors((errors) => {
            return {
                ...errors,
                name: '',
            };
        });
    };

    const handleCheckbox = (name) => (e) => {
        const isChecked = e.target.checked;
        setChecked((checked) => {
            return {
                ...checked,
                [name]: isChecked,
            };
        });

        setValues(updateIngredients(name, isChecked));
        setValidationErrors((errors) => {
            return {
                ...errors,
                ingredients: '',
            };
        });
    };

    return submitted ? (
        <Redirect
            to={{
                pathname: '/dashboard',
                state: { from: '/order' },
            }}
        />
    ) : (
        // <p>hey</p>
        <Card body className="mt-4">
            <Form onSubmit={handleSubmit}>
                {error && (
                    <Alert color="warning" className="error-message">
                        {error}
                    </Alert>
                )}

                <FormGroup>
                    <Input
                        value={values.name}
                        onChange={handleChange('name')}
                        type="text"
                        className="form-control action-name"
                        placeholder="Enter pizza name"
                    />
                    <FormError isVisible={!!validationErrors.name} />
                </FormGroup>

                <FormGroup tag="fieldset">
                    <legend>Ingredients</legend>
                    <FormGroup check>
                        <Label check>
                            <Input
                                type="checkbox"
                                onChange={handleCheckbox('Cheese')}
                                checked={checked['Cheese']}
                                name="cheese"
                            />{' '}
                            Cheese
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input
                                type="checkbox"
                                onChange={handleCheckbox('Bacon')}
                                checked={checked['Bacon']}
                                name="bacon"
                            />{' '}
                            Bacon
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input
                                type="checkbox"
                                onChange={handleCheckbox('Mushrooms')}
                                checked={checked['Mushrooms']}
                                name="mushrooms"
                            />{' '}
                            Mushrooms
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input
                                type="checkbox"
                                onChange={handleCheckbox('Ananas')}
                                checked={checked['Ananas']}
                                name="ananas"
                            />{' '}
                            Anannas
                        </Label>
                    </FormGroup>
                    <FormError isVisible={!!validationErrors.ingredients} />
                </FormGroup>

                <FormGroup className="flex-between d-flex">
                    <Button
                        color="primary"
                        className=" ml-auto px-4 py-2 action-submit"
                    >
                        Submit
                    </Button>
                </FormGroup>
            </Form>
        </Card>
    );
};

export default OrderForm;
