import React from 'react';
import { useCart, type Product } from '../context/CartContext';
import './ProductModal.css';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();

  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="product-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        <div className="product-modal-body">
          <div className="product-modal-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-modal-info">
            <h2>{product.name}</h2>
            <p className="category-tag">{product.category}</p>
            <div className="product-meta">
              <p><strong>Unit:</strong> {product.unit}</p>
              <p><strong>Status:</strong> {product.inStock ? <span className="in-stock">In Stock</span> : <span className="out-of-stock">Out of Stock</span>}</p>
            </div>
            <div className="product-description">
              <p>Experience the quality and freshness of Simba Supermarket products. This {product.name} is carefully selected for our valued customers.</p>
            </div>
            <div className="product-modal-footer">
              <span className="modal-price">{product.price.toLocaleString()} RWF</span>
              <button 
                className="modal-add-btn" 
                onClick={() => { addToCart(product); onClose(); }}
                disabled={!product.inStock}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
