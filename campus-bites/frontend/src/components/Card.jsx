import React, { useState } from 'react';
import { FiCheck, FiAlertCircle } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import '../CSS/notification.css';

const Card = ({ item, addToCart, showAddToCart, showFoodCourtSelect }) => {
  const [selectedFoodCourt, setSelectedFoodCourt] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const isAuthenticated = localStorage.getItem('token');

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setNotificationType('error');
      setNotificationMessage('Please login to add items to cart');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      return;
    }

    if (!selectedFoodCourt && showFoodCourtSelect) {
      setNotificationType('error');
      setNotificationMessage('Please select a food court');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      return;
    }

    const itemToAdd = {
      ...item,
      foodCourt: selectedFoodCourt
    };

    addToCart(itemToAdd);
    setNotificationType('success');
    setNotificationMessage('Item added to cart successfully');
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="card-wrapper">
      <div className="card">
        <img src={item.image} alt={item.title} />
        <div className="card-body">
          <h5 className="card-title">{item.title}</h5>
          <p className="card-text">₹{item.description}</p>
          {showFoodCourtSelect && (
            <div className="food-court-select">
              <select 
                value={selectedFoodCourt}
                onChange={(e) => setSelectedFoodCourt(e.target.value)}
                className="food-court-dropdown"
              >
                <option value="">Select Food Court</option>
                {item.foodCourts?.map((fc, index) => (
                  <option key={index} value={fc}>{fc}</option>
                ))}
              </select>
            </div>
          )}
          {showAddToCart && (
            <button 
              type="button"
              className="add-to-cart-button"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
      {showNotification && (
        <div className={`notification ${notificationType}`}>
          {notificationMessage}
        </div>
      )}
    </div>
  );
};

export default Card;
