import React, { useEffect, useState } from 'react';
import { getRole } from '../utils/auth';
import ManagerDashboard from './ManagerDashboard';
import AdminDashboard from './AdminDashboard';
import EmployeeDashboard from './EmployeeDashboard';

const Dashboard: React.FC = () => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(getRole());
  }, []);

  if (!role) return <div>Loading...</div>; // <-- Add this line

  if (role === 'Manager') return <ManagerDashboard />;
  if (role === 'Admin') return <AdminDashboard />;
  return <EmployeeDashboard />;
};

export default Dashboard;
