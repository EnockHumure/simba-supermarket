import React, { useState } from 'react';
import { useFulfillment, type FulfillmentMode } from '../context/FulfillmentContext';
import { simbaLocations } from '../locations';
import './FulfillmentModal.css';

const KIGALI_NEIGHBORHOODS = [
  'Kigali CBD', 'Kimironko', 'Kacyiru', 'Remera', 'Nyamirambo', 
  'Kicukiro', 'Nyarutarama', 'Kanombe', 'Gikondo', 'Kibagabaga'
];

const FulfillmentModal: React.FC = () => {
  const { isFulfillmentSet, setFulfillment } = useFulfillment();
  const [step, setStep] = useState<'mode' | 'location'>('mode');
  const [selectedMode, setSelectedMode] = useState<FulfillmentMode | null>(null);

  if (isFulfillmentSet) return null;

  const handleModeSelect = (mode: FulfillmentMode) => {
    setSelectedMode(mode);
    setStep('location');
  };

  const handleLocationSelect = (location: string) => {
    if (selectedMode) {
      setFulfillment(selectedMode, location);
    }
  };

  return (
    <div className="fulfillment-overlay">
      <div className="fulfillment-card animate-in fade-in zoom-in duration-300">
        <div className="fulfillment-header">
          <h2 className="text-2xl font-black text-simba-ink">How would you like to shop?</h2>
          <p className="text-sm text-simba-muted mt-1">Select your fulfillment method to see accurate pricing and availability for your area.</p>
        </div>

        {step === 'mode' ? (
          <div className="fulfillment-modes mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <button 
              className="mode-option group"
              onClick={() => handleModeSelect('delivery')}
            >
              <div className="icon-circle bg-simba-primary/10 group-hover:bg-simba-primary transition-colors">
                <span className="text-3xl group-hover:scale-110 transition-transform">🚚</span>
              </div>
              <div className="text-left">
                <h3 className="font-bold text-simba-ink">Delivery</h3>
                <p className="text-xs text-simba-muted">Fresh groceries delivered to your door in 30-60 mins.</p>
              </div>
            </button>

            <button 
              className="mode-option group"
              onClick={() => handleModeSelect('pickup')}
            >
              <div className="icon-circle bg-simba-secondary/10 group-hover:bg-simba-secondary transition-colors">
                <span className="text-3xl group-hover:scale-110 transition-transform">🏪</span>
              </div>
              <div className="text-left">
                <h3 className="font-bold text-simba-ink">Pickup</h3>
                <p className="text-xs text-simba-muted">Order online and collect from your nearest Simba branch.</p>
              </div>
            </button>
          </div>
        ) : (
          <div className="fulfillment-location mt-8 animate-in slide-in-from-right-4 duration-300">
            <button className="text-xs font-bold text-simba-primary mb-4 flex items-center gap-1 hover:underline" onClick={() => setStep('mode')}>
              ← Back to modes
            </button>
            <h3 className="font-bold text-simba-ink mb-3">
              {selectedMode === 'delivery' ? 'Where are we delivering to?' : 'Select your pickup branch'}
            </h3>
            
            <div className="location-list max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {selectedMode === 'delivery' ? (
                KIGALI_NEIGHBORHOODS.map(area => (
                  <button 
                    key={area} 
                    className="location-item"
                    onClick={() => handleLocationSelect(area)}
                  >
                    <span className="text-sm font-medium">{area}</span>
                    <span className="text-[10px] text-simba-primary font-black">SELECT</span>
                  </button>
                ))
              ) : (
                simbaLocations.map(branch => (
                  <button 
                    key={branch.name} 
                    className="location-item"
                    onClick={() => handleLocationSelect(branch.name)}
                  >
                    <div className="text-left">
                      <span className="text-sm font-medium block">{branch.name}</span>
                      <span className="text-[10px] text-simba-muted">{branch.address}</span>
                    </div>
                    <span className="text-[10px] text-simba-primary font-black">CHOOSE</span>
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FulfillmentModal;
