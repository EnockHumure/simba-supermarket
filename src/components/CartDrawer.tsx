import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useSettings } from '../context/SettingsContext';
import './CartDrawer.css';

import DeliveryMap from './DeliveryMap';
import { simbaLocations } from '../locations';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: (branchName: string, pickupTime: string, paymentMethod: string, momoDeposit?: number) => void;
  selectedLocation: string;
}

const pickupTimes = [
  { value: '15min', label: 'Express (15-20 min)' },
  { value: '30min', label: 'Standard (30-40 min)' },
  { value: '1hour', label: '1 Hour' },
  { value: '2hours', label: '2 Hours' },
  { value: 'today', label: 'Later Today' },
];

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, onCheckout, selectedLocation }) => {
  const { cart, addToCart, removeFromCart, totalPrice, subtotal, discount, clearCart } = useCart();
  const { activeDiscount } = useUser();
  const { t } = useSettings();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [pickupTime, setPickupTime] = useState('30min');
  const [showMap, setShowMap] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'details'>('cart');
  const [paymentDetails, setPaymentDetails] = useState({
    phone: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const targetBranch = simbaLocations.find(l => l.name === selectedLocation) || simbaLocations[0];

  const handleCheckoutClick = () => {
    if (checkoutStep === 'cart') {
      setCheckoutStep('details');
    } else {
      const momoDeposit = paymentMethod === 'mobile' ? 1000 : undefined;
      onCheckout(selectedLocation, pickupTime, paymentMethod, momoDeposit);
      setCheckoutStep('cart');
    }
  };

  const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({ ...prev, [name]: value }));
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="cart-overlay" onClick={onClose}>
      <aside className="cart-drawer" onClick={(event) => event.stopPropagation()}>
        <div className="cart-header">
          <div>
            <p className="section-kicker">{t('yourOrder')}</p>
            <h2>{checkoutStep === 'cart' ? t('simbaCart') : 'Payment Details'}</h2>
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
          ) : checkoutStep === 'cart' ? (
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
          ) : (
            <div className="payment-details-form">
              <button className="back-btn" onClick={() => setCheckoutStep('cart')}>← Back to Items</button>
              
              {paymentMethod === 'mobile' && (
                <div className="detail-group">
                  <label>Mobile Money Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    placeholder="078... or 079..." 
                    value={paymentDetails.phone}
                    onChange={handleDetailChange}
                    className="detail-input"
                  />
                  <p className="input-hint">Enter your MoMo or Airtel number for the 1,000 RWF deposit.</p>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="card-fields">
                  <div className="detail-group">
                    <label>Card Number</label>
                    <input 
                      type="text" 
                      name="cardNumber"
                      placeholder="4444 4444 4444 4444" 
                      value={paymentDetails.cardNumber}
                      onChange={handleDetailChange}
                      className="detail-input"
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div className="detail-group">
                      <label>Expiry Date</label>
                      <input 
                        type="text" 
                        name="expiry"
                        placeholder="MM/YY" 
                        value={paymentDetails.expiry}
                        onChange={handleDetailChange}
                        className="detail-input"
                      />
                    </div>
                    <div className="detail-group">
                      <label>CVV</label>
                      <input 
                        type="text" 
                        name="cvv"
                        placeholder="123" 
                        value={paymentDetails.cvv}
                        onChange={handleDetailChange}
                        className="detail-input"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'cash' && (
                <div className="cash-notice">
                  <p>No additional details needed for Cash on Delivery. You will pay when you pick up your items at <strong>{selectedLocation}</strong>.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            {checkoutStep === 'cart' && (
              <>
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label className="pickup-label">{t('pickupBranch')}</label>
                    <button 
                      className="map-toggle-btn"
                      onClick={() => setShowMap(!showMap)}
                      style={{ fontSize: '0.75rem', color: 'var(--simba-primary)', fontWeight: 700, textDecoration: 'underline' }}
                    >
                      {showMap ? 'Hide Route' : 'Show Route'}
                    </button>
                  </div>
                  <div className="pickup-info">
                    <span className="pickup-icon">📍</span>
                    <strong>{selectedLocation}</strong>
                  </div>
                  {showMap && <DeliveryMap targetBranch={targetBranch} />}
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
                      <span className="method-icon">💳</span>
                      <div className="method-info">
                        <strong>{t('payWithCard')}</strong>
                        <span>Visa / MasterCard</span>
                      </div>
                    </button>
                    <button
                      type="button"
                      className={`payment-option ${paymentMethod === 'cash' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('cash')}
                    >
                      <span className="method-icon">💵</span>
                      <div className="method-info">
                        <strong>{t('payWithCash')}</strong>
                        <span>Pay at branch</span>
                      </div>
                    </button>
                    <button
                      type="button"
                      className={`payment-option ${paymentMethod === 'mobile' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('mobile')}
                    >
                      <span className="method-icon">📱</span>
                      <div className="method-info">
                        <strong>{t('payWithMobile')}</strong>
                        <span>MoMo / Airtel</span>
                      </div>
                    </button>
                  </div>
                  {paymentMethod === 'mobile' && (
                    <div className="momo-deposit-info">
                      <span className="deposit-icon">🔔</span>
                      <p>A deposit of <strong>1,000 RWF</strong> will be charged via Mobile Money to confirm your order.</p>
                    </div>
                  )}
                </div>
              </>
            )}

            <button
              className="checkout-btn"
              onClick={handleCheckoutClick}
            >
              {checkoutStep === 'cart' ? 'Continue to Payment' : t('confirmCheckout')}
            </button>
            {checkoutStep === 'cart' && (
              <button className="clear-btn" onClick={clearCart}>
                {t('clearBasket')}
              </button>
            )}
          </div>
        )}
      </aside>
    </div>
  );
};

export default CartDrawer;
