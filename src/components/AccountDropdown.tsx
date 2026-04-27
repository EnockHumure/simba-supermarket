import React, { useState, useRef, useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';
import './AccountDropdown.css';

interface AccountDropdownProps {
  onCategorySelect: (category: string) => void;
  onLoginClick: () => void;
  onSignupClick: () => void;
}

const AccountDropdown: React.FC<AccountDropdownProps> = ({
  onCategorySelect,
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

  const categories = [
    { name: 'All Products', icon: '🛒' },
    { name: 'Cosmetics & Personal Care', icon: '💄' },
    { name: 'Sports & Wellness', icon: '⚽' },
    { name: 'Baby Products', icon: '👶' },
    { name: 'Kitchenware & Electronics', icon: '🍳' },
    { name: 'Food Products', icon: '🍕' },
    { name: 'General', icon: '📦' },
  ];

  const handleCategoryClick = (category: string) => {
    onCategorySelect(category);
    setIsOpen(false);
  };

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
          <div className="dropdown-section">
            <div className="dropdown-section-title">Categories</div>
            {categories.map((cat) => (
              <button
                key={cat.name}
                className="dropdown-item"
                onClick={() => handleCategoryClick(cat.name)}
              >
                <span className="dropdown-icon">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>

          <div className="dropdown-divider"></div>

          <div className="dropdown-section">
            <button className="dropdown-item auth-item" onClick={() => { onLoginClick(); setIsOpen(false); }}>
              🔑 Login
            </button>
            <button className="dropdown-item auth-item" onClick={() => { onSignupClick(); setIsOpen(false); }}>
              ✨ Create Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;
