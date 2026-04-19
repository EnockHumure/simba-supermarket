import React from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>Welcome to Simba Supermarket</h1>
        <p>Rwanda's favorite online grocery destination. Freshness delivered to your doorstep.</p>
        <button className="shop-now-btn">Shop Now</button>
      </div>
    </div>
  );
};

export default Hero;
