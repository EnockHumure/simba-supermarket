import React from 'react';
import { useCart, type Product } from '../context/CartContext';
import './ProductModal.css';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();

  if (!product) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="product-modal-content" onClick={(event) => event.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          x
        </button>
        <div className="product-modal-body">
          <div className="product-modal-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-modal-info">
            <p className="category-tag">{product.category}</p>
            <h2>{product.name}</h2>
            <div className="product-meta">
              <p>
                <strong>Unit</strong>
                <span>{product.unit}</span>
              </p>
              <p>
                <strong>Status</strong>
                <span className={product.inStock ? 'in-stock' : 'out-of-stock'}>
                  {product.inStock ? 'Ready for delivery' : 'Temporarily unavailable'}
                </span>
              </p>
            </div>
            <div className="product-description">
              <p>
                This product is part of the Simba Rwanda catalogue and can be added directly to the active Kigali
                delivery basket.
              </p>
            </div>
            <div className="product-modal-footer">
              <span className="modal-price">{product.price.toLocaleString()} RWF</span>
              <button
                className="modal-add-btn"
                onClick={() => {
                  addToCart(product);
                  onClose();
                }}
                disabled={!product.inStock}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
