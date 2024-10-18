import React, { useEffect, useState } from 'react';
import CollegeDetails from './CollegeDetails';

const CollegePage = () => {
    const [college, setCollege] = useState(null);
    const [loading, setLoading] = useState(true);
    const collegeId = '670bef317aa581157ef9867b'; // Replace with the dynamic ID as needed

    useEffect(() => {
        const fetchCollegeData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/college/details/${collegeId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCollege(data); // Set the college data
            } catch (error) {
                console.error("Error fetching college data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCollegeData();
    }, [collegeId]);

    if (loading) {
        return <div>Loading...</div>; // Show loading state while fetching
    }

    return (
        <div>
            {college ? (
                <CollegeDetails college={college} />
            ) : (
                <div>No college data found.</div>
            )}
        </div>
    );
};

export default CollegePage;
