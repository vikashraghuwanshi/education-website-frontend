import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Footer from './Footer';

const Home = () => {


    console.log("Welcome to Home")

  return (
    <div className="home-page">

     <div className="hero">
        <div className="hero-content">
          <h2>Welcome to our Education Platform</h2>
          <p>Get ready to embark on a journey of knowledge and growth.</p>
          <Link to="/course" className="explore-courses-btn">
            Explore Courses
          </Link>
        </div>
      </div>

      <section className="features">
        <div className="feature">
          <i className="fas fa-book"></i>
          <h3>Wide Range of Courses</h3>
          <p>Explore our extensive collection of courses across various subjects.</p>
        </div>
        <div className="feature">
          <i className="fas fa-users"></i>
          <h3>Expert Instructors</h3>
          <p>Learn from industry experts who have real-world experience.</p>
        </div>
        <div className="feature">
          <i className="fas fa-certificate"></i>
          <h3>Certifications</h3>
          <p>Earn certifications upon completing courses to enhance your credentials.</p>
        </div>
      </section>

      <Footer/>
    </div>
  );
};

export default Home;
