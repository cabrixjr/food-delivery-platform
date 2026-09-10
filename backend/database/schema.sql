-- Enable PostGIS Extension
CREATE EXTENSION IF NOT EXISTS postgis;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'CLIENT' CHECK (role IN ('CLIENT', 'HOTEL', 'ADMIN')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Hotels Table
CREATE TABLE IF NOT EXISTS hotels (
  id SERIAL PRIMARY KEY,
  owner_id INT REFERENCES users(id) ON DELETE CASCADE,
  business_name VARCHAR(150) NOT NULL,
  description TEXT,
  contact_phone VARCHAR(50) NOT NULL,
  contact_email VARCHAR(150),
  address_text TEXT NOT NULL,
  location GEOGRAPHY(Point, 4326),
  is_verified BOOLEAN DEFAULT FALSE,
  verification_doc_url TEXT,
  interior_images TEXT[],
  offers_delivery BOOLEAN DEFAULT FALSE,
  takes_orders BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Spatial Index for Fast Geographic Queries
CREATE INDEX IF NOT EXISTS idx_hotels_location ON hotels USING GIST(location);

-- 3. Menu Items Table
CREATE TABLE IF NOT EXISTS menu_items (
  id SERIAL PRIMARY KEY,
  hotel_id INT REFERENCES hotels(id) ON DELETE CASCADE,
  item_name VARCHAR(150) NOT NULL,
  description TEXT,
  category VARCHAR(50) DEFAULT 'General',
  price NUMERIC(10, 2) NOT NULL,
  image_url TEXT,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Activity Transactions Table
CREATE TABLE IF NOT EXISTS activity_transactions (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  hotel_id INT REFERENCES hotels(id) ON DELETE SET NULL,
  action_type VARCHAR(50) NOT NULL,
  details JSONB,
  amount NUMERIC(10, 2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  hotel_id INT REFERENCES hotels(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  rating NUMERIC(2, 1) CHECK (rating >= 1.0 AND rating <= 5.0),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);