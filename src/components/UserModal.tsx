import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import './UserModal.css';

const UserModal: React.FC = () => {
  const { user, login } = useUser();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  if (user) {
    return null;
  }

  const validateRwandanPhone = (number: string) => {
    const rwandaRegex = /^\+2507[8923]\d{7}$/;
    return rwandaRegex.test(number);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (!validateRwandanPhone(phone)) {
      setError('Use a valid Rwanda number starting with +25078, +25079, +25072, or +25073.');
      return;
    }

    if (name && phone) {
      login(name, phone);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content user-modal">
        <div className="simba-badge">simba rwanda</div>
        <h2>Start with your Rwanda number</h2>
        <p>We restore your Simba profile, visit history, and loyalty discounts using the same phone number.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full name</label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Uwase Aline"
              required
            />
          </div>

          <div className="form-group">
            <label>Phone number</label>
            <input
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="+25078XXXXXXX"
              required
            />
            {error && <p className="phone-error-msg">{error}</p>}
            <p className="phone-hint">Supported prefixes: +25078, +25079, +25072, +25073</p>
          </div>

          <button type="submit" className="login-btn">
            Enter Simba
          </button>
        </form>

        <p className="loyalty-tip">Returning shoppers keep admin-assigned discounts and purchase counts.</p>
      </div>
    </div>
  );
};

export default UserModal;
