// Pricing structure for house customization options
const PRICING = {
  // Base prices by location
  locations: {
    'Mountains': 500000,
    'NYC': 1200000,
    'Oceanfront': 900000,
    'Desert': 450000,
    'Forest': 550000,
    'Countryside': 400000,
    'Lakeside': 650000,
    'Suburban': 350000
  },

  // Style pricing (additive)
  styles: {
    'Modern': 100000,
    'Traditional': 50000,
    'Contemporary': 120000,
    'Ranch': 40000,
    'Colonial': 80000,
    'Victorian': 90000,
    'Craftsman': 70000,
    'Mediterranean': 110000
  },

  // Per square foot pricing
  squareFoot: 150,

  // Bedroom pricing (per bedroom)
  bedroom: 50000,

  // Bathroom pricing (per bathroom)
  bathroom: 30000,

  // Exterior colors (additive)
  exteriorColors: {
    'White': 0,
    'Beige': 5000,
    'Gray': 5000,
    'Blue': 8000,
    'Green': 8000,
    'Brown': 6000,
    'Red': 10000,
    'Yellow': 7000
  },

  // Roof types
  roofTypes: {
    'Gable': 20000,
    'Hip': 25000,
    'Flat': 15000,
    'Mansard': 35000,
    'Gambrel': 30000,
    'Shed': 18000
  },

  // Flooring types (per sq ft)
  flooringTypes: {
    'Hardwood': 10,
    'Tile': 8,
    'Carpet': 5,
    'Laminate': 6,
    'Vinyl': 4,
    'Marble': 15,
    'Bamboo': 12
  },

  // Kitchen styles
  kitchenStyles: {
    'Modern': 50000,
    'Traditional': 35000,
    'Rustic': 40000,
    'Industrial': 45000,
    'Scandinavian': 48000,
    'Farmhouse': 38000
  },

  // Amenities (fixed price)
  amenities: {
    pool: 75000,
    garage: 40000,
    garageSpace: 15000, // per space
    deck: 25000,
    fireplace: 12000
  },

  // Landscape types
  landscapeTypes: {
    'Minimal': 10000,
    'Lush Garden': 35000,
    'Desert': 15000,
    'Tropical': 40000,
    'Zen': 30000,
    'English Garden': 38000
  }
};

// Calculate total price based on customization options
const calculatePrice = (houseData) => {
  let total = 0;

  // Base location price
  if (houseData.location && PRICING.locations[houseData.location]) {
    total += PRICING.locations[houseData.location];
  }

  // Style price
  if (houseData.style && PRICING.styles[houseData.style]) {
    total += PRICING.styles[houseData.style];
  }

  // Square footage
  if (houseData.square_feet) {
    total += houseData.square_feet * PRICING.squareFoot;
  }

  // Bedrooms
  if (houseData.bedrooms) {
    total += houseData.bedrooms * PRICING.bedroom;
  }

  // Bathrooms
  if (houseData.bathrooms) {
    total += houseData.bathrooms * PRICING.bathroom;
  }

  // Exterior color
  if (houseData.exterior_color && PRICING.exteriorColors[houseData.exterior_color]) {
    total += PRICING.exteriorColors[houseData.exterior_color];
  }

  // Roof type
  if (houseData.roof_type && PRICING.roofTypes[houseData.roof_type]) {
    total += PRICING.roofTypes[houseData.roof_type];
  }

  // Flooring
  if (houseData.flooring_type && houseData.square_feet && PRICING.flooringTypes[houseData.flooring_type]) {
    total += houseData.square_feet * PRICING.flooringTypes[houseData.flooring_type];
  }

  // Kitchen style
  if (houseData.kitchen_style && PRICING.kitchenStyles[houseData.kitchen_style]) {
    total += PRICING.kitchenStyles[houseData.kitchen_style];
  }

  // Amenities
  if (houseData.has_pool) {
    total += PRICING.amenities.pool;
  }

  if (houseData.has_garage) {
    total += PRICING.amenities.garage;
    if (houseData.garage_spaces) {
      total += (houseData.garage_spaces - 1) * PRICING.amenities.garageSpace;
    }
  }

  if (houseData.has_deck) {
    total += PRICING.amenities.deck;
  }

  if (houseData.has_fireplace) {
    total += PRICING.amenities.fireplace;
  }

  // Landscape
  if (houseData.landscape_type && PRICING.landscapeTypes[houseData.landscape_type]) {
    total += PRICING.landscapeTypes[houseData.landscape_type];
  }

  return total;
};

module.exports = {
  PRICING,
  calculatePrice
};