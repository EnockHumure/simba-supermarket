import React from 'react';
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
      tag: "Community",
      className: "md:col-span-2 md:row-span-2"
    },
    {
      image: employeeJeanette,
      title: "Service with a Smile",
      description: "Jeanette and our team are dedicated to helping you find exactly what you need.",
      tag: "Our Team",
      className: "md:col-span-1 md:row-span-1"
    },
    {
      image: clientErick,
      title: "Kigali's Top Choice",
      description: "Erick depends on Simba for high-quality groceries and fast delivery.",
      tag: "Loyal Customer",
      className: "md:col-span-1 md:row-span-1"
    },
    {
      image: clientJoshua,
      title: "Quality You Can Trust",
      description: "Joshua finds the best international brands and local fresh produce here.",
      tag: "Verified Buyer",
      className: "md:col-span-2 md:row-span-1"
    },
    {
      image: clientJudith,
      title: "Daily Freshness",
      description: "Judith loves the variety of organic vegetables and fruits.",
      tag: "Fresh Food",
      className: "md:col-span-1 md:row-span-1"
    }
  ];

  return (
    <section className="py-20 flex flex-col gap-12">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-simba-orange">The Simba Lifestyle</p>
        <h2 className="text-4xl font-black text-simba-ink">Real People, Real Quality</h2>
        <p className="text-sm text-simba-muted leading-relaxed">See why thousands of Rwandans choose Simba Supermarket every single day.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[280px] gap-5">
        {moments.map((moment, idx) => (
          <div key={idx} className={`relative group rounded-3xl overflow-hidden bg-white border border-simba-line flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${moment.className || ''}`}>
            <div className="relative flex-1 overflow-hidden">
              <img src={moment.image} alt={moment.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
              <span className="absolute top-4 left-4 bg-simba-primary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider z-10 shadow-lg">
                {moment.tag}
              </span>
            </div>
            <div className="p-6 bg-white border-t border-simba-line">
              <h3 className="text-lg font-black text-simba-ink mb-1">{moment.title}</h3>
              <p className="text-xs text-simba-muted leading-relaxed line-clamp-2">{moment.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SimbaExperience;
