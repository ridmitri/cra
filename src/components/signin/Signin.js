import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import From from './Form';
import {useStore} from 'state/context';

const SignIn = () => {
    const {getState} = useStore();

    return (
        <>
            {getState().isAuthenticated ? (
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
                            <h1 className="my-5 m-auto text-center mb-4">
                                Sign in
                            </h1>
                            <From />
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    );
};

export default SignIn;
