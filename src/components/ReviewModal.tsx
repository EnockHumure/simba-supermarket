import React, { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { translations } from '../i18n';
import type { Order } from '../context/CartContext';
import './ReviewModal.css';

interface ReviewModalProps {
  order: Order;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ order, onClose, onSubmit }) => {
  const { language } = useSettings();
  const t = translations[language];
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0) {
      onSubmit(rating, comment);
      onClose();
    }
  };

  return (
    <div className="review-modal-overlay" onClick={onClose}>
      <div className="review-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="review-modal-close" onClick={onClose}>×</button>
        
        <h2>{t.reviewOrder}</h2>
        <p className="review-branch-name">{order.branchName}</p>
        
        <form onSubmit={handleSubmit}>
          <div className="review-rating-section">
            <label>{t.rateExperience}</label>
            <div className="review-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`review-star ${star <= (hoveredRating || rating) ? 'active' : ''}`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="review-comment-section">
            <label>{t.writeReview}</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={t.reviewPlaceholder}
              rows={4}
            />
          </div>

          <button 
            type="submit" 
            className="review-submit-btn"
            disabled={rating === 0}
          >
            {t.submitReview}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
