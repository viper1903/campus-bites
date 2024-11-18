import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/admin.css';

const AdminDashboard = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    foodCourts: []
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
  const maxFileSize = 5 * 1024 * 1024; // 5MB

  const foodCourtOptions = ['Food Court 1', 'Food Court 2', 'Food Court 3'];

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/items');
      const formattedItems = response.data.map(item => ({
        ...item,
        image: item.image.startsWith('http') 
          ? item.image 
          : `http://localhost:5000/${item.image}`
      }));
      setItems(formattedItems);
    } catch (error) {
      setError('Error fetching items');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (!file) {
      setError('Please select an image file');
      return;
    }
    
    if (!allowedFileTypes.includes(file.type)) {
      setError('Please upload only image files (JPEG, PNG, GIF)');
      return;
    }
    
    if (file.size > maxFileSize) {
      setError('File size should be less than 5MB');
      return;
    }
    
    setImage(file);
    setError(''); // Clear any existing errors
  };

  const handleFoodCourtChange = (courtName) => {
    setNewItem(prevItem => {
      const updatedFoodCourts = prevItem.foodCourts.includes(courtName)
        ? prevItem.foodCourts.filter(court => court !== courtName)
        : [...prevItem.foodCourts, courtName];
      
      return { ...prevItem, foodCourts: updatedFoodCourts };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newItem.title || !newItem.description || newItem.foodCourts.length === 0 || !image) {
      setError('All fields are required');
      return;
    }

    setIsLoading(true);
    setError('');
    
    const formData = new FormData();
    formData.append('title', newItem.title);
    formData.append('description', newItem.description);
    formData.append('foodCourts', JSON.stringify(newItem.foodCourts));
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/api/items', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.data && response.data.item) {
        const newItemWithId = {
          ...response.data.item,
          image: `http://localhost:5000/${response.data.item.image}`
        };
        
        setItems(prevItems => [...prevItems, newItemWithId]);
        setNewItem({ title: '', description: '', foodCourts: [] });
        setImage(null);
        setSuccessMessage('Item added successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error adding item');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }
    
    setError('');
    try {
      const response = await axios.delete(`http://localhost:5000/api/items/${itemId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 200) {
        setItems(prevItems => prevItems.filter(item => item._id !== itemId));
        setSuccessMessage('Item deleted successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      console.error('Delete error:', error);
      setError(error.response?.data?.message || 'Error deleting item');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      
      <div className="add-item-form">
        <h3>Add New Item</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Item Name"
            value={newItem.title}
            onChange={(e) => setNewItem({...newItem, title: e.target.value})}
          />
          <input
            type="number"
            placeholder="Price (₹)"
            value={newItem.description}
            onChange={(e) => setNewItem({...newItem, description: e.target.value})}
          />
          
          <div className="food-courts-checkbox-group">
            <label className="checkbox-group-label">Available at Food Courts:</label>
            {foodCourtOptions.map((court) => (
              <label key={court} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={newItem.foodCourts.includes(court)}
                  onChange={() => handleFoodCourtChange(court)}
                />
                {court}
              </label>
            ))}
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add Item'}
          </button>
        </form>
      </div>

      <div className="items-list">
        <h3>Current Items</h3>
        <div className="items-grid">
          {items.map(item => (
            <div key={item._id} className="item-card">
              <img src={item.image} alt={item.title} />
              <h4>{item.title}</h4>
              <p>₹{item.description}</p>
              <p>Available at: {item.foodCourts.join(', ')}</p>
              {!item.isInitial && (
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 