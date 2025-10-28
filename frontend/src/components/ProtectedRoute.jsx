// src/components/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ element, requiredRole }) => {
  const { isAuthenticated, user, isLoading } = useContext(AuthContext);
  const location = useLocation();

  console.log('ProtectedRoute: Checking authentication', {
    isAuthenticated,
    userRole: user?.role,
    requiredRole,
    isLoading,
    locationState: location.state,
  });

  if (isLoading) {
    console.log('ProtectedRoute: Waiting for auth state to load');
    return null; // Render nothing until auth state is loaded
  }

  if (!isAuthenticated) {
    console.log('ProtectedRoute: Redirecting to home - not authenticated');
    return (
      <Navigate
        to="/"
        state={{ openAuthModal: true, from: location }}
        replace
      />
    );
  }

  if (requiredRole && user?.role !== requiredRole) {
    console.log(
      'ProtectedRoute: Redirecting to home - role mismatch',
      user?.role,
      '!=',
      requiredRole
    );
    return <Navigate to="/" replace />;
  }

  console.log('ProtectedRoute: Access granted');
  return element;
};

export default ProtectedRoute;
