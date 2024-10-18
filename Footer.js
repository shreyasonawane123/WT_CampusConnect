// Footer.js
import React from 'react';
import './Footer.css'; // Optional: Create a CSS file for footer-specific styles

const Footer = () => {
    return (
        <>
            <section id="contact" className="py-5">
                <div className="container">
                    <h2 className="text-center mb-4">Contact Us</h2>
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <form id="contactForm" method="POST" action="">
                                <div className="mb-3">
                                    <input type="text" className="form-control" name="name" placeholder="Your Name" required />
                                </div>
                                <div className="mb-3">
                                    <input type="email" className="form-control" name="email" placeholder="Your Email" required />
                                </div>
                                <div className="mb-3">
                                    <textarea className="form-control" name="message" rows="4" placeholder="Your Message" required></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <div className="container-fluid bg-dark text-white-50 py-5 px-sm-3 px-lg-5">
                <div className="row pt-5">
                    <div className="col-lg-3 col-md-6 mb-5">
                        <a href="/" className="navbar-brand">
                            <h1 className="text-primary"><span className="text-white">Campus</span>Connect</h1>
                        </a>
                        <p> 
                        Our website serves as a comprehensive resource for students and parents, offering detailed information on colleges, courses, admissions, and cutoffs. We aim to simplify the college selection process, making it easier for prospective students to make informed decisions about their educational journey.</p>
                        <h6 className="text-white text-uppercase mt-4 mb-3">Support Us</h6>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-5">
                        <h5 className="text-white text-uppercase mb-4">Our Services</h5>
                        <div className="d-flex flex-column justify-content-start">
                            <a className="text-white-50 mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>HOME</a>
                            <a className="text-white-50 mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>OUR COURSES</a>
                            <a className="text-white-50 mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>ABOUT US</a>
                            <a className="text-white-50 mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>BLOG</a>
                            <a className="text-white-50 mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>GET IN TOUCH</a>
                            <a className="text-white-50 mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>SPOT ROUND</a>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-5"></div>
                    <div className="col-lg-3 col-md-6 mb-5">
                        <h5 className="text-white text-uppercase mb-4">Address</h5>
                        <p><i className="fa fa-map-marker-alt mr-2"></i>Pune Street, Maharashtra, India</p>
                        <p><i className="fa fa-phone-alt mr-2"></i>+91 95793 25554</p>
                        <p><i className="fa fa-envelope mr-2"></i>campusconnect@gmail.com</p>
                        <h6 className="text-white text-uppercase mt-4 mb-3">Newsletter</h6>
                        <div className="w-100">
                            <div className="input-group">
                                <input type="text" className="form-control border-light" placeholder="Any Suggestions" />
                                <div className="input-group-append">
                                    <button className="btn btn-primary px-3">Sign Up</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid bg-dark text-white border-top py-4 px-sm-3 px-md-5">
                <div className="row">
                    <div className="col-lg-6 text-center text-md-left mb-3 mb-md-0">
                        <p className="m-0 text-white-50">Copyright &copy; <a href="#">Domain</a>. All Rights Reserved.</p>
                    </div>
                    <div className="col-lg-6 text-center text-md-right">
                        
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;
