import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useSettings } from '../context/SettingsContext';
import { isValidRwandanPhone, normalizeRwandanPhone } from '../i18n';
import './UserModal.css';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose }) => {
  const { user, login } = useUser();
  const { t } = useSettings();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  if (user || !isOpen) {
    return null;
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (phone.trim() && !isValidRwandanPhone(phone)) {
      setError(t('phoneError'));
      return;
    }

    if (name && email) {
      login(name, email, phone.trim() ? normalizeRwandanPhone(phone) : undefined);
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content user-modal">
        <div className="simba-badge">{t('loginBadge')}</div>
        <div className="account-page-hero">
          <div>
            <h2>{t('loginTitle')}</h2>
            <p>{t('loginDescription')}</p>
          </div>
          <div className="simba-intro-card">
            <h3>{t('simbaIntroTitle')}</h3>
            <p>{t('simbaIntroBody')}</p>
          </div>
        </div>

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
            <label>{t('emailAddress')}</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label>{t('phoneOptional')}</label>
            <input
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="+25078XXXXXXX / 0788XXXXXX"
            />
            {error && <p className="phone-error-msg">{error}</p>}
            <p className="phone-hint">{t('phoneHint')}</p>
          </div>

          <div className="account-actions">
            <button type="submit" className="login-btn">
              {t('enterSimba')}
            </button>
            <button type="button" className="guest-btn" onClick={onClose}>
              {t('continueGuest')}
            </button>
          </div>
        </form>

        <div className="loyalty-tip">
          <strong>Loyalty</strong>
          <p>{t('loyaltyTip')}</p>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
