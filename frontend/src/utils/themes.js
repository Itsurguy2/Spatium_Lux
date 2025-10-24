// Theme configurations based on location and style

export const getLocationTheme = (location) => {
  const themes = {
    'Mountains': {
      background: 'linear-gradient(135deg, #2e3192 0%, #1bffff 100%)',
      primaryColor: '#2e3192',
      secondaryColor: '#1bffff',
      textColor: '#ffffff',
      cardBackground: 'rgba(46, 49, 146, 0.1)',
      borderColor: '#1bffff',
      emoji: '🏔️',
      atmosphere: 'Cool mountain air, crisp and refreshing'
    },
    'NYC': {
      background: 'linear-gradient(135deg, #434343 0%, #000000 100%)',
      primaryColor: '#434343',
      secondaryColor: '#ffd700',
      textColor: '#ffffff',
      cardBackground: 'rgba(67, 67, 67, 0.1)',
      borderColor: '#ffd700',
      emoji: '🏙️',
      atmosphere: 'Urban energy, city lights'
    },
    'Oceanfront': {
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      primaryColor: '#4facfe',
      secondaryColor: '#00f2fe',
      textColor: '#ffffff',
      cardBackground: 'rgba(79, 172, 254, 0.1)',
      borderColor: '#00f2fe',
      emoji: '🌊',
      atmosphere: 'Ocean breeze, salty air'
    },
    'Desert': {
      background: 'linear-gradient(135deg, #f46b45 0%, #eea849 100%)',
      primaryColor: '#f46b45',
      secondaryColor: '#eea849',
      textColor: '#ffffff',
      cardBackground: 'rgba(244, 107, 69, 0.1)',
      borderColor: '#eea849',
      emoji: '🏜️',
      atmosphere: 'Warm desert sun, dry heat'
    },
    'Forest': {
      background: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
      primaryColor: '#134e5e',
      secondaryColor: '#71b280',
      textColor: '#ffffff',
      cardBackground: 'rgba(19, 78, 94, 0.1)',
      borderColor: '#71b280',
      emoji: '🌲',
      atmosphere: 'Fresh pine scent, nature sounds'
    },
    'Countryside': {
      background: 'linear-gradient(135deg, #7fcdcd 0%, #abdd75 100%)',
      primaryColor: '#7fcdcd',
      secondaryColor: '#abdd75',
      textColor: '#ffffff',
      cardBackground: 'rgba(127, 205, 205, 0.1)',
      borderColor: '#abdd75',
      emoji: '🌾',
      atmosphere: 'Rolling hills, peaceful quiet'
    },
    'Lakeside': {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      primaryColor: '#667eea',
      secondaryColor: '#764ba2',
      textColor: '#ffffff',
      cardBackground: 'rgba(102, 126, 234, 0.1)',
      borderColor: '#764ba2',
      emoji: '🏞️',
      atmosphere: 'Tranquil waters, serene views'
    },
    'Suburban': {
      background: 'linear-gradient(135deg, #a8c0ff 0%, #3f2b96 100%)',
      primaryColor: '#a8c0ff',
      secondaryColor: '#3f2b96',
      textColor: '#ffffff',
      cardBackground: 'rgba(168, 192, 255, 0.1)',
      borderColor: '#3f2b96',
      emoji: '🏡',
      atmosphere: 'Quiet neighborhood, family-friendly'
    }
  };

  return themes[location] || themes['Suburban'];
};

export const getStyleAccent = (style) => {
  const accents = {
    'Modern': { icon: '🔲', tagline: 'Clean lines, minimalist elegance' },
    'Traditional': { icon: '🏛️', tagline: 'Timeless charm, classic beauty' },
    'Contemporary': { icon: '✨', tagline: 'Current trends, fresh design' },
    'Ranch': { icon: '🤠', tagline: 'Sprawling comfort, western appeal' },
    'Colonial': { icon: '🎩', tagline: 'Historical grace, stately presence' },
    'Victorian': { icon: '👑', tagline: 'Ornate details, vintage grandeur' },
    'Craftsman': { icon: '🔨', tagline: 'Handcrafted quality, artisan touch' },
    'Mediterranean': { icon: '☀️', tagline: 'Warm elegance, coastal charm' }
  };

  return accents[style] || { icon: '🏠', tagline: 'Your dream home awaits' };
};