// Define incompatible combinations for house customization

const INCOMPATIBLE_RULES = {
  // Location-based restrictions
  location: {
    'Desert': {
      incompatibleWith: {
        landscape_type: ['Lush Garden', 'Tropical', 'English Garden'],
        reason: 'Desert locations cannot support water-intensive landscaping'
      },
      warnings: {
        has_pool: 'Pools in desert locations require expensive water management'
      }
    },
    'NYC': {
      incompatibleWith: {
        style: ['Ranch', 'Farmhouse'],
        reason: 'Ranch and Farmhouse styles are not suitable for NYC urban environment'
      },
      restrictions: {
        square_feet: { max: 3000, reason: 'NYC properties are typically smaller' }
      }
    },
    'Mountains': {
      incompatibleWith: {
        roof_type: ['Flat'],
        reason: 'Flat roofs are problematic in snowy mountain regions'
      }
    },
    'Oceanfront': {
      warnings: {
        exterior_color: ['Red', 'Brown'],
        reason: 'Dark colors fade quickly in coastal sun exposure'
      }
    }
  },

  // Style-based restrictions
  style: {
    'Modern': {
      incompatibleWith: {
        roof_type: ['Gambrel', 'Mansard'],
        kitchen_style: ['Rustic', 'Farmhouse'],
        reason: 'Traditional elements conflict with modern aesthetic'
      }
    },
    'Victorian': {
      incompatibleWith: {
        roof_type: ['Flat', 'Shed'],
        exterior_color: ['White'],
        reason: 'Victorian homes require ornate features and bold colors'
      }
    },
    'Ranch': {
      incompatibleWith: {
        location: ['NYC'],
        reason: 'Ranch style requires horizontal space not available in NYC'
      },
      restrictions: {
        bedrooms: { min: 2, max: 4, reason: 'Ranch homes typically have 2-4 bedrooms' }
      }
    }
  },

  // Amenity restrictions
  amenities: {
    pool: {
      restrictions: {
        location: {
          impossible: ['Mountains'],
          reason: 'Mountain climates make pools impractical and expensive'
        }
      }
    },
    garage: {
      restrictions: {
        location: {
          warning: ['NYC'],
          reason: 'Garage spaces are rare and very expensive in NYC'
        }
      }
    }
  }
};

// Validate house configuration
const validateHouseConfig = (houseData) => {
  const errors = [];
  const warnings = [];

  const { location, style, roof_type, landscape_type, has_pool, has_garage, 
          exterior_color, kitchen_style, bedrooms, square_feet } = houseData;

  // Check location-based rules
  if (location && INCOMPATIBLE_RULES.location[location]) {
    const locationRules = INCOMPATIBLE_RULES.location[location];
    
    // Check incompatibilities
    if (locationRules.incompatibleWith) {
      Object.keys(locationRules.incompatibleWith).forEach(field => {
        const incompatibleValues = locationRules.incompatibleWith[field];
        const currentValue = houseData[field];
        
        if (Array.isArray(incompatibleValues) && incompatibleValues.includes(currentValue)) {
          errors.push({
            field: field,
            message: `${currentValue} is incompatible with ${location} location. ${locationRules.reason}`
          });
        }
      });
    }

    // Check restrictions
    if (locationRules.restrictions) {
      Object.keys(locationRules.restrictions).forEach(field => {
        const restriction = locationRules.restrictions[field];
        const value = houseData[field];
        
        if (restriction.max && value > restriction.max) {
          errors.push({
            field: field,
            message: `${field} exceeds maximum for ${location}. ${restriction.reason}`
          });
        }
        if (restriction.min && value < restriction.min) {
          errors.push({
            field: field,
            message: `${field} below minimum for ${location}. ${restriction.reason}`
          });
        }
      });
    }

    // Check warnings
    if (locationRules.warnings) {
      Object.keys(locationRules.warnings).forEach(field => {
        if (houseData[field]) {
          warnings.push({
            field: field,
            message: locationRules.warnings[field]
          });
        }
      });
    }
  }

  // Check style-based rules
  if (style && INCOMPATIBLE_RULES.style[style]) {
    const styleRules = INCOMPATIBLE_RULES.style[style];
    
    if (styleRules.incompatibleWith) {
      Object.keys(styleRules.incompatibleWith).forEach(field => {
        const incompatibleValues = styleRules.incompatibleWith[field];
        const currentValue = houseData[field];
        
        if (Array.isArray(incompatibleValues) && incompatibleValues.includes(currentValue)) {
          errors.push({
            field: field,
            message: `${currentValue} is incompatible with ${style} style. ${styleRules.reason}`
          });
        }
      });
    }

    if (styleRules.restrictions) {
      Object.keys(styleRules.restrictions).forEach(field => {
        const restriction = styleRules.restrictions[field];
        const value = houseData[field];
        
        if (restriction.max && value > restriction.max) {
          errors.push({
            field: field,
            message: `${field} exceeds maximum for ${style} style. ${restriction.reason}`
          });
        }
        if (restriction.min && value < restriction.min) {
          errors.push({
            field: field,
            message: `${field} below minimum for ${style} style. ${restriction.reason}`
          });
        }
      });
    }
  }

  // Check pool restrictions
  if (has_pool && location === 'Mountains') {
    errors.push({
      field: 'has_pool',
      message: 'Pools are not practical in mountain locations due to climate and maintenance costs'
    });
  }

  if (has_pool && landscape_type === 'Desert') {
    warnings.push({
      field: 'has_pool',
      message: 'Pool with desert landscaping requires significant water management'
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

// Get disabled options based on current selections
const getDisabledOptions = (currentData) => {
  const disabled = {
    landscape_type: [],
    roof_type: [],
    style: [],
    exterior_color: [],
    kitchen_style: []
  };

  const { location, style } = currentData;

  // Disable incompatible landscapes based on location
  if (location === 'Desert') {
    disabled.landscape_type = ['Lush Garden', 'Tropical', 'English Garden'];
  }

  // Disable incompatible roof types based on location
  if (location === 'Mountains') {
    disabled.roof_type = ['Flat'];
  }

  // Disable incompatible styles based on location
  if (location === 'NYC') {
    disabled.style = ['Ranch'];
  }

  // Disable incompatible features based on style
  if (style === 'Modern') {
    disabled.roof_type = [...disabled.roof_type, 'Gambrel', 'Mansard'];
    disabled.kitchen_style = ['Rustic', 'Farmhouse'];
  }

  if (style === 'Victorian') {
    disabled.roof_type = [...disabled.roof_type, 'Flat', 'Shed'];
    disabled.exterior_color = ['White'];
  }

  return disabled;
};

module.exports = {
  INCOMPATIBLE_RULES,
  validateHouseConfig,
  getDisabledOptions
};