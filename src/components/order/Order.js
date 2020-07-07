import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Form from './Form';
import { Link } from 'react-router-dom';

export default function Order() {
    return (
        <Container className="mt-4 ">
            <Row className="align-items-center">
                <Col className="col-md-4 col-sm-12 mx-auto">
                    <Link to="/dashboard">Dashboard</Link>
                    <h2>Order</h2>
                    <Form />
                </Col>
            </Row>
        </Container>
    );
}
