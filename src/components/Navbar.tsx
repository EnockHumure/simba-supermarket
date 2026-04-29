import React from 'react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useSettings } from '../context/SettingsContext';
import { translations, type Language } from '../i18n';
import simbaLogo from '../simba-logo.png';
import AccountDropdown from './AccountDropdown';
import './Navbar.css';

interface NavbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onCartClick: () => void;
  selectedLocation: string;
  onLocationChange: (value: string) => void;
  onLoginClick: () => void;
  onSignupClick: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  searchTerm,
  onSearchChange,
  onCartClick,
  selectedLocation,
  onLocationChange,
  onLoginClick,
  onSignupClick,
  onLogout,
}) => {
  const { totalItems } = useCart();
  const { user, activeDiscount, isAdmin } = useUser();
  const { language, setLanguage, theme, setTheme, t } = useSettings();

  return (
    <header className="navbar-shell">
      <nav className="navbar" aria-label="Main Navigation">
        <button 
          className="navbar-brand" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Simba Rwanda Home"
        >
          <img src={simbaLogo} alt="Simba Supermarket" className="brand-logo-img" />
        </button>

        <label className="navbar-location">
          <span>{t('deliveringTo')}</span>
          <select 
            value={selectedLocation} 
            onChange={(event) => onLocationChange(event.target.value)}
            aria-label="Select Delivery Location"
          >
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
            aria-label="Search Products"
          />
        </div>

        <div className="navbar-controls">
          <label className="navbar-select-control">
            <span>🌐</span>
            <select 
              value={language} 
              onChange={(event) => setLanguage(event.target.value as Language)}
              aria-label="Select Language"
            >
              <option value="en">🇬🇧 English</option>
              <option value="rw">🇷🇼 Kinyarwanda</option>
              <option value="fr">🇫🇷 Français</option>
              <option value="sw">🇹🇿 Kiswahili</option>
            </select>
          </label>

          <button 
            className="theme-toggle" 
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? t('darkMode') : t('lightMode')}
          </button>
        </div>

        <div className="navbar-actions">
          <button 
            className="navbar-cart" 
            onClick={onCartClick}
            aria-label={`View Cart, ${totalItems} items`}
          >
            <span>{t('cart')}</span>
            <strong>{totalItems}</strong>
          </button>

          {user ? (
            <>
              <div className="navbar-user-info">
                <span className="user-name">{user.name}</span>
                {activeDiscount > 0 && <span className="user-badge">{activeDiscount}% {t('loyalty')}</span>}
                {isAdmin && <span className="user-badge admin-badge">🔐 Admin</span>}
              </div>
              <button className="switch-account-btn" onClick={onLogout} aria-label="Logout">
                Logout
              </button>
            </>
          ) : (
            <AccountDropdown 
              onLoginClick={onLoginClick}
              onSignupClick={onSignupClick}
            />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
