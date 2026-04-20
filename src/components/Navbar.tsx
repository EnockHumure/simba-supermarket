import React from 'react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import './Navbar.css';

interface NavbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onCartClick: () => void;
  selectedLocation: string;
  onLocationChange: (value: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  searchTerm,
  onSearchChange,
  onCartClick,
  selectedLocation,
  onLocationChange,
}) => {
  const { totalItems } = useCart();
  const { user, activeDiscount } = useUser();

  return (
    <header className="navbar-shell">
      <div className="navbar-topline">
        <p>Kigali delivery for Simba Rwanda</p>
        <p>Loyalty discounts and assistant support are active</p>
      </div>

      <nav className="navbar">
        <button className="navbar-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="brand-mark">S</span>
          <span className="brand-copy">
            <strong>simba</strong>
            <small>rwanda in minutes</small>
          </span>
        </button>

        <label className="navbar-location">
          <span>Delivering to</span>
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
            placeholder="Search Simba products, categories, brands"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>

        <div className="navbar-actions">
          <div className="navbar-account">
            <span className="navbar-account-label">{user ? user.name : 'Guest'}</span>
            <strong>{activeDiscount > 0 ? `${activeDiscount}% loyalty` : 'New shopper'}</strong>
          </div>

          <button className="navbar-cart" onClick={onCartClick}>
            <span>Cart</span>
            <strong>{totalItems}</strong>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
