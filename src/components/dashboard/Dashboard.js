import React from 'react';
import { Button, Container, Col, Row, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import useStore from 'state/context';
import { update } from 'state/actions';
import api from 'api';
import { v4 as uuid } from 'uuid';

const OrderItem = ({ name, ingredients, status, index, onClick }) => {
    return (
        <tr>
            <th scope="row">{index}</th>
            <td>{name}</td>
            <td>{ingredients.join(', ')}</td>
            <td>
                <Button
                    color="primary"
                    className=" ml-auto px-4 py-2 action-submit"
                    onClick={onClick}
                >
                    {status}
                </Button>
            </td>
        </tr>
    );
};

const Dashboard = () => {
    const { getState, dispatch } = useStore();

    const handleStatusUpdate = (id, status) => () => {
        status = status === 'waiting' ? 'ready' : 'waiting';
        api.updateStatus(id, status).then(() => {
            dispatch(update(id, status));
        });
    };

    const { orders } = getState();

    return (
        <Container className="mt-4 ">
            <Row className="align-items-center">
                <Col className="col-md-4 col-sm-12 mx-auto">
                    <h2>Dashboard</h2>
                    <p>
                        <Link to="/order">
                            <Button
                                color="primary"
                                className=" ml-auto px-4 py-2 action-order"
                            >
                                Place an order
                            </Button>
                        </Link>
                    </p>
                    {orders && (
                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Ingredients</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, idx) => {
                                    return (
                                        <OrderItem
                                            {...order}
                                            index={idx + 1}
                                            key={order.id || uuid()}
                                            onClick={handleStatusUpdate(
                                                order.id,
                                                order.status
                                            )}
                                        />
                                    );
                                })}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
