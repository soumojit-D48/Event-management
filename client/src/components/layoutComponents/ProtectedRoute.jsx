// import React from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// // import { useAuth } from '@/context/AuthContext';
// import LoadingSpinner from '../layoutComponents/LoadingSpinner';
// import { useIsAuthQuery } from '@/state/api';




// const ProtectedRoute = ({ children }) => {


//     const {data: authUser, isLoading: authLoading} = useIsAuthQuery()
//     console.log(authUser, "sdhshfjfsk");
    

//   // Show loading spinner while checking authentication
//   if (authLoading) {
//     return <LoadingSpinner />;
//   }

//   // If user is not authenticated, redirect to sign-in with current location
//   if (!authUser) {
//     return <Navigate to="/signin" state={{ from: location }} replace />;
//   }

//   // User is authenticated, render the protected component
//   return children;
// };

// export default ProtectedRoute;





import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useIsAuthQuery } from '@/state/api';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children }) => {
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

  // Check if account is verified and approved
  if (!authUser.user.isAccountVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Email Not Verified</h2>
          <p className="text-gray-600 mb-6">
            Please verify your email address to access this page.
          </p>
          <button
            onClick={() => window.location.href = '/verify-email'}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Verify Email
          </button>
        </div>
      </div>
    );
  }

  if (!authUser.user.isApproved) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Pending Approval</h2>
          <p className="text-gray-600 mb-6">
            Your account is waiting for admin approval. You'll be notified once approved.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  // User is authenticated and approved
  return children;
};

export default ProtectedRoute;



