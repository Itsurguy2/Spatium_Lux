import React from 'react';
import { getLocationTheme, getStyleAccent } from '../utils/themes';
import './ThemedPageWrapper.css';

function ThemedPageWrapper({ location, style, children }) {
  const theme = getLocationTheme(location);
  const styleInfo = getStyleAccent(style);

  return (
    <div 
      className="themed-page-wrapper"
      style={{
        background: theme.background,
        '--primary-color': theme.primaryColor,
        '--secondary-color': theme.secondaryColor,
        '--text-color': theme.textColor,
        '--card-background': theme.cardBackground,
        '--border-color': theme.borderColor
      }}
    >
      {location && (
        <div className="location-banner">
          <span className="location-emoji">{theme.emoji}</span>
          <div className="location-info">
            <h2>{location}</h2>
            <p>{theme.atmosphere}</p>
          </div>
        </div>
      )}

      {style && (
        <div className="style-indicator">
          <span className="style-icon">{styleInfo.icon}</span>
          <span className="style-tagline">{styleInfo.tagline}</span>
        </div>
      )}

      <div className="themed-content">
        {children}
      </div>

      {/* Animated background elements */}
      {location === 'Oceanfront' && (
        <div className="ocean-waves">
          <div className="wave wave1"></div>
          <div className="wave wave2"></div>
          <div className="wave wave3"></div>
        </div>
      )}

      {location === 'Mountains' && (
        <div className="snow-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="snowflake" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}>❄️</div>
          ))}
        </div>
      )}

      {location === 'Desert' && (
        <div className="heat-shimmer"></div>
      )}
    </div>
  );
}

export default ThemedPageWrapper;