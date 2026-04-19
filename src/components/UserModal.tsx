import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import './UserModal.css';

const UserModal: React.FC = () => {
  const { user, login } = useUser();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  if (user) return null;

  const validateRwandanPhone = (number: string) => {
    // Regex for: +250 followed by 78, 79 (MTN) or 72, 73 (Airtel), then 7 digits
    const rwandaRegex = /^\+2507[8923]\d{7}$/;
    return rwandaRegex.test(number);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateRwandanPhone(phone)) {
      setError('Please enter a valid Rwandan number starting with +250 (MTN: 78/79, Airtel: 72/73)');
      return;
    }

    if (name && phone) {
      login(name, phone);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content user-modal">
        <div className="simba-badge">🦁 Simba Supermarket</div>
        <h2>Identify Yourself</h2>
        <p>Enter your phone number to restore your loyalty points and discounts!</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Habimana Habimana"
              required 
            />
          </div>
          <div className="form-group">
            <label>Phone Number (Rwandan Code)</label>
            <input 
              type="tel" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              placeholder="+25078XXXXXXX"
              required 
            />
            {error && <p className="phone-error-msg">{error}</p>}
            <p className="phone-hint">Format: +25078... / +25079... / +25072... / +25073...</p>
          </div>
          <button type="submit" className="login-btn">Start Shopping</button>
        </form>
        <p className="loyalty-tip">Using the same number earns you Admin-granted discounts!</p>
      </div>
    </div>
  );
};

export default UserModal;
