import React from 'react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useSettings } from '../context/SettingsContext';
import { translations, type Language } from '../i18n';
import './Navbar.css';

interface NavbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onCartClick: () => void;
  selectedLocation: string;
  onLocationChange: (value: string) => void;
  onLoginClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  searchTerm,
  onSearchChange,
  onCartClick,
  selectedLocation,
  onLocationChange,
  onLoginClick,
}) => {
  const { totalItems } = useCart();
  const { user, activeDiscount, logout, isAdmin } = useUser();
  const { language, setLanguage, theme, setTheme, t } = useSettings();

  return (
    <header className="navbar-shell">
      <nav className="navbar">
        <button className="navbar-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="brand-mark">
            <img src="/favicon.svg" alt="Simba" />
          </span>
          <span className="brand-copy">
            <strong>simba</strong>
            <small>rwanda</small>
          </span>
        </button>

        <label className="navbar-location">
          <span>{t('deliveringTo')}</span>
          <select value={selectedLocation} onChange={(event) => onLocationChange(event.target.value)}>
            <option>Kigali CBD</option>
            <option>Kimironko</option>
            <option>Kacyiru</option>
            <option>Remera</option>
            <option>Nyamirambo</option>
            <option>Kicukiro</option>
            <option>Nyarutarama</option>
            <option>Kanombe</option>
          </select>
        </label>

        <div className="navbar-search">
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>

        <div className="navbar-controls">
          <label className="navbar-select-control">
            <span>Language</span>
            <select value={language} onChange={(event) => setLanguage(event.target.value as Language)}>
              {Object.entries(translations).map(([code, value]) => (
                <option key={code} value={code}>
                  {value.languageName}
                </option>
              ))}
            </select>
          </label>

          <button className="theme-toggle" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            {theme === 'light' ? t('darkMode') : t('lightMode')}
          </button>
        </div>

        <div className="navbar-actions">
          <div className="navbar-account">
            <span className="navbar-account-label">{user ? user.name : t('guest')}</span>
            <strong>
              {activeDiscount > 0 ? `${activeDiscount}% ${t('loyalty')}` : isAdmin ? 'Admin' : t('newShopper')}
            </strong>
          </div>

          <button className="navbar-cart" onClick={onCartClick}>
            <span>{t('cart')}</span>
            <strong>{totalItems}</strong>
          </button>

          {user ? (
            <button className="switch-account-btn" onClick={logout}>
              {t('switchAccount')}
            </button>
          ) : (
            <button className="switch-account-btn" onClick={onLoginClick}>
              {t('signInSimba')}
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
