import React, { useState } from 'react';
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
    <section className="py-20 flex flex-col gap-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto px-4">
        <span className="bg-simba-primary/10 text-simba-primary text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">💬 Customer Stories</span>
        <h2 className="text-4xl font-black text-simba-ink leading-tight">What Our Customers Say</h2>
        <p className="text-sm text-simba-muted leading-relaxed">Real experiences from real people who love shopping at Simba Supermarket</p>
        <div className="flex justify-center gap-12 pt-4">
          <div className="flex flex-col">
            <strong className="text-2xl font-black text-simba-primary">1000+</strong>
            <span className="text-[10px] font-bold text-simba-muted uppercase tracking-wider">Happy Customers</span>
          </div>
          <div className="flex flex-col border-x border-simba-line px-12">
            <strong className="text-2xl font-black text-simba-primary">4.9/5</strong>
            <span className="text-[10px] font-bold text-simba-muted uppercase tracking-wider">Average Rating</span>
          </div>
          <div className="flex flex-col">
            <strong className="text-2xl font-black text-simba-primary">500+</strong>
            <span className="text-[10px] font-bold text-simba-muted uppercase tracking-wider">Reviews</span>
          </div>
        </div>
      </div>
      
      {/* Featured Testimonial Carousel */}
      <div className="relative max-w-5xl mx-auto w-full px-4">
        <button className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border border-simba-line shadow-lg flex items-center justify-center text-2xl font-bold text-simba-muted hover:text-simba-primary transition-all z-10 hidden md:flex" onClick={prevTestimonial}>
          ‹
        </button>
        
        <div className="bg-white rounded-[40px] p-8 md:p-16 border border-simba-line shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-simba-primary/5 rounded-full -mr-32 -mt-32 blur-3xl transition-all duration-700 group-hover:bg-simba-primary/10" />
          <div className="absolute -top-10 left-10 text-[200px] font-serif text-simba-primary/10 leading-none select-none">"</div>
          
          <div className="relative flex flex-col md:flex-row items-center gap-12">
            <div className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0 group">
              <div className="absolute inset-0 bg-gradient-to-br from-simba-primary to-simba-orange rounded-[40px] rotate-6 group-hover:rotate-12 transition-transform duration-500 shadow-xl" />
              <img src={testimonials[activeIndex].image} alt={testimonials[activeIndex].name} className="relative w-full h-full object-cover rounded-[40px] shadow-2xl border-2 border-white" />
              {testimonials[activeIndex].verified && (
                <span className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center text-xl shadow-xl border-4 border-white">✓</span>
              )}
            </div>
            <div className="flex-1 space-y-8 text-center md:text-left">
              <div className="flex justify-center md:justify-start gap-1">
                {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                  <span key={i} className="text-xl">⭐</span>
                ))}
              </div>
              <p className="text-xl md:text-2xl font-bold text-simba-ink leading-relaxed italic">
                "{testimonials[activeIndex].quote}"
              </p>
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-simba-line/50">
                <div className="flex flex-col">
                  <strong className="text-lg font-black text-simba-ink">{testimonials[activeIndex].name}</strong>
                  <span className="text-xs font-bold text-simba-muted uppercase tracking-widest">{testimonials[activeIndex].role}</span>
                </div>
                <span className="text-[10px] font-black text-simba-muted uppercase bg-simba-bg px-3 py-1 rounded-full">{testimonials[activeIndex].date}</span>
              </div>
            </div>
          </div>
        </div>
        
        <button className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border border-simba-line shadow-lg flex items-center justify-center text-2xl font-bold text-simba-muted hover:text-simba-primary transition-all z-10 hidden md:flex" onClick={nextTestimonial}>
          ›
        </button>
        
        <div className="flex justify-center gap-2 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === index ? 'w-12 bg-simba-primary' : 'w-3 bg-simba-line hover:bg-simba-muted'}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* All Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-[1200px] mx-auto w-full">
        {testimonials.map((testimonial, index) => (
          <div 
            key={index} 
            className={`p-6 rounded-3xl border transition-all cursor-pointer group ${activeIndex === index ? 'bg-simba-primary/5 border-simba-primary shadow-xl' : 'bg-white border-simba-line hover:border-simba-primary/50 hover:shadow-lg'}`}
            onClick={() => setActiveIndex(index)}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-12 h-12 flex-shrink-0">
                <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover rounded-xl" />
                {testimonial.verified && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px] shadow-md border-2 border-white">✓</span>
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <strong className="text-sm font-black text-simba-ink truncate">{testimonial.name}</strong>
                <span className="text-[10px] font-bold text-simba-muted uppercase tracking-wider">{testimonial.role}</span>
              </div>
            </div>
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <span key={i} className="text-xs">⭐</span>
              ))}
            </div>
            <p className="text-sm font-medium text-simba-ink leading-relaxed line-clamp-3 italic mb-4">"{testimonial.quote}"</p>
            <span className="text-[10px] font-bold text-simba-muted uppercase tracking-widest block pt-4 border-t border-simba-line/50">{testimonial.date}</span>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="bg-simba-ink text-white rounded-[40px] p-12 md:p-16 text-center space-y-6 max-w-[1200px] mx-auto w-full px-4 relative overflow-hidden mx-4">
        <div className="absolute inset-0 bg-gradient-to-r from-simba-primary/20 to-transparent" />
        <div className="relative space-y-6">
          <h3 className="text-3xl font-black leading-tight">Share Your Experience</h3>
          <p className="text-white/70 text-sm max-w-xl mx-auto leading-relaxed">Have you shopped at Simba? We'd love to hear from you! Your feedback helps us serve Kigali better every day.</p>
          <button className="px-10 py-4 bg-simba-secondary text-simba-ink rounded-2xl font-black text-sm shadow-xl hover:scale-105 transition-all active:scale-95">Write a Review</button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
