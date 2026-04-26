import React from 'react';
import './CTABanner.css';

interface CTABannerProps {
  title: string;
  subtitle: string;
  buttonText: string;
  onAction: () => void;
  variant?: 'primary' | 'secondary' | 'success';
  badge?: string;
}

const CTABanner: React.FC<CTABannerProps> = ({
  title,
  subtitle,
  buttonText,
  onAction,
  variant = 'primary',
  badge,
}) => {
  return (
    <div className={`cta-banner cta-banner-${variant}`}>
      <div className="cta-content">
        {badge && <span className="cta-badge">{badge}</span>}
        <h2 className="cta-title">{title}</h2>
        <p className="cta-subtitle">{subtitle}</p>
        <button className="cta-button" onClick={onAction}>
          {buttonText} →
        </button>
      </div>
      <div className="cta-decoration">
        <div className="cta-circle cta-circle-1"></div>
        <div className="cta-circle cta-circle-2"></div>
        <div className="cta-circle cta-circle-3"></div>
      </div>
    </div>
  );
};

export default CTABanner;
