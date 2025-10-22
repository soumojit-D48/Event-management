import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '../layoutComponents/LoadingSpinner';
import { useIsAuthQuery } from '@/state/api';




const ProtectedRoute = ({ children }) => {
//   const { user, loading } = useAuth();
//   const location = useLocation();

    const {data: authUser, isLoading: authLoading} = useIsAuthQuery()

  // Show loading spinner while checking authentication
  if (loading) {
    return <LoadingSpinner />;
  }

  // If user is not authenticated, redirect to sign-in with current location
  if (!user) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  // User is authenticated, render the protected component
  return children;
};

export default ProtectedRoute;