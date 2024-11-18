import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../CSS/Login.css';
import { useAuth } from '../context/AuthContext.jsx';

const Login = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setIsAdmin } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      
      const { token, user } = response.data;
      
      if (!token) {
        setError('No token received from server');
        return;
      }
      
      localStorage.setItem('token', token);
      localStorage.setItem('isAdmin', user.isAdmin);
      setIsAuthenticated(true);
      setIsAdmin(user.isAdmin);
      
      if (user.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login">
        <h1>Login</h1>
        {error && <div className="error-message">{error}</div>}
        <form className="form" onSubmit={handleSubmit}>
          <div className="email1">
            <input
              className="email2"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div className="password1">
            <input
              className="password2"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          <button className="submit1" type="submit">
            Login
          </button>
          <div className="signup-link">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
