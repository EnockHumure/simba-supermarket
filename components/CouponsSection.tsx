import React from 'react';
import CouponCard, { type Coupon } from './CouponCard';
import couponsData from '../coupons.json';

const CouponsSection: React.FC = () => {
  const coupons = couponsData as Coupon[];

  return (
    <section className="mt-12 mb-16 px-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-simba-primary">Simba Rewards</span>
            <h2 className="text-3xl font-black text-simba-ink mt-1">Digital Coupons</h2>
            <p className="text-sm text-simba-muted">Clip coupons to your account and save automatically at checkout.</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-simba-line rounded-lg text-xs font-bold hover:border-simba-primary transition-colors">
              Available
            </button>
            <button className="px-4 py-2 bg-white border border-simba-line rounded-lg text-xs font-bold hover:border-simba-primary transition-colors">
              My Clipped
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coupons.map(coupon => (
            <CouponCard key={coupon.id} coupon={coupon} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CouponsSection;
