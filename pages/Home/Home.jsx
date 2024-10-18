import React, { useEffect, useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import StartCoursesImg from '../../utils/images/start-courses-img.jpg';
import FaqAccordion from '../../components/FaqAccordion/FaqAccordion';
import { Card } from 'react-bootstrap';
import Blog1Img from '../../utils/images/blog1-img.jpg';
import Blog2Img from '../../utils/images/blog2-img.jpg';
import Blog3Img from '../../utils/images/blog3-img.jpg';
import ExamLogo from '../../utils/images/exam-logo.png'; // Example exam logo
import MHT_CET_Logo from '../../utils/images/mht_cet-logo.webp'; // Example exam logo
import CAT_Logo from '../../utils/images/CAT.webp'; // Example exam logo

// Top Exams Functional Component
const TopExams = () => {
    // ... existing TopExams code ...
};

// Top Colleges Section
// Top Colleges Section
const TopColleges = () => {
    const [colleges, setColleges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchColleges = async () => {
            try {
                // Fetch top college IDs first
                const response = await fetch('http://localhost:3001/Topcolleges');
                if (!response.ok) {
                    throw new Error('Failed to fetch college IDs');
                }
                const data = await response.json();

                // Assuming the first item contains the college_ids
                const collegeIds = data[0].college_ids;

                // Fetch college details based on the IDs
                const collegeDetailsResponse = await fetch(`http://localhost:3001/getCollegesByIds?ids=${collegeIds.join(',')}`);
                if (!collegeDetailsResponse.ok) {
                    throw new Error('Failed to fetch college details');
                }
                const collegeDetailsData = await collegeDetailsResponse.json();

                setColleges(collegeDetailsData); // Set the college details state
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchColleges();
    }, []);

    if (loading) return <p>Loading colleges...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Top 10 Colleges</h2>
            <div className="table-responsive">
                <table className="table table-striped align-middle">
                    <thead>
                        <tr>
                            <th scope="col">Rank</th>
                            <th scope="col">College</th>
                            <th scope="col">Ranking</th>
                            <th scope="col">Cutoff</th>
                            <th scope="col">Application Deadline</th>
                            <th scope="col">Fees</th>
                        </tr>
                    </thead>
                    <tbody>
                        {colleges.map((college, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <div>
                                        <strong>{college.college_name}</strong>
                                        <p className="text-muted">{college.location}</p>
                                    </div>
                                </td>
                                <td>
                                    <span>{college.ranking}</span>
                                </td>
                                <td>{college.cutoff}</td>
                                <td>{college.application_deadline}</td>
                                <td>{college.fees}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


// Main Home Page Component
function Home() {
    return (
        <div className='home-page'>
            <header className='h-100 min-vh-100 d-flex align-items-center text-light'>
                <div className='container d-flex flex-column align-items-center'>
                    <h2>Welcome To</h2>
                    <h1 className='text-center fw-semibold'>Campus Connect</h1>
                    <p>Dive into the essentials of Engineering admissions, cutoffs, and college insights. We're here to guide you through the process and clarify your doubts.</p>
                    <p>Empowering you with the knowledge needed to make informed decisions. Stay informed and connected on your educational journey!</p>
                    <div className='d-flex flex-column flex-sm-row align-items-center'>
                        <Link to="/courses">
                            <button type='button' className='btn btn-danger btn-lg mx-0 mx-sm-2 my-2 my-sm-0'>Top Cities</button>
                        </Link>
                        <Link to="/contact">
                            <button type='button' className='btn btn-outline-light btn-lg mx-0 mx-sm-2 my-2 my-sm-0'>Contact Us</button>
                        </Link>
                    </div>
                </div>
            </header>

            <div className='py-5 bg-light'>
                <div className="container">
                    <div className='row d-flex align-items-center justify-content-around'>
                        <div className='col-lg-5'>
                            <h2 className='text-capitalize'>2025 start with Top Cities</h2>
                            <p><b>Education Hubs Await You :</b> Uncover the best cities for education through MHT CET. These vibrant locales are home to premier institutions and resources. Your dreams of a successful career start here. Embrace the chance to thrive in the heart of knowledge!</p>
                            <Link to="/courses">
                                <button type='button' className='btn btn-danger btn-lg mx-0 mx-sm-2 my-2 my-sm-0'>Explore Cities</button>
                            </Link>
                        </div>
                        <div className='col-lg-5 mt-5 mt-lg-0'>
                            <img src={StartCoursesImg} className='img-fluid' alt="Start Courses" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Colleges Section */}
            <TopColleges />

            {/* Top Exams Section */}
            <TopExams />

            {/* FAQ Section */}
            <div className='py-5 bg-light'>
                <div className="container">
                    <h2 className='text-center mb-5'>FAQs</h2>
                    <FaqAccordion />
                </div>
            </div>
        </div>
    );
}

export default Home;
