import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // For styling

const HomePage = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to EMS - Employee Management System</h1>
      </header>

      <section className="home-content">
        <p>
          Manage your employees effortlessly with EMS. Track details, departments, and much more.
        </p>

        <Link to="/login" className="login-icon" title="Login">
          Get Start
        <i className="bi bi-box-arrow-in-right"></i>
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
