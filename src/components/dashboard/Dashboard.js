import React from 'react';
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
import { Link } from 'react-router-dom';
export default React.memo(function Dashboard() {
    return (
        <Container className="mt-4 ">
            <Row className="align-items-center">
                <Col className="col-md-4 col-sm-12 mx-auto">
                    <h2>Dashboard</h2>
                    <Link to="/order">
                        <Button
                            color="primary"
                            className=" ml-auto px-4 py-2 action-order"
                        >
                            Place an order
                        </Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
});
