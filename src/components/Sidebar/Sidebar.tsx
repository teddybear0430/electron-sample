import React from 'react';
import { Link } from 'react-router-dom'

const Layout: React.FC = () => {
  return (
    <aside className="sidebar">
      <Link to="/">Home</Link>
      <Link to="/Setting">設定</Link>
    </aside>
  );
};

export default Layout;
