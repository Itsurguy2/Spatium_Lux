import React from 'react';
import './HousePreview.css';

function HousePreview({ formData }) {
  const {
    location,
    style,
    exterior_color,
    roof_type,
    has_pool,
    has_garage,
    has_deck,
    landscape_type
  } = formData;

  // Get background based on location
  const getLocationBackground = () => {
    const backgrounds = {
      'Mountains': 'linear-gradient(135deg, #2e3192 0%, #1bffff 100%)',
      'NYC': 'linear-gradient(135deg, #434343 0%, #000000 100%)',
      'Oceanfront': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'Desert': 'linear-gradient(135deg, #f46b45 0%, #eea849 100%)',
      'Forest': 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
      'Countryside': 'linear-gradient(135deg, #7fcdcd 0%, #abdd75 100%)',
      'Lakeside': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'Suburban': 'linear-gradient(135deg, #a8c0ff 0%, #3f2b96 100%)'
    };
    return backgrounds[location] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  };

  // Get exterior color
  const getExteriorColor = () => {
    const colors = {
      'White': '#FFFFFF',
      'Beige': '#F5F5DC',
      'Gray': '#808080',
      'Blue': '#4A90E2',
      'Green': '#5CB85C',
      'Brown': '#8B4513',
      'Red': '#D9534F',
      'Yellow': '#F0E68C'
    };
    return colors[exterior_color] || '#FFFFFF';
  };

  // Get roof color based on type
  const getRoofColor = () => {
    const roofColors = {
      'Gable': '#8B4513',
      'Hip': '#654321',
      'Flat': '#696969',
      'Mansard': '#4A4A4A',
      'Gambrel': '#8B7355',
      'Shed': '#A0522D'
    };
    return roofColors[roof_type] || '#8B4513';
  };

  return (
    <div className="house-preview" style={{ background: getLocationBackground() }}>
      <div className="preview-header">
        <h3>🏠 Preview</h3>
        <p className="location-badge">{location || 'Select Location'}</p>
      </div>
      
      <div className="house-container">
        {/* Landscape */}
        {landscape_type && (
          <div className="landscape">
            {landscape_type === 'Lush Garden' && '🌳🌺🌳'}
            {landscape_type === 'Desert' && '🌵🏜️🌵'}
            {landscape_type === 'Tropical' && '🌴🌺🌴'}
            {landscape_type === 'Zen' && '🪨🎋🪨'}
            {landscape_type === 'English Garden' && '🌹🌷🌹'}
            {landscape_type === 'Minimal' && '🌿'}
          </div>
        )}

        {/* House Structure */}
        <div className="house-structure">
          {/* Roof */}
          <div 
            className={`roof roof-${roof_type?.toLowerCase()?.replace(' ', '-') || 'gable'}`}
            style={{ backgroundColor: getRoofColor() }}
          />
          
          {/* Main House Body */}
          <div 
            className="house-body"
            style={{ backgroundColor: getExteriorColor() }}
          >
            {/* Windows */}
            <div className="windows">
              <div className="window"></div>
              <div className="window"></div>
            </div>
            
            {/* Door */}
            <div className="door"></div>
          </div>
          
          {/* Garage */}
          {has_garage && (
            <div className="garage" style={{ backgroundColor: getExteriorColor() }}>
              <div className="garage-door"></div>
            </div>
          )}
        </div>

        {/* Amenities */}
        <div className="amenities">
          {has_pool && <div className="pool">🏊 Pool</div>}
          {has_deck && <div className="deck">🪵 Deck</div>}
        </div>
      </div>

      {/* Style Badge */}
      {style && (
        <div className="style-badge">
          Style: {style}
        </div>
      )}
    </div>
  );
}

export default HousePreview;