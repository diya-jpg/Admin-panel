import React from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const Navigate=useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split('/')[2]; // Extract 'home', 'devices', or 'users'
  const pageTitle = currentPath ? currentPath.charAt(0).toUpperCase() + currentPath.slice(1) : 'Home';
const handleLogout=()=>{
  localStorage.removeItem('token');
Navigate("/login");
}
  return (
    <div className="dashboard-container">
      {/* Top Navbar */}
      <nav className="navbar">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi6Pm82kcNeUJcVF43m5NAC5GmXF9TQkXJtg&s"
          alt="Company Logo"
          className="company-logo"
        />
        <h2 className="page-title">{pageTitle}</h2>
        <button id="btn_out" onClick={handleLogout}>Log Out</button>
      </nav>

      {/* Sidebar + Content */}
      <div className="main-section">
        <aside className="sidebar">
          <Link to="/dashboard/home">Home</Link>
          <Link to="/dashboard/devices">Devices</Link>
          <Link to="/dashboard/users">Users</Link>
          <Link to="/dashboard/profile">Profile</Link>
        </aside>

        <div className="content">
          <Outlet /> {/* 🔥 Nested content gets injected here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
