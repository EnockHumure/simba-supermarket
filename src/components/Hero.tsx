import React from 'react';
import { useSettings } from '../context/SettingsContext';
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
  const { t } = useSettings();

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
          </button>
        ))}
      </div>

      <div className="hero-layout">
        <div className="hero-copy">
          <p className="hero-kicker">{t('heroKicker')}</p>
          <h1>{t('heroTitle')}</h1>
          <p className="hero-description">{t('heroDescription')}</p>
        </div>

        <div className="hero-order-card">
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
            {t('startBasket')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
