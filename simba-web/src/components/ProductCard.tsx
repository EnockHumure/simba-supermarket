import React, { useState } from 'react';
import { useCart, type Product } from '../context/CartContext';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="product-card" onClick={() => onClick(product)}>
      <div className="product-image">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="product-info">
        <h4 className="product-name">{product.name}</h4>
        <p className="product-category">{product.category}</p>
        <div className="product-footer">
          <span className="product-price">{product.price.toLocaleString()} RWF</span>
          <button
            className={`add-to-cart-btn ${isAdded ? 'success' : ''}`}
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            {isAdded ? 'Added! ✓' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
