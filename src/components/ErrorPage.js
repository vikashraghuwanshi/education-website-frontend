import './ErrorPage.css'
import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {

  return (
    <div className="error-page-container">
      <div className="error-page-content">
        <h1>Oops! Page Not Found</h1>
        <p>The page you are looking for does not exist or you are not authorized to access it.</p>
        <Link to="/course" style={{ cursor: 'pointer' }}>Go back to Home</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
