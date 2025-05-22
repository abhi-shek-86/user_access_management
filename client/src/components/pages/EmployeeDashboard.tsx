import React, { useEffect, useState } from 'react';
import API from '../../api';
import { AccessRequest } from '../../types';
import Swal from 'sweetalert2';

const EmployeeDashboard: React.FC = () => {
  const [requests, setRequests] = useState<AccessRequest[]>([]);

  useEffect(() => {
    API.get('/request/my').then(res => setRequests(res.data));
  }, []);

  const handleDelete = async (id: number) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this request?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });
    if (confirm.isConfirmed) {
      try {
        await API.delete(`/request/${id}`);
        setRequests((prev) => prev.filter((req) => req.id !== id));
        Swal.fire('Deleted!', 'Your request has been deleted.', 'success');
      } catch {
        Swal.fire('Error', 'Failed to delete request', 'error');
      }
    }
  };

  return (
    <div className="auth-container" style={{ maxWidth: 600 }}>
      <h2>Employee Dashboard</h2>
      <p>Welcome! Here are your access requests:</p>
      <ul>
        {requests.map(req => (
          <li key={req.id}>
            <b>{req.software.name}</b> - {req.accessType}
            <span
              className={
                'status-badge ' +
                (req.status === 'Approved'
                  ? 'status-approved'
                  : req.status === 'Rejected'
                  ? 'status-rejected'
                  : 'status-pending')
              }
            >
              {req.status}
            </span>
            <br />
            <small>Reason: {req.reason}</small>
            {req.status === 'Pending' && (
              <button onClick={() => handleDelete(req.id)} style={{ marginLeft: 8, color: 'red' }}>
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeDashboard;