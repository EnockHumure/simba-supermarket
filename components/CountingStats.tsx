import React, { useState, useEffect, useRef } from 'react';

interface Stat {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

interface CountingStatsProps {
  stats: Stat[];
}

const CountingStats: React.FC<CountingStatsProps> = ({ stats }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    stats.forEach((stat, index) => {
      let currentStep = 0;
      const increment = stat.value / steps;

      const timer = setInterval(() => {
        currentStep++;
        setCounts((prev) => {
          const newCounts = [...prev];
          newCounts[index] = Math.min(Math.round(increment * currentStep), stat.value);
          return newCounts;
        });

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, interval);
    });
  }, [isVisible, stats]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8" ref={ref}>
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-8 rounded-[32px] border border-simba-line shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center gap-2 group">
          <div className="text-3xl md:text-4xl font-black text-simba-primary group-hover:scale-110 transition-transform">
            {stat.prefix}
            {counts[index].toLocaleString()}
            {stat.suffix}
          </div>
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-simba-muted">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default CountingStats;
