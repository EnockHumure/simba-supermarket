import React, { useState, useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';
import './HeroCarousel.css';

interface Slide {
  title: string;
  subtitle: string;
  cta: string;
  background: string;
  badge?: string;
}

const HeroCarousel: React.FC<{ onAction: () => void }> = ({ onAction }) => {
  const { t } = useSettings();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      title: '50% OFF',
      subtitle: 'Fresh Groceries Delivered in 15-35 Minutes',
      cta: 'Shop Now',
      background: 'linear-gradient(135deg, #e31b23, #f28c28)',
      badge: 'Limited Offer',
    },
    {
      title: '1000+ Products',
      subtitle: 'Everything You Need from Simba Supermarket',
      cta: 'Browse Catalogue',
      background: 'linear-gradient(135deg, #4caf50, #2e7d32)',
    },
    {
      title: 'Free Delivery',
      subtitle: 'On Orders Above 20,000 RWF in Kigali',
      cta: 'Start Shopping',
      background: 'linear-gradient(135deg, #2196f3, #1565c0)',
      badge: 'New',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="hero-carousel">
      <div className="carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className="carousel-slide"
            style={{ background: slide.background }}
          >
            <div className="carousel-content">
              {slide.badge && <span className="carousel-badge">{slide.badge}</span>}
              <h1 className="carousel-title">{slide.title}</h1>
              <p className="carousel-subtitle">{slide.subtitle}</p>
              <button className="carousel-cta" onClick={onAction}>
                {slide.cta} →
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-arrow carousel-arrow-left" onClick={prevSlide} aria-label="Previous slide">
        ‹
      </button>
      <button className="carousel-arrow carousel-arrow-right" onClick={nextSlide} aria-label="Next slide">
        ›
      </button>

      <div className="carousel-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${currentSlide === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
