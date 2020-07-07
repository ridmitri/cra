import React from 'react';
import { Button, Container, Col, Row, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import useStore from 'state/context';

const OrderItem = ({ name, ingredients, status, index }) => {
    return (
        <tr>
            <th scope="row">{index}</th>
            <td>{name}</td>
            <td>{ingredients.join(', ')}</td>
            <td>{status}</td>
        </tr>
    );
};

const Dashboard = () => {
    const { getState } = useStore();

    return (
        <Container className="mt-4 ">
            <Row className="align-items-center">
                <Col className="col-md-4 col-sm-12 mx-auto">
                    <h2>Dashboard</h2>
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Ingredients</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getState().orders.map((order, idx) => (
                                <OrderItem
                                    {...order}
                                    index={idx + 1}
                                    key={order.id}
                                />
                            ))}
                        </tbody>
                    </Table>
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
};

export default Dashboard;
