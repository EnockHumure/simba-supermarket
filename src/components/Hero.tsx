import React from 'react';
import './Hero.css';

interface ServiceDefinition {
  title: string;
  subtitle: string;
  categories: string[];
  accent: string;
}

interface HeroProps {
  activeService: string;
  onServiceChange: (service: any) => void;
  selectedLocation: string;
  onLocationChange: (value: string) => void;
  onPrimaryAction: () => void;
  serviceDefinitions: Record<string, ServiceDefinition>;
  locationOptions: string[];
}

const Hero: React.FC<HeroProps> = ({
  activeService,
  onServiceChange,
  selectedLocation,
  onLocationChange,
  onPrimaryAction,
  serviceDefinitions,
  locationOptions,
}) => {
  const activeMeta = serviceDefinitions[activeService];

  return (
    <section className="hero">
      <div className="hero-service-strip">
        {Object.entries(serviceDefinitions).map(([key, service]) => (
          <button
            key={key}
            className={`hero-service-tab ${activeService === key ? 'active' : ''}`}
            onClick={() => onServiceChange(key)}
          >
            <strong>{service.title}</strong>
            <span>{service.accent}</span>
          </button>
        ))}
      </div>

      <div className="hero-layout">
        <div className="hero-copy">
          <p className="hero-kicker">Simba, rebuilt for Rwanda</p>
          <h1>Rapid grocery shopping for Kigali, with Simba products and loyalty built in.</h1>
          <p className="hero-description">
            This front-end takes the Getir-style landing page approach and applies it to Simba: strong service lanes,
            faster category discovery, neighborhood-aware messaging, and a homepage that pushes shoppers straight into
            ordering.
          </p>

          <div className="hero-badges">
            <span>Same Simba catalogue</span>
            <span>Rwandan phone login</span>
            <span>Cart and loyalty active</span>
          </div>
        </div>

        <div className="hero-order-card">
          <p className="hero-order-eyebrow">{activeMeta.accent}</p>
          <h2>{activeMeta.title}</h2>
          <p>{activeMeta.subtitle}</p>

          <label>
            <span>Choose drop zone</span>
            <select value={selectedLocation} onChange={(event) => onLocationChange(event.target.value)}>
              {locationOptions.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </label>

          <div className="hero-order-meta">
            <div>
              <strong>15-35 min</strong>
              <span>Estimated delivery</span>
            </div>
            <div>
              <strong>{selectedLocation}</strong>
              <span>Active Rwanda location</span>
            </div>
          </div>

          <button className="hero-primary" onClick={onPrimaryAction}>
            Start this basket
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
