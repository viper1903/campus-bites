import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const token = localStorage.getItem('token');

  if (!token || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedAdminRoute; 