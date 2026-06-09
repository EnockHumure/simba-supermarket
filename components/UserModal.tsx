import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useSettings } from '../context/SettingsContext';
import { isValidRwandanPhone, normalizeRwandanPhone } from '../i18n';
import './UserModal.css';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
  role?: 'customer' | 'admin' | 'superadmin';
}

type AuthMode = 'login' | 'signup' | 'forgot';

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, initialMode = 'login', role = 'customer' }) => {
  const { user, signup, login, resetPassword } = useUser();
  const { t } = useSettings();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (user || !isOpen) {
    return null;
  }

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setPhone('');
    setError('');
    setSuccess('');
  };

  const handleSignup = (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (phone.trim() && !isValidRwandanPhone(phone)) {
      setError(t('phoneError'));
      return;
    }

    const result = signup(
      name,
      email,
      password,
      phone.trim() ? normalizeRwandanPhone(phone) : undefined
    );

    if (result.success) {
      onClose();
      resetForm();
    } else {
      setError(result.error || 'Signup failed');
    }
  };

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    const result = login(email, password);

    if (result.success) {
      onClose();
      resetForm();
    } else {
      setError(result.error || 'Login failed');
    }
  };

  const handleForgotPassword = (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    const result = resetPassword(email, password);

    if (result.success) {
      setSuccess('Password reset successful! You can now login.');
      setTimeout(() => {
        setMode('login');
        resetForm();
      }, 2000);
    } else {
      setError(result.error || 'Password reset failed');
    }
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    resetForm();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content user-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          ✕
        </button>

        <div className="simba-badge">{t('loginBadge')}</div>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
            onClick={() => switchMode('login')}
          >
            {t('loginTab')}
          </button>
          <button
            className={`auth-tab ${mode === 'signup' ? 'active' : ''}`}
            onClick={() => switchMode('signup')}
          >
            {t('signupTab')}
          </button>
        </div>

        <div className="account-page-hero">
          <h2>
            {mode === 'login' && t('loginTitle')}
            {mode === 'signup' && t('signupTitle')}
            {mode === 'forgot' && t('forgotTitle')}
          </h2>
          <p>
            {mode === 'login' && t('loginDescription')}
            {mode === 'signup' && t('signupDescription')}
            {mode === 'forgot' && t('forgotDescription')}
          </p>
        </div>

        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}

        {mode === 'signup' && (
          <form onSubmit={handleSignup}>
            <div className="form-group">
              <label>{t('fullName')}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Uwase Aline"
                required
              />
            </div>

            <div className="form-group">
              <label>{t('emailAddress')}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label>{t('password')}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                minLength={6}
                required
              />
              <p className="phone-hint">{t('passwordHint')}</p>
            </div>

            <div className="form-group">
              <label>{t('phoneOptional')}</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+25078XXXXXXX / 0788XXXXXX"
              />
              <p className="phone-hint">{t('phoneHint')}</p>
            </div>

            <div className="account-actions">
              <button type="submit" className="login-btn">
                {t('createAccount')}
              </button>
              <button type="button" className="guest-btn" onClick={onClose}>
                {t('continueGuest')}
              </button>
            </div>
          </form>
        )}

        {mode === 'login' && (
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>{t('emailAddress')}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label>{t('password')}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="button"
              className="forgot-password-link"
              onClick={() => switchMode('forgot')}
            >
              {t('forgotPassword')}
            </button>

            <div className="account-actions">
              <button type="submit" className="login-btn">
                {t('loginButton')}
              </button>
              <button type="button" className="guest-btn" onClick={onClose}>
                {t('continueGuest')}
              </button>
            </div>
          </form>
        )}

        {mode === 'forgot' && (
          <form onSubmit={handleForgotPassword}>
            <div className="form-group">
              <label>{t('emailAddress')}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label>{t('newPassword')}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                minLength={6}
                required
              />
              <p className="phone-hint">{t('passwordHint')}</p>
            </div>

            <div className="account-actions">
              <button type="submit" className="login-btn">
                {t('resetPassword')}
              </button>
              <button
                type="button"
                className="guest-btn"
                onClick={() => switchMode('login')}
              >
                {t('backToLogin')}
              </button>
            </div>
          </form>
        )}

        {mode !== 'forgot' && (
          <div className="loyalty-tip">
            <strong>{t('loyaltyTipTitle')}</strong>
            <p>{t('loyaltyTip')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserModal;
