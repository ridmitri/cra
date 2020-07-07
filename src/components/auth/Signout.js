import React from 'react';
import api from 'api';
import useStore from 'state/context';
import { signout } from 'state/actions';

import { Button, Container, Col, Row} from 'reactstrap';

export default function Signout() {
    const { dispatch } = useStore();

    const handleSignout = () => {
        api.signout().then(() => {
            dispatch(signout());
        });
    };

    return (
        <Container className="mt-4 ">
            <Row className="align-items-center">
                <Col className="col-md-4 col-sm-12 mx-auto">
                    <Button
                        onClick={handleSignout}
                        color="link"
                        className=" ml-auto px-4 py-2 action-signout"
                    >
                        Signout
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}
