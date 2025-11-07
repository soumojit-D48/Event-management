

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useIsAuthQuery } from '@/state/api';
import LoadingSpinner from './LoadingSpinner';
import UnauthorizedPage from './UnauthorizedPage';

const RoleBasedRoute = ({ children, allowedRoles = [] }) => {
  const location = useLocation();
  const { data: authUser, isLoading: authLoading } = useIsAuthQuery();

  // Show loading while checking authentication
  if (authLoading) {
    return <LoadingSpinner />;
  }

  // Not authenticated - redirect to signin
  if (!authUser?.user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // Check verification and approval (same as ProtectedRoute)
  if (!authUser.user.isAccountVerified || !authUser.user.isApproved) {
    return <Navigate to="/dashboard" replace />;
  }

  // Check role access
  const userRole = authUser.user.role?.toLowerCase();
  const hasAccess = allowedRoles.length === 0 || allowedRoles.includes(userRole);

  // Not authorized for this role
  if (!hasAccess) {
    return <UnauthorizedPage />;
  }

  // User has access
  return children;
};

export default RoleBasedRoute;