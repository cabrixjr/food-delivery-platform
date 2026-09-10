const db = require('../config/db');

// Get Menu Items for a Specific Hotel (Public Route)
exports.getMenuByHotel = async (req, res) => {
  const { hotelId } = req.params;

  try {
    const queryText = `
      SELECT id, item_name, description, category, price, image_url, is_available 
      FROM menu_items 
      WHERE hotel_id = $1 
      ORDER BY category ASC, item_name ASC;
    `;
    const result = await db.query(queryText, [hotelId]);

    res.status(200).json({
      count: result.rows.length,
      menu: result.rows
    });
  } catch (error) {
    console.error('Fetch Menu Error:', error);
    res.status(500).json({ message: 'Error retrieving menu items.' });
  }
};

// Update Item Availability or Pricing (Hotel Owner Route)
exports.updateMenuItem = async (req, res) => {
  const { itemId } = req.params;
  const userId = req.user.id;
  const { price, is_available } = req.body;

  try {
    // Verify menu item belongs to current user's hotel
    const queryText = `
      UPDATE menu_items mi
      SET price = COALESCE($1, mi.price),
          is_available = COALESCE($2, mi.is_available)
      FROM hotels h
      WHERE mi.hotel_id = h.id AND mi.id = $3 AND h.owner_id = $4
      RETURNING mi.id, mi.item_name, mi.price, mi.is_available;
    `;
    const result = await db.query(queryText, [price, is_available, itemId, userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Menu item not found or unauthorized.' });
    }

    res.status(200).json({
      message: 'Menu item updated.',
      item: result.rows[0]
    });
  } catch (error) {
    console.error('Update Menu Error:', error);
    res.status(500).json({ message: 'Error updating menu item.' });
  }
};

// Delete Menu Item (Hotel Owner Route)
exports.deleteMenuItem = async (req, res) => {
  const { itemId } = req.params;
  const userId = req.user.id;

  try {
    const queryText = `
      DELETE FROM menu_items mi
      USING hotels h
      WHERE mi.hotel_id = h.id AND mi.id = $1 AND h.owner_id = $2
      RETURNING mi.id;
    `;
    const result = await db.query(queryText, [itemId, userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Menu item not found or unauthorized.' });
    }

    res.status(200).json({ message: 'Menu item deleted successfully.' });
  } catch (error) {
    console.error('Delete Menu Error:', error);
    res.status(500).json({ message: 'Error deleting menu item.' });
  }
};