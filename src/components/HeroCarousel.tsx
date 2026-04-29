import React, { useState, useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';

interface Slide {
  title: string;
  subtitle: string;
  cta: string;
  background: string;
  badge?: string;
}

const HeroCarousel: React.FC<{ onExplore: () => void }> = ({ onExplore }) => {
  const { t } = useSettings();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      title: '50% OFF',
      subtitle: 'Fresh Groceries Delivered in 15-35 Minutes',
      cta: 'Shop Now',
      background: 'from-[#e31b23] to-[#f28c28]',
      badge: 'Limited Offer',
    },
    {
      title: '1000+ Products',
      subtitle: 'Everything You Need from Simba Supermarket',
      cta: 'Browse Catalogue',
      background: 'from-[#4caf50] to-[#2e7d32]',
    },
    {
      title: 'Free Delivery',
      subtitle: 'On Orders Above 20,000 RWF in Kigali',
      cta: 'Start Shopping',
      background: 'from-[#2196f3] to-[#1565c0]',
      badge: 'New',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative h-[300px] md:h-[400px] rounded-[40px] overflow-hidden group shadow-2xl">
      <div 
        className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]" 
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`min-w-full h-full bg-gradient-to-br ${slide.background} relative flex items-center px-8 md:px-16 overflow-hidden`}
          >
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl animate-pulse" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-16 -mb-16 blur-2xl" />

            <div className="relative z-10 flex flex-col items-start gap-3 md:gap-5 max-w-2xl">
              {slide.badge && (
                <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] border border-white/30">
                  {slide.badge}
                </span>
              )}
              <h1 className="text-4xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter animate-in fade-in slide-in-from-left duration-700">
                {slide.title}
              </h1>
              <p className="text-sm md:text-xl font-medium text-white/90 max-w-md animate-in fade-in slide-in-from-left delay-100 duration-700">
                {slide.subtitle}
              </p>
              <button 
                className="mt-4 px-8 py-3.5 bg-white text-simba-ink rounded-2xl font-black text-sm md:text-base hover:scale-105 active:scale-95 transition-all shadow-xl hover:shadow-white/20 animate-in fade-in slide-in-from-bottom delay-200 duration-700" 
                onClick={onExplore}
              >
                {slide.cta} &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button 
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 hidden md:flex" 
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
      >
        ‹
      </button>
      <button 
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 hidden md:flex" 
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
      >
        ›
      </button>

      {/* Progress dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-1.5 rounded-full transition-all duration-500 ${currentSlide === index ? 'w-10 bg-white' : 'w-2.5 bg-white/30 hover:bg-white/50'}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
