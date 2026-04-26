import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useSettings } from '../context/SettingsContext';
import './CartDrawer.css';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: (branchName: string, pickupTime: string, paymentMethod: string, momoDeposit?: number) => void;
  selectedLocation: string;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, onCheckout, selectedLocation }) => {
  const { cart, addToCart, removeFromCart, totalPrice, subtotal, discount, clearCart } = useCart();
  const { activeDiscount } = useUser();
  const { t } = useSettings();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [pickupTime, setPickupTime] = useState('30min');

  const generatePickupTimes = () => {
    const times = [];
    const now = new Date();
    for (let i = 30; i <= 120; i += 30) {
      const time = new Date(now.getTime() + i * 60000);
      const hours = time.getHours().toString().padStart(2, '0');
      const minutes = time.getMinutes().toString().padStart(2, '0');
      times.push({ value: `${i}min`, label: `${hours}:${minutes} (${i} min)` });
    }
    return times;
  };

  const pickupTimes = generatePickupTimes();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="cart-overlay" onClick={onClose}>
      <aside className="cart-drawer" onClick={(event) => event.stopPropagation()}>
        <div className="cart-header">
          <div>
            <p className="section-kicker">{t('yourOrder')}</p>
            <h2>{t('simbaCart')}</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="cart-content">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <h3>{t('emptyCartTitle')}</h3>
              <p>{t('emptyCartBody')}</p>
            </div>
          ) : (
            <ul className="cart-items">
              {cart.map((item) => (
                <li key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-info">
                    <p className="cart-item-name">{item.name}</p>
                    <span className="cart-item-unit">{item.price.toLocaleString()} RWF each</span>
                    <div className="cart-item-controls">
                      <button onClick={() => removeFromCart(item.id)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => addToCart(item)}>+</button>
                    </div>
                  </div>
                  <div className="cart-item-price">{(item.price * item.quantity).toLocaleString()} RWF</div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary">
              <div className="summary-row">
                <span>{t('subtotal')}</span>
                <strong>{subtotal.toLocaleString()} RWF</strong>
              </div>
              {activeDiscount > 0 && (
                <div className="summary-row discount">
                  <span>
                    {t('discount')} ({activeDiscount}%)
                  </span>
                  <strong>-{discount.toLocaleString()} RWF</strong>
                </div>
              )}
              <div className="summary-row total">
                <span>{t('total')}</span>
                <strong>{totalPrice.toLocaleString()} RWF</strong>
              </div>
            </div>

            <div className="pickup-section">
              <label className="pickup-label">{t('pickupBranch')}</label>
              <div className="pickup-info">
                <span className="pickup-icon">📍</span>
                <strong>{selectedLocation}</strong>
              </div>
            </div>

            <div className="pickup-section">
              <label className="pickup-label">{t('pickupTime')}</label>
              <select 
                className="pickup-select"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
              >
                {pickupTimes.map(time => (
                  <option key={time.value} value={time.value}>{time.label}</option>
                ))}
              </select>
            </div>

            <div className="payment-section">
              <label className="payment-label">{t('paymentMethod')}</label>
              <div className="payment-options">
                <button
                  type="button"
                  className={`payment-option ${paymentMethod === 'card' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  {t('payWithCard')}
                </button>
                <button
                  type="button"
                  className={`payment-option ${paymentMethod === 'cash' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('cash')}
                >
                  {t('payWithCash')}
                </button>
                <button
                  type="button"
                  className={`payment-option ${paymentMethod === 'mobile' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('mobile')}
                >
                  {t('payWithMobile')}
                </button>
              </div>
              {paymentMethod === 'mobile' && (
                <div className="momo-deposit-info">
                  <span className="deposit-icon">💳</span>
                  <p>A deposit of <strong>1,000 RWF</strong> will be charged via Mobile Money to confirm your pick-up.</p>
                </div>
              )}
            </div>

            <button
              className="checkout-btn"
              onClick={() => {
                const momoDeposit = paymentMethod === 'mobile' ? 1000 : undefined;
                onCheckout(selectedLocation, pickupTime, paymentMethod, momoDeposit);
              }}
            >
              {t('confirmCheckout')}
            </button>
            <button className="clear-btn" onClick={clearCart}>
              {t('clearBasket')}
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};

export default CartDrawer;
