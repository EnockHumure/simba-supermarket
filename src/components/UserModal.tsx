import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useSettings } from '../context/SettingsContext';
import { isValidRwandanPhone, normalizeRwandanPhone } from '../i18n';
import './UserModal.css';

const UserModal: React.FC = () => {
  const { user, login } = useUser();
  const { t } = useSettings();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  if (user) {
    return null;
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (!isValidRwandanPhone(phone)) {
      setError(t('phoneError'));
      return;
    }

    if (name && phone) {
      login(name, normalizeRwandanPhone(phone));
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content user-modal">
        <div className="simba-badge">{t('loginBadge')}</div>
        <div className="simba-intro-card">
          <h3>{t('simbaIntroTitle')}</h3>
          <p>{t('simbaIntroBody')}</p>
        </div>
        <h2>{t('loginTitle')}</h2>
        <p>{t('loginDescription')}</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t('fullName')}</label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Uwase Aline"
              required
            />
          </div>

          <div className="form-group">
            <label>{t('phoneNumber')}</label>
            <input
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="+25078XXXXXXX / 0788XXXXXX"
              required
            />
            {error && <p className="phone-error-msg">{error}</p>}
            <p className="phone-hint">{t('phoneHint')}</p>
          </div>

          <button type="submit" className="login-btn">
            {t('enterSimba')}
          </button>
        </form>

        <p className="loyalty-tip">{t('loyaltyTip')}</p>
      </div>
    </div>
  );
};

export default UserModal;
