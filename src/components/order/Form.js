import React, { useMemo } from 'react';
import { useState } from 'react';
import { Button, Form, FormGroup, Input, Card, Alert, Label } from 'reactstrap';
import api from 'api';
import useStore from 'state/context';
import { createOrder } from 'state/actions';
import produce from 'immer';

export const updateIngredients = (name, isChecked) => ({ ingredients }) => {
    if (isChecked && !ingredients.includes(name)) {
        ingredients.push(name);
    } else if (!isChecked) {
        const index = ingredients.findIndex((x) => x === name);
        ingredients.splice(index, 1);
    }
};

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

const SigninForm = () => {
    const { dispatch } = useStore();
    const [values, setValues] = useState(initialValues);
    const [checked, setChecked] = useState(initialChecked);
    const [error, setError] = useState('');

    const { name, ingredients } = values;

    const handleSubmit = (e) => {
        e.preventDefault();
        api.order(values)
            .then(() => {
                dispatch(createOrder(values));
                setValues(initialValues);
                setChecked(initialChecked);
            })
            .catch((error) => {
                setError(error);
            });
    };

    const handleChange = (name) => (e) => {
        setValues({ ...values, [name]: e.target.value });
        setError('');
    };

    const handleCheckbox = (name) => (e) => {
        const isChecked = e.target.checked;
        setChecked((checked) => {
            return {
                ...checked,
                [name]: isChecked,
            };
        });
        setValues(produce(updateIngredients(name, isChecked)));
    };

    return (
        <Card body className="mt-4">
            <Form onSubmit={handleSubmit}>
                {error && (
                    <Alert color="warning" className="error-message">
                        {error}
                    </Alert>
                )}
                {useMemo(
                    () => (
                        <FormGroup>
                            <Input
                                value={name}
                                onChange={handleChange('name')}
                                type="text"
                                className="form-control action-name"
                                placeholder="Enter pizza name"
                            />
                        </FormGroup>
                    ),
                    [values.name]
                )}

                {useMemo(
                    () => (
                        <FormGroup tag="fieldset">
                            <legend>Ingredients</legend>
                            <FormGroup check>
                                <Label check>
                                    <Input
                                        type="checkbox"
                                        onClick={handleCheckbox('Cheese')}
                                        checked={checked['Cheese']}
                                    />{' '}
                                    Cheese
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input
                                        type="checkbox"
                                        onClick={handleCheckbox('Bacon')}
                                        checked={checked['Bacon']}
                                    />{' '}
                                    Bacon
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input
                                        type="checkbox"
                                        onClick={handleCheckbox('Mushrooms')}
                                        checked={checked['Mushrooms']}
                                    />{' '}
                                    Mushrooms
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input
                                        type="checkbox"
                                        onClick={handleCheckbox('Ananas')}
                                        checked={checked['Ananas']}
                                    />{' '}
                                    Anannas
                                </Label>
                            </FormGroup>
                        </FormGroup>
                    ),
                    [values.ingredients]
                )}

                {useMemo(
                    () => (
                        <FormGroup className="flex-between d-flex">
                            <Button
                                color="primary"
                                className=" ml-auto px-4 py-2 action-submit"
                            >
                                Order
                            </Button>
                        </FormGroup>
                    ),
                    []
                )}
            </Form>
        </Card>
    );
};

export default SigninForm;
