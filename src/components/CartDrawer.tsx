import React from 'react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import './CartDrawer.css';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, onCheckout }) => {
  const { cart, addToCart, removeFromCart, totalPrice, subtotal, discount, clearCart } = useCart();
  const { activeDiscount } = useUser();

  if (!isOpen) return null;

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="cart-content">
          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty.</p>
          ) : (
            <ul className="cart-items">
              {cart.map((item) => (
                <li key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-info">
                    <p className="cart-item-name">{item.name}</p>
                    <div className="cart-item-controls">
                      <button onClick={() => removeFromCart(item.id)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => addToCart(item)}>+</button>
                    </div>
                  </div>
                  <div className="cart-item-price">
                    {(item.price * item.quantity).toLocaleString()} RWF
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>{subtotal.toLocaleString()} RWF</span>
              </div>
              {activeDiscount > 0 && (
                <div className="summary-row discount">
                  <span>Admin Loyalty Discount ({activeDiscount}%):</span>
                  <span>-{discount.toLocaleString()} RWF</span>
                </div>
              )}
              <div className="summary-row total">
                <span>Total:</span>
                <span>{totalPrice.toLocaleString()} RWF</span>
              </div>
            </div>
            <button className="checkout-btn" onClick={() => { onCheckout(); clearCart(); }}>
              Confirm Checkout
            </button>
            <button className="clear-btn" onClick={clearCart}>Clear Cart</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
