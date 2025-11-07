

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useIsAuthQuery } from '@/state/api';
import LoadingSpinner from './LoadingSpinner';

const PublicOnlyRoute = ({ children }) => {
  const { data: authUser, isLoading: authLoading } = useIsAuthQuery();

  if (authLoading) {
    return <LoadingSpinner />;
  }

  // If authenticated, redirect to dashboard
  if (authUser?.user) {
    return <Navigate to="/dashboard" replace />;
  }

  // Not authenticated, show the public page
  return children;
};

export default PublicOnlyRoute;