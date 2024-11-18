import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import '../CSS/navbar.css';
import { FiShoppingCart } from 'react-icons/fi';

const Navbar = ({ cartItems, clearCart }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, setIsAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        !profileRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    clearCart();
    setIsAuthenticated(false);
    setShowDropdown(false);
    navigate('/login');
  };

  const handleDashboardClick = () => {
    setShowDropdown(false);
    navigate('/admin');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Campus Bites
        </Link>

        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-links">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/about" className="navbar-links">About</Link>
          </li>
          <li className="navbar-item">
            <Link to="/item" className="navbar-links">Items</Link>
          </li>
          <li className="navbar-item">
            <Link to="/contact" className="navbar-links">Contact</Link>
          </li>
          {location.pathname === '/item' && isAuthenticated && (
            <li className="navbar-item">
              <Link to="/cart" className="navbar-links cart-link">
                <span className="cart-icon">
                  <FiShoppingCart />
                </span>
                {cartItems.length > 0 && (
                  <span className="cart-count">{cartItems.length}</span>
                )}
              </Link>
            </li>
          )}
        </ul>

        <div className="nav-auth">
          {isAuthenticated ? (
            <div className="profile-section">
              <div 
                ref={profileRef}
                className="user-icon"
                onClick={toggleDropdown}
              >
                <i className="fas fa-user"></i>
              </div>
              {showDropdown && (
                <div ref={dropdownRef} className="dropdown-menu">
                  {isAdmin && (
                    <button 
                      onClick={handleDashboardClick} 
                      className="dropdown-item"
                    >
                      Dashboard
                    </button>
                  )}
                  <button onClick={handleLogout} className="dropdown-item">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="auth-button">Login</Link>
              <Link to="/signup" className="auth-button">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;