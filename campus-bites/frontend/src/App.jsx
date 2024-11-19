import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './components/Root';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import Item from './pages/item';
import Cart from './pages/cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider } from './context/AuthContext';
import { useState, useEffect } from 'react';

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (newItem) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.title === newItem.title && item.foodCourt === newItem.foodCourt
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        const currentQuantity = updatedItems[existingItemIndex].quantity || 1;
        updatedItems[existingItemIndex].quantity = currentQuantity + 1;
        return updatedItems;
      } else {
        return [...prevItems, { ...newItem, quantity: 1 }];
      }
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root cartItems={cartItems} clearCart={clearCart} />,
      children: [
        { index: true, element: <Home /> },
        { path: "about", element: <About /> },
        { path: "contact", element: <Contact /> },
        { path: "item", element: <Item addToCart={addToCart} /> },
        { path: "cart", element: <Cart items={cartItems} setItems={setCartItems} /> },
        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },
        { path: "admin", element: <AdminDashboard /> }
      ]
    }
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
