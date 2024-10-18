import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, ListGroup, Collapse, Button } from 'react-bootstrap';
import './SpotRoundDetails.css'; // Import the CSS file

const SpotRoundDetails = () => {
    const { collegeId } = useParams(); // Get collegeId from the URL
    const [collegeDetails, setCollegeDetails] = useState(null);
    const [error, setError] = useState(null);
    const [openRounds, setOpenRounds] = useState({}); // State to track opened rounds

    useEffect(() => {
        const fetchCollegeDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3001/spot_rounds/details/${collegeId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCollegeDetails(data);
            } catch (err) {
                setError(`Failed to fetch college details: ${err.message}`);
            }
        };

        fetchCollegeDetails();
    }, [collegeId]);

    const toggleRound = (year, round) => {
        const key = `${year}-${round}`; // Unique key for each year and round combination
        setOpenRounds((prev) => ({
            ...prev,
            [key]: !prev[key], // Toggle the current round
        }));
    };

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!collegeDetails) {
        return <div>Loading college details...</div>;
    }

    return (
        <Container className="my-4" style={{ paddingTop: '150px' }}>
            <h1 className="college-title">
                {collegeDetails.college_name} <span className="abbreviation">({collegeDetails.abbreviation})</span>
            </h1>
            {/* Center the college image */}
            <div className="image-container" style={{ display: 'flex', justifyContent: 'center' }}>
                <img
                    src={collegeDetails.img}
                    alt={`${collegeDetails.college_name} logo`}
                    style={{ width: '50%', height: '400px', objectFit: 'cover', marginBottom: '20px' }} // Added marginBottom for space below the image
                    className="college-image" // Optional: Add class for additional styling if needed
                />
            </div>
            <Card className="spot-details-card">
                <Card.Body>
                    <Card.Title className="spot-title">Spot Cutoffs</Card.Title>
                    {collegeDetails.spot_cutoffs.map((cutoff, index) => (
                        <div key={index} className="mb-4 cutoff-section">
                            <h5 className="cutoff-year">Year: {cutoff.year}</h5>
                            {cutoff.rounds.map((round, roundIndex) => (
                                <div key={roundIndex}>
                                    <Button
                                        variant="link"
                                        onClick={() => toggleRound(cutoff.year, round.round)} // Pass year and round to toggle
                                        aria-controls={`round-${cutoff.year}-${round.round}`}
                                        aria-expanded={openRounds[`${cutoff.year}-${round.round}`]} // Check if this specific round is open
                                        className="round-toggle-button"
                                    >
                                        {round.round} 
                                        <span className={openRounds[`${cutoff.year}-${round.round}`] ? "arrow-up" : "arrow-down"} />
                                    </Button>
                                    <Collapse in={openRounds[`${cutoff.year}-${round.round}`]}>
                                        <div id={`round-${cutoff.year}-${round.round}`}>
                                            <ListGroup>
                                                {round.details.map((detail, detailIndex) => (
                                                    <ListGroup.Item key={detailIndex} className="detail-item">
                                                        <strong>Course:</strong> {detail.course}<br />
                                                        <strong>Available Seats:</strong> {detail.available_seats}<br />
                                                        <strong>Cutoff Score:</strong> {detail.cutoff_score}<br />
                                                        <strong>Last Candidate Rank:</strong> {detail.last_candidate_rank}
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        </div>
                                    </Collapse>
                                </div>
                            ))}
                        </div>
                    ))}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default SpotRoundDetails;
