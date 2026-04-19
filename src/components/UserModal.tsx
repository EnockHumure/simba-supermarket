import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import './UserModal.css';

const UserModal: React.FC = () => {
  const { user, login } = useUser();
  const [name, setName] = useState('');
  const [clientId, setClientId] = useState('');

  if (user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && clientId) {
      login(name, clientId);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content user-modal">
        <h2>Welcome to Simba Online</h2>
        <p>Please enter your details to start shopping and earn loyalty rewards!</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="e.g. John Doe"
              required 
            />
          </div>
          <div className="form-group">
            <label>Client ID / Phone</label>
            <input 
              type="text" 
              value={clientId} 
              onChange={(e) => setClientId(e.target.value)} 
              placeholder="e.g. 078XXXXXXX"
              required 
            />
          </div>
          <button type="submit" className="login-btn">Start Shopping</button>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
