import React from 'react';
import NavBar from './components/Navbar'; 

const Layout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;
