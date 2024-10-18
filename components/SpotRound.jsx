// SpotRounds.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, ListGroup } from 'react-bootstrap';

const SpotRounds = () => {
    const [spotRounds, setSpotRounds] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSpotRounds = async () => {
            try {
                const response = await fetch('http://localhost:3001/spot_rounds'); // Fetch from backend
                if (!response.ok) {
                    throw new Error('Failed to fetch spot rounds');
                }
                const data = await response.json();
                setSpotRounds(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchSpotRounds();
    }, []);

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (spotRounds.length === 0) {
        return <div>Loading spot rounds...</div>;
    }

    return (
        <Container className="my-4" style={{ paddingTop: '100px' }}>
            <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>Available Spot Rounds</h1>
            <ListGroup>
                {spotRounds.map((round) => (
                    <ListGroup.Item key={round.college_id}>
                        <Link to={`/spot-rounds/details/${round.college_id}`}>
                            {round.college_name}
                        </Link>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default SpotRounds;
