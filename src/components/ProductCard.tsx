import React, { useState } from 'react';
import { useCart, type Product } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';
import { translateCategoryLabel, translateProductLabel } from '../i18n';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { addToCart } = useCart();
  const { language } = useSettings();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (event: React.MouseEvent) => {
    event.stopPropagation();
    addToCart(product);
    setIsAdded(true);
    window.setTimeout(() => setIsAdded(false), 1400);
  };

  return (
    <article className="product-card" onClick={() => onClick(product)}>
      <div className="product-card-top">
        <span className={`stock-pill ${product.inStock ? 'in-stock' : 'out-stock'}`}>
          {product.inStock ? 'In stock' : 'Unavailable'}
        </span>
        <span className="unit-pill">{product.unit}</span>
      </div>

      <div className="product-image">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>

      <div className="product-info">
        <p className="product-category">{translateCategoryLabel(product.category, language)}</p>
        <h4 className="product-name">{translateProductLabel(product.name, language)}</h4>

        <div className="product-footer">
          <div>
            <strong className="product-price">{product.price.toLocaleString()} RWF</strong>
            <span className="product-subcopy">Tap for details</span>
          </div>

          <button
            className={`add-to-cart-btn ${isAdded ? 'success' : ''}`}
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            {isAdded ? 'Added' : '+'}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
