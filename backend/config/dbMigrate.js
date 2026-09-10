const db = require('./db');

const migrate = async () => {
  try {
    console.log('Starting database migration...');

    // 1. Enable PostGIS Extension
    await db.query(`CREATE EXTENSION IF NOT EXISTS postgis;`);

    // 2. Create Enum Types
    await db.query(`
      DO $$ BEGIN
        CREATE TYPE user_role AS ENUM ('CLIENT', 'HOTEL', 'ADMIN');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;

      DO $$ BEGIN
        CREATE TYPE document_status AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    // 3. Create Users Table
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(150) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        role user_role DEFAULT 'CLIENT',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 4. Create Hotels Table with Geospatial Location Point
    await db.query(`
      CREATE TABLE IF NOT EXISTS hotels (
        id SERIAL PRIMARY KEY,
        owner_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
        business_name VARCHAR(200) NOT NULL,
        description TEXT,
        contact_phone VARCHAR(50) NOT NULL,
        contact_email VARCHAR(255),
        interior_images TEXT[], -- Array of photo URLs
        location GEOMETRY(Point, 4326), -- PostGIS Spatial Point (Lng, Lat)
        address_text TEXT NOT NULL,
        offers_delivery BOOLEAN DEFAULT false, -- Toggle delivery service availability
        takes_orders BOOLEAN DEFAULT true,     -- Toggle live order taking
        is_verified BOOLEAN DEFAULT false,     -- Approved by Admin
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create Spatial Index for Fast Proximity Queries
    await db.query(`
      CREATE INDEX IF NOT EXISTS idx_hotels_location ON hotels USING GIST (location);
    `);

    // 5. Create Documents Table (For Admin KYC Verification)
    await db.query(`
      CREATE TABLE IF NOT EXISTS hotel_documents (
        id SERIAL PRIMARY KEY,
        hotel_id INT REFERENCES hotels(id) ON DELETE CASCADE,
        document_name VARCHAR(200) NOT NULL,
        document_url TEXT NOT NULL,
        status document_status DEFAULT 'PENDING',
        rejection_reason TEXT,
        uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 6. Create Menu Items Table
    await db.query(`
      CREATE TABLE IF NOT EXISTS menu_items (
        id SERIAL PRIMARY KEY,
        hotel_id INT REFERENCES hotels(id) ON DELETE CASCADE,
        item_name VARCHAR(200) NOT NULL,
        description TEXT,
        category VARCHAR(100) DEFAULT 'General',
        price NUMERIC(10, 2) NOT NULL,
        image_url TEXT,
        is_available BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 7. Create Activity / Transactions Table
    await db.query(`
      CREATE TABLE IF NOT EXISTS activity_transactions (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        hotel_id INT REFERENCES hotels(id) ON DELETE SET NULL,
        action_type VARCHAR(100) NOT NULL, -- e.g., 'CALL_HOTEL', 'ORDER_PLACED', 'BILL_PAID'
        details JSONB,
        amount NUMERIC(10, 2) DEFAULT 0.00,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 8. Create Reviews & Moderation Table
    await db.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        hotel_id INT REFERENCES hotels(id) ON DELETE CASCADE,
        rating INT CHECK (rating >= 1 AND rating <= 5),
        comment TEXT,
        is_reported BOOLEAN DEFAULT false,
        report_reason TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Database schema created successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
};

migrate();