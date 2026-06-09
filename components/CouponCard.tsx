import React from 'react';
import { useUser } from '../context/UserContext';
import './CouponCard.css';

export interface Coupon {
  id: string;
  title: string;
  description: string;
  productId?: number;
  departmentId?: string;
  discountValue: number;
  discountType: 'flat' | 'percent';
  expiryDate: string;
  image: string;
}

interface CouponCardProps {
  coupon: Coupon;
}

const CouponCard: React.FC<CouponCardProps> = ({ coupon }) => {
  const { user, toggleCoupon } = useUser();
  const isClipped = user?.clippedCouponIds?.includes(coupon.id);

  const handleClip = () => {
    if (!user) {
      alert("Please login to clip coupons!");
      return;
    }
    toggleCoupon(coupon.id);
  };

  return (
    <div className={`coupon-card ${isClipped ? 'clipped' : ''}`}>
      <div className="coupon-visual">
        <img src={coupon.image} alt={coupon.title} className="coupon-image" />
        <div className="coupon-badge">
          {coupon.discountType === 'flat' ? `${coupon.discountValue} RWF` : `${coupon.discountValue}%`} OFF
        </div>
      </div>
      <div className="coupon-details">
        <h3 className="coupon-title">{coupon.title}</h3>
        <p className="coupon-desc">{coupon.description}</p>
        <p className="coupon-expiry">Expires: {new Date(coupon.expiryDate).toLocaleDateString()}</p>
        <button 
          className={`clip-btn ${isClipped ? 'is-clipped' : ''}`}
          onClick={handleClip}
        >
          {isClipped ? '✓ CLIPPED' : 'CLIP COUPON'}
        </button>
      </div>
      <div className="coupon-cut-line"></div>
    </div>
  );
};

export default CouponCard;
