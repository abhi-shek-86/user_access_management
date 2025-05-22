import React, { useEffect, useState } from 'react';
import API from '../../api';
import { AccessRequest } from '../../types';
import Swal from 'sweetalert2';
import '../../styles/Auth.css';

const ManagerDashboard: React.FC = () => {
  const [pending, setPending] = useState<AccessRequest[]>([]);
  const [history, setHistory] = useState<AccessRequest[]>([]);
  const [view, setView] = useState<'pending' | 'history'>('pending');

  useEffect(() => {
    API.get('/request/pending').then(res => setPending(res.data));
    API.get('/request/history').then(res => setHistory(res.data));
  }, []);

  const handleDecision = async (id: number, status: 'Approved' | 'Rejected') => {
    try {
      await API.patch(`/request/${id}`, { status });
      setPending(prev => prev.filter(req => req.id !== id));
      Swal.fire('Success', `Request ${status.toLowerCase()}!`, 'success');
      API.get('/request/history').then(res => setHistory(res.data));
    } catch {
      Swal.fire('Error', 'Failed to update request', 'error');
    }
  };

  const handleDelete = async (id: number) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this request from history?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });
    if (confirm.isConfirmed) {
      try {
        await API.delete(`/request/manager/${id}`);
        setHistory(prev => prev.filter(req => req.id !== id));
        Swal.fire('Deleted!', 'Request has been deleted.', 'success');
      } catch {
        Swal.fire('Error', 'Failed to delete request', 'error');
      }
    }
  };

  return (
    <div className="auth-container" style={{ maxWidth: 800 }}>
      <h2>Manager Dashboard</h2>
      <div className="manager-toggle-btns">
        <button
          className={view === 'pending' ? 'active' : ''}
          onClick={() => setView('pending')}
        >
          Pending Requests
        </button>
        <button
          className={view === 'history' ? 'active' : ''}
          onClick={() => setView('history')}
        >
          Request History
        </button>
      </div>

      {view === 'pending' && (
        <>
          <p>Pending Access Requests:</p>
          <ul className="manager-list">
            {pending.map(req => (
              <li key={req.id}>
                <b>User:</b> {req.user.username} <br />
                <b>Software:</b> {req.software.name} <br />
                <b>Type:</b> {req.accessType} <br />
                <b>Reason:</b> {req.reason} <br />
                <button onClick={() => handleDecision(req.id, 'Approved')}>Approve</button>
                <button onClick={() => handleDecision(req.id, 'Rejected')}>Reject</button>
              </li>
            ))}
          </ul>
          {pending.length === 0 && <p>No pending requests.</p>}
        </>
      )}

      {view === 'history' && (
        <>
          <h3>Request History</h3>
          <ul className="manager-list">
            {history.map(req => (
              <li key={req.id}>
                <b>User:</b> {req.user.username} <br />
                <b>Software:</b> {req.software.name} <br />
                <b>Type:</b> {req.accessType} <br />
                <b>Reason:</b> {req.reason} <br />
                <b>Status:</b> {req.status} <br />
                <button onClick={() => handleDelete(req.id)}>Delete</button>
              </li>
            ))}
          </ul>
          {history.length === 0 && <p>No history requests.</p>}
        </>
      )}
    </div>
  );
};

export default ManagerDashboard;