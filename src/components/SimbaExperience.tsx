import React from 'react';
import './SimbaExperience.css';
import clientErick from '../client ERICK.png.jpeg';
import clientJoshua from '../client joshua.jpeg';
import clientJudith from '../client Judith.jpeg';
import employeeJeanette from '../employee Jeanette.jpeg';
import familyElizabeth from '../family of elizabeth.jpeg';

const SimbaExperience: React.FC = () => {
  const moments = [
    {
      image: familyElizabeth,
      title: "Family First Shopping",
      description: "Elizabeth and her family love the fresh bakery section every morning.",
      tag: "Community"
    },
    {
      image: employeeJeanette,
      title: "Service with a Smile",
      description: "Jeanette and our team are dedicated to helping you find exactly what you need.",
      tag: "Our Team"
    },
    {
      image: clientErick,
      title: "Kigali's Top Choice",
      description: "Erick depends on Simba for high-quality groceries and fast delivery.",
      tag: "Loyal Customer"
    },
    {
      image: clientJoshua,
      title: "Quality You Can Trust",
      description: "Joshua finds the best international brands and local fresh produce here.",
      tag: "Verified Buyer"
    },
    {
      image: clientJudith,
      title: "Daily Freshness",
      description: "Judith loves the variety of organic vegetables and fruits.",
      tag: "Fresh Food"
    }
  ];

  return (
    <section className="simba-experience">
      <div className="section-header">
        <p className="section-kicker">The Simba Lifestyle</p>
        <h2>Real People, Real Quality</h2>
        <p>See why thousands of Rwandans choose Simba Supermarket every single day.</p>
      </div>

      <div className="experience-grid">
        {moments.map((moment, idx) => (
          <div key={idx} className={`experience-card card-${idx}`}>
            <div className="card-image-wrapper">
              <img src={moment.image} alt={moment.title} loading="lazy" />
              <span className="card-tag">{moment.tag}</span>
            </div>
            <div className="card-content">
              <h3>{moment.title}</h3>
              <p>{moment.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SimbaExperience;
