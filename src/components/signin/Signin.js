import React, { useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import From from './Form';
import api from 'api';
import useStore from 'state/context';
import { signin, loadingDone } from 'state/actions';

const SignIn = () => {
    const { getState, dispatch } = useStore();
    const { isAuthenticated, isLoaded } = getState();

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
        <>
            {isAuthenticated ? (
                <Redirect
                    to={{
                        pathname: '/dashboard',
                        state: { from: '/' },
                    }}
                />
            ) : (
                <Container className="mt-4 ">
                    <Row className="align-items-center">
                        <Col className="col-md-4 col-sm-12 mx-auto">
                            {!isLoaded ? (
                                <p>Loading...</p>
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
            )}
        </>
    );
};

export default SignIn;
