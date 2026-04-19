import React from 'react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import './Navbar.css';

interface NavbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onCartClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ searchTerm, onSearchChange, onCartClick }) => {
  const { totalItems } = useCart();
  const { user, isLoyal } = useUser();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="logo-text">Simba</span>
        <span className="logo-subtext">Supermarket</span>
      </div>
      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search for fresh products..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="navbar-actions">
        {user && (
          <div className={`loyalty-status ${isLoyal ? 'loyal' : ''}`}>
            {isLoyal ? '✓ Loyal Customer (5% Off)' : 'Guest Client'}
          </div>
        )}
        <div className="navbar-cart" onClick={onCartClick}>
          <div className="cart-icon">🛒</div>
          {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
