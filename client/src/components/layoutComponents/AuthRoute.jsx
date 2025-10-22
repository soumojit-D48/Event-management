// import React from 'react';

// const AuthLayout = ({ children }) => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         {children}
//       </div>
//     </div>
//   );
// };

// export default AuthLayout;


import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background Text (Eco Quest) */}
      <h1 className="absolute inset-0 flex items-start justify-center text-5xl sm:text-8xl md:text-9xl lg:text-[150px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-500 to-green-700 opacity-10 select-none pointer-events-none">
        Campus Sync
      </h1>

      {/* Foreground Content */}
      <div className="relative max-w-md w-full space-y-8">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;








/*
// ============ REGULAR LAYOUT (AUTH PAGES - NO SIDEBAR) ============
const Layout = ({ children, showNavFooter = true }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {showNavFooter && (
        <nav className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center cursor-pointer">
              <Calendar className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Campus<span className="text-blue-600"> Sync</span>
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-gray-700 hover:text-blue-600">
                Sign In
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Get Started
              </button>
            </div>
          </div>
        </nav>
      )}
      <main className="flex-1">
        {children}
      </main>
      {showNavFooter && (
        <footer className="bg-gray-900 text-gray-400 py-8 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <p>© 2025 Campus Sync. All rights reserved.</p>
          </div>
        </footer>
      )}
    </div>
  );
};
*/
