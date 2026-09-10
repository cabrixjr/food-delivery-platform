const db = require('../config/db');

// Get Hotels Ranked by Distance ("Near Me")
exports.getNearMeHotels = async (req, res) => {
  const { latitude, longitude, max_distance_km = 10 } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ message: 'Client latitude and longitude parameters are required.' });
  }

  try {
    // PostGIS query: ST_DistanceSphere calculates distance in meters between user point and hotel location
    const queryText = `
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
        ST_X(h.location::geometry) AS longitude,
        ST_Y(h.location::geometry) AS latitude,
        ROUND((ST_DistanceSphere(h.location, ST_MakePoint($1, $2)) / 1000)::numeric, 2) AS distance_km,
        COALESCE(AVG(r.rating), 0)::numeric(2,1) AS average_rating
      FROM hotels h
      LEFT JOIN reviews r ON h.id = r.hotel_id
      WHERE h.is_verified = true
        AND ST_DistanceSphere(h.location, ST_MakePoint($1, $2)) <= $3 * 1000
      GROUP BY h.id
      ORDER BY distance_km ASC;
    `;

    const values = [parseFloat(longitude), parseFloat(latitude), parseFloat(max_distance_km)];
    const result = await db.query(queryText, values);

    res.status(200).json({
      count: result.rows.length,
      hotels: result.rows
    });
  } catch (error) {
    console.error('Geospatial Query Error:', error);
    res.status(500).json({ message: 'Error retrieving nearby hotels.' });
  }
};