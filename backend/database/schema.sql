-- Drop existing tables if they exist
DROP TABLE IF EXISTS custom_houses CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create custom_houses table
CREATE TABLE custom_houses (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  location VARCHAR(50) NOT NULL,
  style VARCHAR(50),
  bedrooms INTEGER,
  bathrooms INTEGER,
  square_feet INTEGER,
  exterior_color VARCHAR(50),
  roof_type VARCHAR(50),
  flooring_type VARCHAR(50),
  kitchen_style VARCHAR(50),
  has_pool BOOLEAN DEFAULT FALSE,
  has_garage BOOLEAN DEFAULT FALSE,
  garage_spaces INTEGER,
  has_deck BOOLEAN DEFAULT FALSE,
  has_fireplace BOOLEAN DEFAULT FALSE,
  landscape_type VARCHAR(50),
  price_estimate DECIMAL(12, 2),
  image_url TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_custom_houses_user_id ON custom_houses(user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers
CREATE TRIGGER update_users_updated_at 
BEFORE UPDATE ON users 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_custom_houses_updated_at 
BEFORE UPDATE ON custom_houses 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Success message
SELECT 'Database schema created successfully!' AS message;