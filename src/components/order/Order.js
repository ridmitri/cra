import React from 'react';
import { useParams } from 'react-router-dom';

export default React.memo(function Dashboard() {
    let { id } = useParams();

    return (
        <div>
            <h2>Order: {id}</h2>
        </div>
    );
});
