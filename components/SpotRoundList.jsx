import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function SpotRoundList() {
    const { collegeId } = useParams();
    const [spotRounds, setSpotRounds] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSpotRounds = async () => {
            if (!collegeId) return;

            try {
                const response = await fetch(`http://localhost:3001/spot_rounds/${collegeId}`);
                const data = await response.json();
                if (response.ok) {
                    setSpotRounds(data);
                } else {
                    setError(`No spot rounds found for college ID ${collegeId}`);
                }
            } catch (error) {
                setError('Error fetching data');
            }
        };

        fetchSpotRounds();
    }, [collegeId]);

    return (
        <div>
            {error && <p>{error}</p>}
            <h2>Spot Rounds for College ID: {collegeId}</h2>
            <ul>
                {spotRounds.map((spotRound) => (
                    <li key={spotRound.college_id}>
                        <Link to={`/spot-round/details/${spotRound.college_id}`}>
                            {spotRound.college_name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SpotRoundList;
