const db = require('../config/db');

// Setup or Update Hotel Profile Details
exports.upsertHotelProfile = async (req, res) => {
  const userId = req.user.id;
  const { 
    business_name, 
    description, 
    contact_phone, 
    contact_email, 
    address_text, 
    latitude, 
    longitude, 
    interior_images 
  } = req.body;

  if (!business_name || !contact_phone || !address_text || !latitude || !longitude) {
    return res.status(400).json({ 
      message: 'Business name, contact phone, address, latitude, and longitude are required.' 
    });
  }

  try {
    // Upsert query using PostGIS ST_SetSRID(ST_MakePoint(lng, lat), 4326)
    const queryText = `
      INSERT INTO hotels (
        owner_id, business_name, description, contact_phone, contact_email, 
        address_text, location, interior_images
      )
      VALUES ($1, $2, $3, $4, $5, $6, ST_SetSRID(ST_MakePoint($7, $8), 4326), $9)
      ON CONFLICT (owner_id) 
      DO UPDATE SET
        business_name = EXCLUDED.business_name,
        description = EXCLUDED.description,
        contact_phone = EXCLUDED.contact_phone,
        contact_email = EXCLUDED.contact_email,
        address_text = EXCLUDED.address_text,
        location = EXCLUDED.location,
        interior_images = EXCLUDED.interior_images
      RETURNING id, business_name, contact_phone, address_text, offers_delivery, takes_orders, is_verified;
    `;

    const values = [
      userId, 
      business_name, 
      description, 
      contact_phone, 
      contact_email, 
      address_text, 
      parseFloat(longitude), 
      parseFloat(latitude), 
      interior_images || []
    ];

    const result = await db.query(queryText, values);

    res.status(200).json({
      message: 'Hotel profile saved successfully.',
      hotel: result.rows[0]
    });
  } catch (error) {
    console.error('Hotel Profile Error:', error);
    res.status(500).json({ message: 'Error saving hotel profile.' });
  }
};

// Toggle Delivery and Order Services Status Live
exports.toggleServiceStatus = async (req, res) => {
  const userId = req.user.id;
  const { offers_delivery, takes_orders } = req.body;

  try {
    const result = await db.query(
      `UPDATE hotels 
       SET offers_delivery = COALESCE($1, offers_delivery),
           takes_orders = COALESCE($2, takes_orders)
       WHERE owner_id = $3
       RETURNING id, business_name, offers_delivery, takes_orders;`,
      [offers_delivery, takes_orders, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Hotel profile not found for this account.' });
    }

    res.status(200).json({
      message: 'Service status updated.',
      hotel: result.rows[0]
    });
  } catch (error) {
    console.error('Toggle Service Error:', error);
    res.status(500).json({ message: 'Error updating service status.' });
  }
};

// Add Menu Item
exports.addMenuItem = async (req, res) => {
  const userId = req.user.id;
  const { item_name, description, category, price, image_url } = req.body;

  if (!item_name || !price) {
    return res.status(400).json({ message: 'Item name and price are required.' });
  }

  try {
    // Fetch hotel ID
    const hotelResult = await db.query('SELECT id FROM hotels WHERE owner_id = $1', [userId]);
    if (hotelResult.rows.length === 0) {
      return res.status(404).json({ message: 'Please create a hotel profile first.' });
    }

    const hotelId = hotelResult.rows[0].id;

    const queryText = `
      INSERT INTO menu_items (hotel_id, item_name, description, category, price, image_url)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [hotelId, item_name, description, category || 'General', parseFloat(price), image_url];
    const newMenuItem = await db.query(queryText, values);

    res.status(201).json({
      message: 'Menu item added successfully.',
      item: newMenuItem.rows[0]
    });
  } catch (error) {
    console.error('Add Menu Item Error:', error);
    res.status(500).json({ message: 'Error adding menu item.' });
  }
};