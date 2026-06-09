import React from 'react';

interface CTABannerProps {
  title: string;
  subtitle: string;
  buttonText: string;
  onAction: () => void;
  variant?: 'primary' | 'secondary' | 'success';
}

const CTABanner: React.FC<CTABannerProps> = ({
  title,
  subtitle,
  buttonText,
  onAction,
  variant = 'primary',
}) => {
  const variants = {
    primary: 'from-simba-primary to-simba-orange shadow-simba-primary/20',
    secondary: 'from-simba-purple to-[#764ba2] shadow-simba-purple/20',
    success: 'from-[#4caf50] to-[#2e7d32] shadow-green-500/20',
  };

  return (
    <div className={`relative overflow-hidden rounded-[40px] bg-gradient-to-br ${variants[variant]} p-10 md:p-20 text-white shadow-2xl group`}>
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-16 -mb-16 blur-2xl" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="max-w-2xl text-center md:text-left space-y-6">
          <h2 className="text-4xl md:text-6xl font-black leading-[0.9] tracking-tighter">{title}</h2>
          <p className="text-lg md:text-xl font-medium text-white/90 leading-relaxed">{subtitle}</p>
        </div>
        <button 
          className="px-10 py-5 bg-white text-simba-ink rounded-2xl font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-xl hover:shadow-white/20"
          onClick={onAction}
        >
          {buttonText} &rarr;
        </button>
      </div>
    </div>
  );
};

export default CTABanner;
