import React, { useState } from 'react';
import API from '../../api';
import Swal from 'sweetalert2'; // Add this import

const CreateSoftware = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [accessLevels, setAccessLevels] = useState<string[]>([]);

  const handleCheckboxChange = (level: string) => {
    setAccessLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post('/software', { name, description, accessLevels });
      Swal.fire('Success', 'Software created!', 'success'); // SweetAlert on success
      setName('');
      setDescription('');
      setAccessLevels([]);
    } catch (err) {
      Swal.fire('Error', 'Creation failed', 'error'); // SweetAlert on error
    }
  };

  return (
    <form className="create-software-form" onSubmit={handleSubmit}>
      <h2>Create Software</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      <div className="checkbox-group">
        <label>
          <input
            type="checkbox"
            value="Read"
            checked={accessLevels.includes('Read')}
            onChange={() => handleCheckboxChange('Read')}
          />
          Read
        </label>
        <label>
          <input
            type="checkbox"
            value="Write"
            checked={accessLevels.includes('Write')}
            onChange={() => handleCheckboxChange('Write')}
          />
          Write
        </label>
        <label>
          <input
            type="checkbox"
            value="Admin"
            checked={accessLevels.includes('Admin')}
            onChange={() => handleCheckboxChange('Admin')}
          />
          Admin
        </label>
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateSoftware;
