import React, { useState, useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';
import './DeliveryMap.css';

interface Location {
  name: string;
  lat: number;
  lng: number;
}

interface DeliveryMapProps {
  targetBranch: Location;
}

const DeliveryMap: React.FC<DeliveryMapProps> = ({ targetBranch }) => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const { t } = useSettings();

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const findMe = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          const d = calculateDistance(latitude, longitude, targetBranch.lat, targetBranch.lng);
          setDistance(d);
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location", error);
          alert("Could not get your location. Please ensure GPS is on.");
          setLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  };

  return (
    <div className="delivery-map-container">
      <div className="map-header">
        <h4>📍 {t('deliveryTracking')}</h4>
        <button className="find-me-btn" onClick={findMe} disabled={loading}>
          {loading ? '📡 ...' : '🎯 Find My Location'}
        </button>
      </div>

      <div className="map-visualization">
        <div className="map-track">
          <div className="location-point user">
            <span className="point-label">You</span>
            <div className="point-dot"></div>
          </div>
          <div className="track-line">
            {distance && <span className="distance-badge">{distance.toFixed(1)} km</span>}
          </div>
          <div className="location-point simba">
            <span className="point-label">Simba</span>
            <div className="point-dot"></div>
          </div>
        </div>
      </div>

      <div className="map-details">
        <p><strong>From:</strong> Your Current Location</p>
        <p><strong>To:</strong> {targetBranch.name}</p>
        {distance && (
          <div className="eta-box">
            <span>Estimated Delivery Time:</span>
            <strong>{Math.round(distance * 5 + 15)} - {Math.round(distance * 5 + 25)} mins</strong>
          </div>
        )}
      </div>

      {userLocation && (
        <a 
          href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${targetBranch.lat},${targetBranch.lng}&travelmode=driving`}
          target="_blank"
          rel="noopener noreferrer"
          className="google-directions-btn"
        >
          🚀 Open in Google Maps Directions
        </a>
      )}
    </div>
  );
};

export default DeliveryMap;
