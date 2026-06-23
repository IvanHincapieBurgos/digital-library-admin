import React from 'react';
import NavigationBar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <NavigationBar />
      <div className="content-wrapper">
        {children}
      </div>
    </div>
  );
};

export default Layout;
