import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './Blog.css'; // Optional CSS for styling

const Blog = () => {
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/videos'); // Update this URL according to your backend
                if (!response.ok) {
                    throw new Error('Failed to fetch videos');
                }
                const data = await response.json();
                setVideos(data); // Assuming the data is an array of video objects
            } catch (err) {
                setError(err.message);
            }
        };

        fetchVideos();
    }, []);

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <Container className="my-4">
            <h1>Blog</h1>
            <Row>
                {videos.map((video) => (
                    <Col md={4} key={video._id} className="mb-4">
                        <Card>
                            <Card.Img
                                variant="top"
                                src={`https://img.youtube.com/vi/${video.video_id}/hqdefault.jpg`} // Thumbnail URL
                                alt={video.title}
                                className="video-thumbnail"
                            />
                            <Card.Body>
                                <Card.Title>{video.title}</Card.Title>
                                <Card.Text>{video.description}</Card.Text>
                                <a
                                    href={`https://www.youtube.com/watch?v=${video.video_id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary"
                                >
                                    Watch Video
                                </a>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Blog;
