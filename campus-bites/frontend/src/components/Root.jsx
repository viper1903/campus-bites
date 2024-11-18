import { Outlet } from 'react-router-dom';
import Navbar from './navbar';

const Root = ({ cartItems, clearCart }) => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar cartItems={cartItems} clearCart={clearCart} />
      <main style={{ flex: 1, width: '100%' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Root; 