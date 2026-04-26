import React, { useState, useEffect, useRef } from 'react';
import './CountingStats.css';

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
    <div className="counting-stats" ref={ref}>
      {stats.map((stat, index) => (
        <div key={index} className="stat-item">
          <div className="stat-value">
            {stat.prefix}
            {counts[index].toLocaleString()}
            {stat.suffix}
          </div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default CountingStats;
