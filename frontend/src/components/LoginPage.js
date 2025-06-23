import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';  // make sure this file exists

const LoginPage = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', loginData);
      setMessage('');
      navigate('/dashboard');
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data);
      } else {
        setMessage('Login failed!');
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">EMS Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={loginData.username}
            onChange={handleChange}
            className="login-input"
            required
            autoFocus
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
            className="login-input"
            required
          />
          <button type="submit" className="login-btn">Login</button>
        </form>
        {message && <div className="login-error">{message}</div>}
      </div>
    </div>
  );
};

export default LoginPage;
