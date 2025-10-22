const { pool } = require('./db');

const setupDatabase = async () => {
  try {
    console.log('🔧 Setting up database tables...\n');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Users table created');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS custom_houses (
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
    `);
    console.log('✅ Custom houses table created');

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_custom_houses_user_id 
      ON custom_houses(user_id);
    `);
    console.log('✅ Indexes created');

    await pool.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    `);

    await pool.query(`
      DROP TRIGGER IF EXISTS update_users_updated_at ON users;
      CREATE TRIGGER update_users_updated_at 
      BEFORE UPDATE ON users 
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    `);

    await pool.query(`
      DROP TRIGGER IF EXISTS update_custom_houses_updated_at ON custom_houses;
      CREATE TRIGGER update_custom_houses_updated_at 
      BEFORE UPDATE ON custom_houses 
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    `);
    console.log('✅ Triggers created');

    console.log('\n🎉 Database setup completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    process.exit(1);
  }
};

setupDatabase();