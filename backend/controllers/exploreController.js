const db = require('../config/db');

// Search and filter verified hotels globally
exports.exploreHotels = async (req, res) => {
  const { search, offers_delivery } = req.query;

  try {
    let queryText = `
      SELECT 
        h.id,
        h.business_name,
        h.description,
        h.contact_phone,
        h.contact_email,
        h.interior_images,
        h.address_text,
        h.offers_delivery,
        h.takes_orders,
        COALESCE(AVG(r.rating), 0)::numeric(2,1) AS average_rating
      FROM hotels h
      LEFT JOIN reviews r ON h.id = r.hotel_id
      WHERE h.is_verified = true
    `;

    const values = [];

    if (search) {
      values.push(`%${search}%`);
      queryText += ` AND (h.business_name ILIKE $${values.length} OR h.address_text ILIKE $${values.length})`;
    }

    if (offers_delivery === 'true') {
      queryText += ` AND h.offers_delivery = true`;
    }

    queryText += ` GROUP BY h.id ORDER BY h.created_at DESC;`;

    const result = await db.query(queryText, values);

    res.status(200).json({
      count: result.rows.length,
      hotels: result.rows,
    });
  } catch (error) {
    console.error('Explore Query Error:', error);
    res.status(500).json({ message: 'Error retrieving hotels for explore view.' });
  }
};