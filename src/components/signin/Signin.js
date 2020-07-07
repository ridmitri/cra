import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import From from './Form';

const SignIn = () => {
    return (
        <Container className="mt-4 ">
            <Row className="align-items-center">
                <Col className="col-md-4 col-sm-12 mx-auto">
                    <h1 className="my-5 m-auto text-center mb-4">Sign in</h1>
                    <From />
                </Col>
            </Row>
        </Container>
    );
};

export default SignIn;
