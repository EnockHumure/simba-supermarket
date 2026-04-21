import React from 'react';
import { useCart, type Product } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';
import { translateCategoryLabel, translateProductLabel } from '../i18n';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { cart, addToCart, removeFromCart } = useCart();
  const { language } = useSettings();
  
  const cartItem = cart.find(item => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAdd = (event: React.MouseEvent) => {
    event.stopPropagation();
    addToCart(product);
  };

  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    removeFromCart(product.id);
  };

  return (
    <article 
      className="product-card" 
      onClick={() => onClick(product)}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${translateProductLabel(product.name, language)}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(product);
        }
      }}
    >
      <div className="product-card-top">
        <span className={`stock-pill ${product.inStock ? 'in-stock' : 'out-stock'}`} aria-label={product.inStock ? 'Item is in stock' : 'Item is unavailable'}>
          {product.inStock ? 'In stock' : 'Unavailable'}
        </span>
        <span className="unit-pill">{product.unit}</span>
      </div>

      <div className="product-image">
        <img src={product.image} alt={translateProductLabel(product.name, language)} loading="lazy" />
      </div>

      <div className="product-info">
        <p className="product-category">{translateCategoryLabel(product.category, language)}</p>
        <h4 className="product-name">{translateProductLabel(product.name, language)}</h4>

        <div className="product-footer">
          <div>
            <strong className="product-price">{product.price.toLocaleString()} RWF</strong>
            <span className="product-subcopy">Tap for details</span>
          </div>

          <div className="stepper-container" onClick={e => e.stopPropagation()}>
            {quantity > 0 ? (
              <div className="stepper active">
                <button 
                  className="stepper-btn" 
                  onClick={handleRemove}
                  aria-label="Remove one"
                >
                  -
                </button>
                <span className="stepper-qty">{quantity}</span>
                <button 
                  className="stepper-btn" 
                  onClick={handleAdd}
                  aria-label="Add one more"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                className="add-to-cart-btn"
                onClick={handleAdd}
                disabled={!product.inStock}
                aria-label={`Add ${translateProductLabel(product.name, language)} to cart`}
              >
                +
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
