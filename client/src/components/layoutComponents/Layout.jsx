import React from 'react';
import SimpleNavbar from './SimpleNavbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleNavbar />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
};

export default Layout;
