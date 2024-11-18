import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import { FiPlus, FiMinus, FiTrash2, FiShoppingCart } from 'react-icons/fi';
import { motion } from 'framer-motion';
import "../CSS/cart.css";

const Cart = ({ items = [], setItems }) => {
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleQuantityChange = (index, change) => {
    const updatedItems = [...items];
    const newQuantity = (updatedItems[index].quantity || 1) + change;
    
    if (newQuantity < 1) {
      handleRemoveItem(index);
      return;
    }
    
    updatedItems[index].quantity = newQuantity;
    setItems(updatedItems);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      return total + (item.description * (item.quantity || 1));
    }, 0);
  };

  if (!items || items.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/item')}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="cart-layout">
      <div className="cart-items-section">
        <h2>Shopping Cart</h2>
        <div className="cart-items">
          {items.map((item, index) => (
            <div key={index} className="cart-item">
              <div className="item-info">
                <img src={item.image} alt={item.title} className="cart-item-image" />
                <div className="item-details">
                  <h3>{item.title}</h3>
                  <p className="price-tag">₹{item.description}</p>
                  {item.foodCourt && (
                    <p className="food-court-tag">{item.foodCourt}</p>
                  )}
                </div>
              </div>
              <div className="item-actions">
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(index, -1)}>
                    <FiMinus />
                  </button>
                  <span>{item.quantity || 1}</span>
                  <button onClick={() => handleQuantityChange(index, 1)}>
                    <FiPlus />
                  </button>
                </div>
                <button 
                  className="remove-button"
                  onClick={() => handleRemoveItem(index)}
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="cart-summary-section">
        <div className="cart-total">
          <h3>Total Amount</h3>
          <p>₹{calculateTotal().toFixed(2)}</p>
        </div>
        <div className="qr-code">
          <QRCode value={`Total Amount: ₹${calculateTotal().toFixed(2)}`} size={150} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
