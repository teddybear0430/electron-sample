import React from 'react';
import Sidebar from '../Sidebar/Sidebar';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Sidebar />
      { children }
    </>
  );
};

export default Layout;
