// src/App.js
import './App.css';
import { Link, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Home from './pages/Home/Home';
import Courses from './pages/Courses/Courses';
import About from './pages/About/About';
import Blog from './pages/Blog/Blog';
import Contact from './pages/Contact/Contact';
import Colleges from './components/Colleges';
import CollegeDetail from './components/CollegeDetails';
import SpotRound from './components/SpotRound';
import SpotRoundDetails from './components/SpotRoundDetails';
import Testimonials from './components/Testimonials'; // Import the Testimonials component
import Footer from './Footer'; // Import the new Footer component

function App() {
  return (
    <div>
      <Navbar expand="lg" className='position-absolute w-100'>
        <Container>
          <Navbar.Brand>
            <Link to="/" className='navbar-brand d-flex align-items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#dc3545" className="bi bi-backpack-fill" viewBox="0 0 16 16">
                <path d="M5 13v-3h4v.5a.5.5 0 0 0 1 0V10h1v3z" />
                <path d="M6 2v.341C3.67 3.165 2 5.388 2 8v5.5A2.5 2.5 0 0 0 4.5 16h7a2.5 2.5 0 0 0 2.5-2.5V8a6.002 6.002 0 0 0-4-5.659V2a2 2 0 1 0-4 0m2-1a1 1 0 0 1 1 1v.083a6.04 6.04 0 0 0-2 0V2a1 1 0 0 1 1-1m0 3a4 4 0 0 1 3.96 3.43.5.5 0 1 1-.99.14 3 3 0 0 0-5.94 0 .5.5 0 1 1-.99-.14A4 4 0 0 1 8 4M4.5 9h7a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5" />
              </svg>
              <span className='mx-2 text-light lh-1 fw-semibold'>
                React
                <br />
                University
                <br />
                London
              </span>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' className='bg-light' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto justify-content-end w-100'>
              <Nav.Link as={Link} to='/' className='text-uppercase'>Home</Nav.Link>
              <Nav.Link as={Link} to='/courses' className='text-uppercase'>Our Courses</Nav.Link>
              <Nav.Link as={Link} to='/about' className='text-uppercase'>About Us</Nav.Link>
              <Nav.Link as={Link} to='/blog' className='text-uppercase'>Blog</Nav.Link>
              <Nav.Link as={Link} to='/contact' className='text-uppercase'>Get In Touch</Nav.Link>
              <Nav.Link as={Link} to='/spot-rounds' className='text-uppercase'>Spot Round</Nav.Link>
              <Nav.Link as={Link} to='/testimonials' className='text-uppercase'>Testimonials</Nav.Link> {/* Add Testimonials link */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/about' element={<About />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/colleges' element={<Colleges />} />
        <Route path='/college/details/:id' element={<CollegeDetail />} />
        <Route path='/spot-rounds' element={<SpotRound />} />
        <Route path='/spot-rounds/details/:collegeId' element={<SpotRoundDetails />} />
        <Route path='/testimonials' element={<Testimonials />} /> {/* Add route for Testimonials */}
      </Routes>

      <Footer /> {/* Add the new Footer component here */}
    </div>
  );
}

export default App;
