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

  if (!isOpen) {
    return null;
  }

  return (
    <div className="cart-overlay" onClick={onClose}>
      <aside className="cart-drawer" onClick={(event) => event.stopPropagation()}>
        <div className="cart-header">
          <div>
            <p className="section-kicker">Your order</p>
            <h2>Simba cart</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            x
          </button>
        </div>

        <div className="cart-content">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <h3>Your cart is empty.</h3>
              <p>Add products from the Simba catalogue to start a Kigali delivery basket.</p>
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
                <span>Subtotal</span>
                <strong>{subtotal.toLocaleString()} RWF</strong>
              </div>
              {activeDiscount > 0 && (
                <div className="summary-row discount">
                  <span>Loyalty discount ({activeDiscount}%)</span>
                  <strong>-{discount.toLocaleString()} RWF</strong>
                </div>
              )}
              <div className="summary-row total">
                <span>Total</span>
                <strong>{totalPrice.toLocaleString()} RWF</strong>
              </div>
            </div>

            <button
              className="checkout-btn"
              onClick={() => {
                onCheckout();
                clearCart();
              }}
            >
              Confirm checkout
            </button>
            <button className="clear-btn" onClick={clearCart}>
              Clear basket
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};

export default CartDrawer;
