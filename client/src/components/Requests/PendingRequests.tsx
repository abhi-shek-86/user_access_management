import React, { useEffect, useState } from 'react';
import API from '../../api';
import { AccessRequest } from '../../types';

const PendingRequests = () => {
  const [requests, setRequests] = useState<AccessRequest[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await API.get('/request/pending');
        setRequests(res.data);
      } catch (err) {
        alert('Failed to fetch pending requests');
      }
    };
    fetchRequests();
  }, []);

  const handleDecision = async (id: number, status: 'Approved' | 'Rejected') => {
    try {
      await API.patch(`/request/${id}/${status.toLowerCase()}`);
      setRequests((prev) => prev.filter((req) => req.id !== id));
    } catch (err) {
      alert(`Failed to ${status.toLowerCase()} request`);
    }
  };

  return (
    <div>
      <h2>Pending Access Requests</h2>
      {requests.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        <ul>
          {requests.map((req) => (
            <li key={req.id}>
              <p><strong>User:</strong> {req.user.username}</p>
              <p><strong>Software:</strong> {req.software.name}</p>
              <p><strong>Type:</strong> {req.accessType}</p>
              <p><strong>Reason:</strong> {req.reason}</p>
              <button onClick={() => handleDecision(req.id, 'Approved')}>Approve</button>
              <button onClick={() => handleDecision(req.id, 'Rejected')}>Reject</button>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PendingRequests;
