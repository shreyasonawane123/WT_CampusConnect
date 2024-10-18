import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Colleges from './Colleges';

function CollegeList() {
    const { location } = useParams(); // Get the location from the URL
    const [colleges, setColleges] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchColleges = async () => {
            if (!location) return; // Ensure location is not empty
            
            try {
                const response = await fetch(`http://localhost:3001/college/${location}`);
                const data = await response.json();

                console.log('Fetched data:', data); // Debugging output

                if (response.ok) {
                    setColleges(data); // Update colleges state
                } else {
                    setError(`No colleges found for ${location}`);
                }
            } catch (error) {
                console.error('Error fetching colleges:', error);
                setError('Error fetching data');
            }
        };

        fetchColleges();
    }, [location]);

    return (
        <div>
            {error && <p>{error}</p>}
            <h2>Colleges in {location}</h2>
            <ul>
                {colleges.map((college) => (
                    <li key={college._id.$oid}>
                        {/* Link to the detailed page for the specific college */}
                        <Link to={`/college/${college._id.$oid}`}>{college.name}</Link>
                        {/* Optionally, display cutoffs here */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CollegeList;
