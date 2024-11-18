import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    rollNo: '',
    phoneNo: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const validatePhoneNumber = (phoneNo) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!validatePhoneNumber(formData.phoneNo)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        rollNo: formData.rollNo,
        phoneNo: formData.phoneNo,
        password: formData.password
      });

      setSuccessMessage('Account created successfully!');
      
      // Clear form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        rollNo: '',
        phoneNo: '',
        password: '',
        confirmPassword: ''
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      setError(error.response?.data?.message || 'Error creating account');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>Create Account</h1>
        <p className="signup-subtitle">Join us to start ordering your favorite food</p>
        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
        
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="tel"
              placeholder="Phone Number (10 digits)"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                setFormData({...formData, phoneNo: value});
              }}
              pattern="\d{10}"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Roll Number"
              name="rollNo"
              value={formData.rollNo}
              onChange={(e) => setFormData({...formData, rollNo: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              required
            />
          </div>

          <button type="submit" className="signup-button">
            Sign Up
          </button>
          
          <div className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup; 