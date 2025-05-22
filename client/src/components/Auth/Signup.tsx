import React, { useState } from 'react';
import API from '../../api';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../styles/Auth.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'Employee' | 'Manager'>('Employee');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post('/auth/signup', { email, username, password, role });
      localStorage.setItem('username', username); // Save username
      Swal.fire('Success', 'Signup successful! Please login.', 'success');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message === 'Email exists') {
        Swal.fire('Error', 'Email already exists!', 'error');
      } else if (err.response && err.response.data && err.response.data.message === 'Username exists') {
        Swal.fire('Error', 'Username already exists!', 'error');
      } else {
        Swal.fire('Error', 'Signup failed', 'error');
      }
    }
  };

  return (
    <form className="auth-container" onSubmit={handleSignup}>
      <h2>Signup</h2>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
        required
      />
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <label htmlFor="signup-role">Select Role</label>
      <select
        id="signup-role"
        value={role}
        onChange={e => setRole(e.target.value as 'Employee' | 'Manager')}
        className="role-select"
        required
      >
        <option value="Employee">Employee</option>
        <option value="Manager">Manager</option>
      </select>
      <button type="submit">Register</button>
      <div className="auth-link">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </form>
  );
};

export default Signup;
