import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from "../components/Card";
import initialItems from '../database/card_item.json';
import "../CSS/item.css";

const Item = ({addToCart}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/items');
        const apiItems = response.data;
        const formattedInitialItems = initialItems.map(item => ({
          ...item,
          id: item.id.toString(),
          foodCourts: ["Food Court 1", "Food Court 2", "Food Court 3"]
        }));
        
        const formattedApiItems = apiItems.map(item => ({
          ...item,
          id: item._id,
          image: item.image.startsWith('http') 
            ? item.image 
            : `http://localhost:5000/${item.image}`
        }));
        
        const allItems = [...formattedInitialItems, ...formattedApiItems];
        setItems(allItems);
      } catch (error) {
        // If API fails, still show initial items
        const formattedInitialItems = initialItems.map(item => ({
          ...item,
          id: item.id.toString(),
          foodCourts: ["Food Court 1", "Food Court 2", "Food Court 3"]
        }));
        setItems(formattedInitialItems);
        setError('Error fetching additional items');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      {error && <div className="error">{error}</div>}
      <div className="card-grid">
        {items.map((item) => (
          <div className="col-sm-4" key={item.id || item._id}>
            <Card item={item} addToCart={addToCart} showAddToCart={true} showFoodCourtSelect={true} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Item;
