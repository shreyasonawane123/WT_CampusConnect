import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Testimonials.css';

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [newTestimonial, setNewTestimonial] = useState({
        name: '',
        graduationYear: '',
        testimonial: '',
        degree: '',
        major: '',
        currentPosition: '',
        company: '',
        collegeName: '',
        photoUrl: ''
    });

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/testimonials');
            setTestimonials(response.data);
        } catch (error) {
            console.error('Error fetching testimonials:', error);
        }
    };

    const handleChange = (e) => {
        setNewTestimonial({
            ...newTestimonial,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/testimonials', newTestimonial);
            fetchTestimonials();
            setNewTestimonial({
                name: '',
                graduationYear: '',
                testimonial: '',
                degree: '',
                major: '',
                currentPosition: '',
                company: '',
                collegeName: '',
                photoUrl: ''
            });
        } catch (error) {
            console.error('Error adding testimonial:', error);
        }
    };

    return (
        <div className="container">
            <div className="testimonials-container">
                <h2>Testimonials</h2>

                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Your Name" value={newTestimonial.name} onChange={handleChange} required />
                    <input type="number" name="graduationYear" placeholder="Graduation Year" value={newTestimonial.graduationYear} onChange={handleChange} required />
                    <textarea name="testimonial" placeholder="Your Testimonial" value={newTestimonial.testimonial} onChange={handleChange} required />
                    <input type="text" name="degree" placeholder="Degree" value={newTestimonial.degree} onChange={handleChange} required />
                    <input type="text" name="major" placeholder="Major" value={newTestimonial.major} onChange={handleChange} required />
                    <input type="text" name="currentPosition" placeholder="Current Position" value={newTestimonial.currentPosition} onChange={handleChange} required />
                    <input type="text" name="company" placeholder="Company" value={newTestimonial.company} onChange={handleChange} required />
                    <input type="text" name="college" placeholder="College" value={newTestimonial.college} onChange={handleChange} required />
                    <input type="text" name="photoUrl" placeholder="Photo URL (optional)" value={newTestimonial.photoUrl} onChange={handleChange} />
                    <button type="submit">Submit Testimonial</button>
                </form>

                <h3>All Testimonials</h3>
                <ul>
                    {testimonials.length > 0 ? (
                        testimonials.map((testimonial) => (
                            <li key={testimonial._id}>
                                <p><strong>Name:</strong> {testimonial.name}</p>
                                <p><strong>Graduation Year:</strong> {testimonial.graduationYear}</p>
                                <p><strong>Testimonial:</strong> {testimonial.testimonial}</p>
                                <p><strong>Degree:</strong> {testimonial.degree}</p>
                                <p><strong>Major:</strong> {testimonial.major}</p>
                                <p><strong>Current Position:</strong> {testimonial.currentPosition}</p>
                                <p><strong>Company:</strong> {testimonial.company}</p>
                                <p><strong>College:</strong> {testimonial.college}</p>
                                <p><strong>Photo URL:</strong> {testimonial.photoUrl}</p>
                            </li>
                        ))
                    ) : (
                        <li>No testimonials available.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Testimonials;
