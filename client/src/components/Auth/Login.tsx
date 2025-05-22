import React, { useState } from 'react';
import API from '../../api';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../styles/Auth.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      localStorage.setItem('username', res.data.username); // <-- Use backend username
      Swal.fire('Success', 'Login successful!', 'success');
      setTimeout(() => navigate('/dashboard'), 1200);
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        Swal.fire('Error', err.response.data.message, 'error');
      } else {
        Swal.fire('Error', 'Login failed', 'error');
      }
    }
  };

  return (
    <form className="auth-container" onSubmit={handleLogin}>
      <h2>Login</h2>
      <label htmlFor="login-username">Enter your username</label>
      <input
        id="login-username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <label htmlFor="login-password">Enter your password</label>
      <input
        id="login-password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
      <div className="auth-link">
        Don't have an account? <Link to="/signup">Signup here</Link>
      </div>
      {/* Add this block for default admin credentials */}
      <div style={{ marginTop: 24, background: "#fff7e6", border: "1px solid #ff9800", borderRadius: 8, padding: 12, color: "#ff9800", fontWeight: 500 }}>
        <div>Default Admin Credentials:</div>
        <div>Username: <b>admin</b></div>
        <div>Password: <b>admin123</b></div>
      </div>
    </form>
  );
};

export default Login;
