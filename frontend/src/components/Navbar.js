import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHome, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { MdDashboard, MdAddHome } from 'react-icons/md';
import './Navbar.css';

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <FaHome className="logo-icon" />
          <span>Spatium Lux</span>
        </Link>
        
        <div className="navbar-menu">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="nav-link">
                <MdDashboard />
                <span>Dashboard</span>
              </Link>
              <Link to="/create" className="nav-link">
                <MdAddHome />
                <span>Create Home</span>
              </Link>
              <div className="user-section">
                <div className="username">
                  <FaUser />
                  <span>{user?.username}</span>
                </div>
                <button onClick={handleLogout} className="btn-logout">
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link btn-register">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;