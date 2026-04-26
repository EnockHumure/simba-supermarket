import React from 'react';
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
}

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      name: 'Erick',
      role: 'Regular Customer',
      image: clientErick,
      quote: 'Simba Supermarket has the best quality products in Kigali. Fast delivery and excellent service!',
      rating: 5,
    },
    {
      name: 'Joshua',
      role: 'Loyal Customer',
      image: clientJoshua,
      quote: 'I love shopping at Simba! The prices are great and the staff is always friendly and helpful.',
      rating: 5,
    },
    {
      name: 'Judith',
      role: 'Happy Shopper',
      image: clientJudith,
      quote: 'Fresh groceries delivered to my door in minutes. Simba makes my life so much easier!',
      rating: 5,
    },
    {
      name: 'Jeanette',
      role: 'Simba Team Member',
      image: employeeJeanette,
      quote: 'Proud to work at Simba where we serve our community with quality products every day.',
      rating: 5,
    },
    {
      name: 'Elizabeth & Family',
      role: 'Family Customer',
      image: familyElizabeth,
      quote: 'Simba is our go-to supermarket for all family needs. Great variety and always fresh!',
      rating: 5,
    },
  ];

  return (
    <section className="testimonials-section">
      <div className="testimonials-header">
        <p className="section-kicker">Customer Stories</p>
        <h2>What Our Customers Say</h2>
        <p>Real experiences from real people who love shopping at Simba</p>
      </div>
      
      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <div className="testimonial-image">
              <img src={testimonial.image} alt={testimonial.name} />
            </div>
            <div className="testimonial-content">
              <div className="testimonial-rating">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i} className="star">⭐</span>
                ))}
              </div>
              <p className="testimonial-quote">"{testimonial.quote}"</p>
              <div className="testimonial-author">
                <strong>{testimonial.name}</strong>
                <span>{testimonial.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
