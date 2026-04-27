import React, { useState } from 'react';
import './Testimonials.css';
import clientErick from '../client ERICK.png.jpeg';
import clientJoshua from '../client joshua.jpeg';
import clientJudith from '../client Judith.jpeg';
import employeeJeanette from '../employee Jeanette.jpeg';
import familyElizabeth from '../family of elizabeth.jpeg';

interface Testimonial {
  name: string;
  role: string;
  image: string;
  quote: string;
  rating: number;
  date: string;
  verified: boolean;
}

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      name: 'Erick',
      role: 'Regular Customer',
      image: clientErick,
      quote: 'Simba Supermarket has the best quality products in Kigali. Fast delivery and excellent service! I order every week and never disappointed.',
      rating: 5,
      date: 'December 2024',
      verified: true,
    },
    {
      name: 'Joshua',
      role: 'Loyal Customer',
      image: clientJoshua,
      quote: 'I love shopping at Simba! The prices are great and the staff is always friendly and helpful. Best supermarket experience in Rwanda.',
      rating: 5,
      date: 'January 2025',
      verified: true,
    },
    {
      name: 'Judith',
      role: 'Happy Shopper',
      image: clientJudith,
      quote: 'Fresh groceries delivered to my door in minutes. Simba makes my life so much easier! The quality is always top-notch.',
      rating: 5,
      date: 'January 2025',
      verified: true,
    },
    {
      name: 'Jeanette',
      role: 'Simba Team Member',
      image: employeeJeanette,
      quote: 'Proud to work at Simba where we serve our community with quality products every day. Our customers are like family!',
      rating: 5,
      date: 'December 2024',
      verified: true,
    },
    {
      name: 'Elizabeth & Family',
      role: 'Family Customer',
      image: familyElizabeth,
      quote: 'Simba is our go-to supermarket for all family needs. Great variety and always fresh! My kids love the bakery section.',
      rating: 5,
      date: 'January 2025',
      verified: true,
    },
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-header">
        <span className="section-badge">💬 Customer Stories</span>
        <h2>What Our Customers Say</h2>
        <p>Real experiences from real people who love shopping at Simba Supermarket</p>
        <div className="testimonials-stats">
          <div className="stat">
            <strong>1000+</strong>
            <span>Happy Customers</span>
          </div>
          <div className="stat">
            <strong>4.9/5</strong>
            <span>Average Rating</span>
          </div>
          <div className="stat">
            <strong>500+</strong>
            <span>Reviews</span>
          </div>
        </div>
      </div>
      
      {/* Featured Testimonial Carousel */}
      <div className="featured-testimonial">
        <button className="carousel-nav prev" onClick={prevTestimonial} aria-label="Previous testimonial">
          ‹
        </button>
        
        <div className="featured-card">
          <div className="quote-icon">"</div>
          <div className="featured-content">
            <div className="featured-image">
              <img src={testimonials[activeIndex].image} alt={testimonials[activeIndex].name} />
              {testimonials[activeIndex].verified && (
                <span className="verified-badge" title="Verified Customer">✓</span>
              )}
            </div>
            <div className="featured-text">
              <div className="rating-stars">
                {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                  <span key={i} className="star filled">★</span>
                ))}
              </div>
              <p className="featured-quote">{testimonials[activeIndex].quote}</p>
              <div className="featured-author">
                <div>
                  <strong>{testimonials[activeIndex].name}</strong>
                  <span>{testimonials[activeIndex].role}</span>
                </div>
                <span className="date">{testimonials[activeIndex].date}</span>
              </div>
            </div>
          </div>
        </div>
        
        <button className="carousel-nav next" onClick={nextTestimonial} aria-label="Next testimonial">
          ›
        </button>
        
        <div className="carousel-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${activeIndex === index ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* All Testimonials Grid */}
      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <div 
            key={index} 
            className={`testimonial-card ${activeIndex === index ? 'highlighted' : ''}`}
            onClick={() => setActiveIndex(index)}
          >
            <div className="card-header">
              <div className="testimonial-image">
                <img src={testimonial.image} alt={testimonial.name} />
                {testimonial.verified && (
                  <span className="verified-badge-small" title="Verified">✓</span>
                )}
              </div>
              <div className="card-info">
                <strong>{testimonial.name}</strong>
                <span>{testimonial.role}</span>
              </div>
            </div>
            <div className="testimonial-rating">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <span key={i} className="star">⭐</span>
              ))}
            </div>
            <p className="testimonial-quote">"{testimonial.quote}"</p>
            <span className="testimonial-date">{testimonial.date}</span>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="testimonials-cta">
        <h3>Share Your Experience</h3>
        <p>Have you shopped at Simba? We'd love to hear from you!</p>
        <button className="cta-button">Write a Review</button>
      </div>
    </section>
  );
};

export default Testimonials;
