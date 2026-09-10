const db = require('../config/db');

// Record a new client action (e.g., clicking to call a hotel)
exports.logActivity = async (req, res) => {
  const userId = req.user.id;
  const { hotel_id, action_type, details, amount } = req.body;

  if (!action_type) {
    return res.status(400).json({ message: 'Action type is required.' });
  }

  try {
    const queryText = `
      INSERT INTO activity_transactions (user_id, hotel_id, action_type, details, amount)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [userId, hotel_id || null, action_type, details || {}, amount || 0.00];
    const result = await db.query(queryText, values);

    res.status(201).json({
      message: 'Activity logged successfully.',
      activity: result.rows[0],
    });
  } catch (error) {
    console.error('Log Activity Error:', error);
    res.status(500).json({ message: 'Error logging user activity.' });
  }
};

// Retrieve activity history for the logged-in client
exports.getUserActivities = async (req, res) => {
  const userId = req.user.id;

  try {
    const queryText = `
      SELECT 
        a.id,
        a.action_type,
        a.details,
        a.amount,
        a.created_at,
        h.business_name AS hotel_name,
        h.contact_phone
      FROM activity_transactions a
      LEFT JOIN hotels h ON a.hotel_id = h.id
      WHERE a.user_id = $1
      ORDER BY a.created_at DESC;
    `;
    const result = await db.query(queryText, [userId]);

    res.status(200).json({
      count: result.rows.length,
      activities: result.rows,
    });
  } catch (error) {
    console.error('Fetch Activity Error:', error);
    res.status(500).json({ message: 'Error retrieving activity history.' });
  }
};