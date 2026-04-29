import React from 'react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useSettings } from '../context/SettingsContext';
import { type Language } from '../i18n';
import simbaLogo from '../simba-logo.png';
import AccountDropdown from './AccountDropdown';

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
    <header className="sticky top-0 z-[50] bg-white border-b border-simba-line shadow-sm">
      <nav className="max-w-[1200px] mx-auto px-4 h-20 flex items-center gap-6" aria-label="Main Navigation">
        <button 
          className="flex-shrink-0" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Simba Rwanda Home"
        >
          <img src={simbaLogo} alt="Simba Supermarket" className="h-12 object-contain" />
        </button>

        <label className="hidden lg:flex flex-col text-[11px] font-bold text-simba-muted uppercase">
          <span>{t('deliveringTo')}</span>
          <select 
            className="bg-transparent text-simba-ink text-sm font-extrabold outline-none cursor-pointer"
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

        <div className="flex-1 relative max-w-xl">
          <input
            className="w-full bg-simba-bg border border-simba-line rounded-xl px-4 py-3 text-sm focus:border-simba-primary focus:ring-1 focus:ring-simba-primary outline-none transition-all"
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            aria-label="Search Products"
          />
        </div>

        <div className="hidden md:flex items-center gap-4">
          <label className="flex items-center gap-2 bg-simba-bg border border-simba-line rounded-lg px-3 py-2 cursor-pointer">
            <span className="text-lg">🌐</span>
            <select 
              className="bg-transparent text-xs font-bold outline-none"
              value={language} 
              onChange={(event) => setLanguage(event.target.value as Language)}
              aria-label="Select Language"
            >
              <option value="en">GB English</option>
              <option value="rw">RW Kinyarwanda</option>
              <option value="fr">FR Français</option>
              <option value="sw">TZ Kiswahili</option>
            </select>
          </label>

          <button 
            className="px-3 py-2 bg-simba-bg border border-simba-line rounded-lg text-xs font-bold text-simba-muted hover:text-simba-primary transition-colors" 
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? t('darkMode') : t('lightMode')}
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button 
            className="flex items-center gap-3 bg-simba-primary text-white px-5 py-2.5 rounded-xl font-bold hover:shadow-lg transition-all active:scale-95" 
            onClick={onCartClick}
            aria-label={`View Cart, ${totalItems} items`}
          >
            <span className="text-sm">{t('cart')}</span>
            <strong className="bg-white/20 px-2 py-0.5 rounded-md text-sm">{totalItems}</strong>
          </button>

          {user ? (
            <div className="flex items-center gap-3 pl-3 border-l border-simba-line">
              <div className="flex flex-col items-end">
                <span className="text-sm font-bold text-simba-ink">{user.name}</span>
                <div className="flex gap-1 mt-0.5">
                  {activeDiscount > 0 && <span className="bg-green-100 text-green-700 text-[10px] px-1.5 py-0.5 rounded font-black">{activeDiscount}% {t('loyalty')}</span>}
                  {isAdmin && <span className="bg-simba-purple/10 text-simba-purple text-[10px] px-1.5 py-0.5 rounded font-black">🔐 Admin</span>}
                </div>
              </div>
              <button 
                className="text-xs font-bold text-simba-muted hover:text-simba-primary transition-colors underline" 
                onClick={onLogout} 
                aria-label="Logout"
              >
                Logout
              </button>
            </div>
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
