import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Go Back to Home</Link>
    </div>
  );
};

export default NotFound;
