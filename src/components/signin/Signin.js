import React, { useEffect } from 'react';
import { Container, Row, Col, Alert } from 'reactstrap';
import From from './Form';
import api from 'api';
import useStore from 'state/context';
import { signin, loadingDone } from 'state/actions';

const SignIn = () => {
    const { getState, dispatch } = useStore();
    const { isLoaded } = getState();

    useEffect(() => {
        api.restoreSession()
            .then((orders) => {
                dispatch(signin(orders));
            })
            .catch(() => {
                dispatch(loadingDone());
            });
    }, [isLoaded]);

    return (
        <Container className="mt-4 ">
            <Row className="align-items-center">
                <Col className="col-md-4 col-sm-12 mx-auto">
                    {!isLoaded ? (
                        <Alert color="info">Loading...</Alert>
                    ) : (
                        <>
                            <h1 className="my-5 m-auto text-center mb-4">
                                Sign in
                            </h1>
                            <From />
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default SignIn;
