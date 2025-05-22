import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => (
  <div className="auth-container" style={{ maxWidth: 600 }}>
    <h2>Admin Dashboard</h2>
    <p>Welcome, Admin! You have full access.</p>
    <Link to="/create-software">
      <button style={{ marginTop: 20 }}className="create-software-btn">Create Software</button>
    </Link>
  </div>
);

export default AdminDashboard;