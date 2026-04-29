import React, { useState, useRef, useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';
import './AccountDropdown.css';

interface AccountDropdownProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
}

const AccountDropdown: React.FC<AccountDropdownProps> = ({
  onLoginClick,
  onSignupClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useSettings();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="account-dropdown" ref={dropdownRef}>
      <button 
        className="account-dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        👤 Account
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="account-dropdown-menu">
          <button className="dropdown-item auth-item" onClick={() => { onLoginClick(); setIsOpen(false); }}>
            🔑 Login
          </button>
          <button className="dropdown-item auth-item" onClick={() => { onSignupClick(); setIsOpen(false); }}>
            ✨ Create Account
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;
