import React from 'react';
import { useCart, type Product } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';
import { translateCategoryLabel, translateProductLabel } from '../i18n';
import simbaLogo from '../simba-logo.png';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  viewMode?: 'grid' | 'list';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, viewMode = 'grid' }) => {
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
      className={`product-card ${viewMode}`} 
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
      <div className="product-image">
        <img 
          src={product.image} 
          alt={translateProductLabel(product.name, language)} 
          loading="lazy" 
          onError={(e) => (e.currentTarget.src = simbaLogo)}
        />
      </div>

      <div className="product-info">
        {viewMode === 'list' && <span className="col-label">Product Name</span>}
        <h4 className="product-name">{translateProductLabel(product.name, language)}</h4>
        
        {viewMode === 'list' && (
          <div className="list-details">
            <div className="list-col">
              <span className="col-label">Category</span>
              <p className="product-category">{translateCategoryLabel(product.category, language)}</p>
            </div>
            <div className="list-col">
              <span className="col-label">Unit</span>
              <p className="unit-pill-text">{product.unit}</p>
            </div>
          </div>
        )}
        
        {viewMode === 'grid' && <p className="product-category">{translateCategoryLabel(product.category, language)}</p>}

        <div className="product-footer">
          <div className="price-col">
            {viewMode === 'list' && <span className="col-label">Price</span>}
            <strong className="product-price">{product.price.toLocaleString()} RWF</strong>
            <span className="product-subcopy">Tap for details</span>
          </div>

          <div className="stepper-container" onClick={e => e.stopPropagation()}>
            {viewMode === 'list' && <span className="col-label" style={{ textAlign: 'right', display: 'block' }}>Add to Cart</span>}
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
