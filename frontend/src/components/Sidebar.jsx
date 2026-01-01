import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/sidebar.css'; 

const Sidebar = ({ links = [], onLogout }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setCollapsed(prev => !prev);
  };

  return (
    <div className={`sidebar${collapsed ? ' collapsed' : ''}`}>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>

      <nav className="sidebar-nav">
        {links.map(link => (
          <div
            key={link.path}
            className={`sidebar-link${location.pathname === link.path ? ' active' : ''}`}
            onClick={() => navigate(link.path)}
          >
            {link.icon && <span className="me-2">{link.icon}</span>}
            {!collapsed && link.label}
          </div>
        ))}
      </nav>

      <div className="sidebar-logout" onClick={onLogout}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M10 12a.5.5 0 0 1 .5.5v1.5H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h7.5v1.5a.5.5 0 0 1-1 0V2H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h6.5v-1.5a.5.5 0 0 1 .5-.5z"/>
          <path fillRule="evenodd" d="M14.354 8.354a.5.5 0 0 1-.708 0L11.5 6.207V7.5a.5.5 0 0 1-1 0V5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-1.293l2.146 2.146a.5.5 0 0 1 0 .708z"/>
        </svg>
        {!collapsed && <span className="sidebar-logout-text">Logout</span>}
      </div>
    </div>
  );
};

export default Sidebar;
