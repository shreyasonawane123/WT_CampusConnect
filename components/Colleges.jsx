import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import './Colleges.css';

function Colleges() {
    const location = useLocation();
    const { city } = location.state || {};
    const [colleges, setColleges] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // New loading state
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        const fetchColleges = async () => {
            setLoading(true); // Set loading to true before fetch
            try {
                const response = await fetch(`/college/${city}`); // Use relative URL
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setColleges(data);
            } catch (error) {
                setError('Error fetching colleges: ' + error.message);
            } finally {
                setLoading(false); // Set loading to false after fetch
            }
        };

        if (city) {
            fetchColleges();
        }
    }, [city]);

    // Function to handle the click on a college name
    const handleCollegeClick = (collegeId) => {
        navigate(`/college/details/${collegeId}`); // Use navigate for internal routing
    };

    return (
        <div className="colleges-page">
            {/* Header */}
            <header className="text-center py-5">
                <h1>Colleges in {city}</h1>
            </header>
            
            <div className="container">
                {loading && <p>Loading colleges...</p>} {/* Show loading message */}
                {error && <p className="error-message">{error}</p>}
                {colleges.length > 0 ? (
                    <ul className="list-group">
                        {colleges.map((college) => (
                            <li key={college._id} className="list-group-item">
                                <div className="college-info">
                                    <span
                                        onClick={() => handleCollegeClick(college._id)} // Use the click handler
                                        className="college-link"
                                        style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }} // Add some styling
                                    >
                                        <strong>{college.name}</strong>
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    !loading && <p>No colleges found for {city}.</p> // Show this only if not loading
                )}
            </div>
        </div>
    );
}

export default Colleges;
