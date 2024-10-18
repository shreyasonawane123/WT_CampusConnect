import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './CollegeDetails.module.css';
import Container from 'react-bootstrap/Container';

const CollegeDetail = () => {
  const { id } = useParams();
  const [college, setCollege] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollegeDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/college/details/${id}`);
        if (!response.ok) {
          throw new Error('Invalid college ID');
        }
        const data = await response.json();
        setCollege(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCollegeDetails();
  }, [id]);

  if (error) {
    return <div className={styles.errorMessage}>{error}</div>;
  }

  if (!college) {
    return <div>Loading...</div>;
  }

  const CollegeDetails = ({ collegeData }) => {
    return (
      <div className={styles.collegeDetailsContainer}>
        <Container className="my-4" style={{ paddingTop: '100px' }}>
          <h1 style={{ textAlign: 'center', color: '#2c3e50', fontSize: '2.5rem' }}>
            {collegeData.name} ({collegeData.abbreviation})
          </h1>

          {/* Center the main image */}
          {collegeData.images.length > 0 && (
            <div style={{ textAlign: 'center' }}>
              <img 
                src={collegeData.images[0].url} 
                alt={collegeData.images[0].description} 
                className={styles.collegeImage} 
                style={{ width: '50%', height: '400px' }} 
              />
            </div>
          )}

          {/* Tabular format for established, location, affiliation, and contact */}
          <table className={styles.detailsTable}>
            <tbody>
              <tr>
                <td><strong>Established:</strong></td>
                <td>{collegeData.established}</td>
              </tr>
              <tr>
                <td><strong>Location:</strong></td>
                <td>{collegeData.location.address}</td>
              </tr>
              <tr>
                <td><strong>Affiliation:</strong></td>
                <td>{collegeData.affiliation}</td>
              </tr>
              <tr>
                <td><strong>Contact:</strong></td>
                <td>{collegeData.contact.phone} | {collegeData.contact.email}</td>
              </tr>
            </tbody>
          </table>

          <h2 style={{ color: '#2c3e50' }}>Courses Offered</h2>
          <table className={styles.coursesTable}>
            <thead>
              <tr>
                <th>Degree</th>
                <th>Specializations</th>
              </tr>
            </thead>
            <tbody>
              {collegeData.courses_offered.map((course, index) => (
                <tr key={index}>
                  <td><strong>{course.degree}</strong></td>
                  <td>{(course.specializations || course.fields).join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 style={{ color: '#2c3e50' }}>Campus Facilities</h2>
          <table className={styles.facilitiesTable}>
            <thead>
              <tr>
                <th>Facilities</th>
              </tr>
            </thead>
            <tbody>
              {collegeData.campus.facilities.map((facility, index) => (
                <tr key={index}>
                  <td>{facility}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 style={{ color: '#2c3e50' }}>Ranking</h2>
          <table className={styles.rankingTable}>
            <thead>
              <tr>
                <th>Type</th>
                <th>Rank</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>National Rank</td>
                <td>{collegeData.ranking.national}</td>
              </tr>
              <tr>
                <td>State Rank</td>
                <td>{collegeData.ranking.state}</td>
              </tr>
            </tbody>
          </table>

          <h2 style={{ color: '#2c3e50' }}>Cutoffs</h2>
          {Object.entries(collegeData.cutoffs).map(([exam, data]) => (
            <div key={exam}>
              <h3 style={{ color: '#2c3e50' }}>{exam}</h3>
              {Object.entries(data).map(([year, courses]) => (
                <div key={year}>
                  <h4 style={{ color: '#2c3e50' }}>{year}</h4>
                  <table className={styles.cutoffTable}>
                    <thead>
                      <tr>
                        <th>Course</th>
                        <th>General</th>
                        <th>OBC</th>
                        <th>SC</th>
                        <th>ST</th>
                        <th>EWS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(courses).map(([course, cutoffs]) => (
                        <tr key={course}>
                          <td>{course}</td>
                          <td>{cutoffs.General || 'N/A'}</td>
                          <td>{cutoffs.OBC || 'N/A'}</td>
                          <td>{cutoffs.SC || 'N/A'}</td>
                          <td>{cutoffs.ST || 'N/A'}</td>
                          <td>{cutoffs.EWS || 'N/A'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          ))}

          {/* Render additional images after the Cutoffs section */}
          {collegeData.images.length > 1 && (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <h2 style={{ color: '#2c3e50' }}>More Campus Images</h2>
              <div className={styles.imageGallery}>
                {collegeData.images.slice(1).map((image, index) => (
                  <img 
                    key={index} 
                    src={image.url} 
                    alt={image.description} 
                    className={styles.collegeImage} 
                    style={{ width: '30%', height: '300px', margin: '10px' }} 
                  />
                ))}
              </div>
            </div>
          )}
        </Container>
      </div>
    );
  };

  return <CollegeDetails collegeData={college} />;
};

export default CollegeDetail;
