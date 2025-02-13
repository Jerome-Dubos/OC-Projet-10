import React, { useState, useEffect } from 'react';
import iconChat from '../../img/icon-chat.webp';
import iconMoney from '../../img/icon-money.webp';
import iconSecurity from '../../img/icon-security.webp';
import './Features.css';

const iconMap = {
  'icon-chat.webp': iconChat,
  'icon-money.webp': iconMoney,
  'icon-security.webp': iconSecurity
};

const Features = () => {
  const [features, setFeatures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await fetch('/data/Features.json');
        if (!response.ok) {
          throw new Error('Failed to fetch features data');
        }
        const data = await response.json();
        setFeatures(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeatures();
  }, []);

  if (isLoading) {
    return <div>Loading features...</div>;
  }

  if (error) {
    return <div>Error loading features: {error}</div>;
  }

  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      {features.map((feature) => (
        <div key={feature.id} className="feature-item">
          <img 
            src={iconMap[feature.icon]} 
            alt="Feature Icon" 
            className="feature-icon" 
          />
          <h3 className="feature-item-title">{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </section>
  );
};

export default Features;