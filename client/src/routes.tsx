import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import CreateSoftware from './components/Software/CreateSoftware';
import RequestAccess from './components/Requests/RequestAccess';
import PendingRequests from './components/Requests/PendingRequests';
import Dashboard from './components/pages/Dashboard';
import NotFound from './components/pages/NotFound';
import Navbar from './components/Layout/Navbar';
import ProtectedRoute from './components/utils/ProtectedRoute';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  // Hide Navbar on /signup and /login
  const hideNavbar = location.pathname === '/signup' || location.pathname === '/login' || location.pathname === '/';
  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
};

const AppRoutes = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/create-software" element={
            <ProtectedRoute>
              <CreateSoftware />
            </ProtectedRoute>
          } />
          <Route path="/request-access" element={
            <ProtectedRoute>
              <RequestAccess />
            </ProtectedRoute>
          } />
          <Route path="/pending-requests" element={
            <ProtectedRoute>
              <PendingRequests />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRoutes;
