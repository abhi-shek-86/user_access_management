import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getRole, logout } from '../utils/auth';
import '../../styles/Auth.css';

const Navbar: React.FC = () => {
  const role = getRole();
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/dashboard" style={{ marginRight: '10px' }}>Home</Link>
      {role === 'Admin' && (
        <Link to="/create-software" style={{ marginRight: '10px' }}>Create Software</Link>
      )}
      {role === 'Employee' && (
        <Link to="/request-access" style={{ marginRight: '10px' }}>Request Access</Link>
      )}
      {role === 'Manager' && (
        <Link to="/pending-requests" style={{ marginRight: '10px' }}>Pending Requests</Link>
      )}
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 16 }}>
        {username && (
          <span style={{ color: 'var(--orange-primary)', fontWeight: 600 }}>
            {username}
          </span>
        )}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
