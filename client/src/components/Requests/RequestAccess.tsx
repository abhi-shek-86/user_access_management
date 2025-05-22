import React, { useState, useEffect } from 'react';
import API from '../../api';
import { Software } from '../../types';
import Swal from 'sweetalert2';
import '../../styles/Auth.css';

const RequestAccess = () => {
  const [softwares, setSoftwares] = useState<Software[]>([]);
  const [selectedSoftware, setSelectedSoftware] = useState('');
  const [accessType, setAccessType] = useState<'Read' | 'Write' | 'Admin'>('Read');
  const [reason, setReason] = useState('');

  useEffect(() => {
    const fetchSoftwares = async () => {
      try {
        const res = await API.get('/software');
        setSoftwares(res.data);
      } catch (err) {
        Swal.fire('Error', 'Failed to fetch software', 'error');
      }
    };
    fetchSoftwares();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post('/request', {
        softwareId: selectedSoftware,
        accessType,
        reason,
      });
      Swal.fire('Success', 'Request submitted!', 'success');
      setSelectedSoftware('');
      setAccessType('Read');
      setReason('');
    } catch (err) {
      Swal.fire('Error', 'Submission failed', 'error');
    }
  };

  return (
    <form className="request-access-form" onSubmit={handleSubmit}>
      <h2>Request Access</h2>
      <label>
        Select Software:
        <select value={selectedSoftware} onChange={(e) => setSelectedSoftware(e.target.value)} required>
          <option value="">-- Select Software --</option>
          {softwares.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Access Type:
        <select value={accessType} onChange={(e) => setAccessType(e.target.value as 'Read' | 'Write' | 'Admin')}>
          <option value="Read">Read</option>
          <option value="Write">Write</option>
          <option value="Admin">Admin</option>
        </select>
      </label>

      <label>
        Reason for Access:
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
          placeholder="Provide a reason..."
        />
      </label>

      <button type="submit">Submit Request</button>
    </form>
  );
};

export default RequestAccess;
