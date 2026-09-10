const db = require('../config/db');

// Get Pending Business Document Applications
exports.getPendingVerifications = async (req, res) => {
  try {
    const queryText = `
      SELECT 
        hd.id AS document_id,
        hd.document_name,
        hd.document_url,
        hd.status,
        hd.uploaded_at,
        h.id AS hotel_id,
        h.business_name,
        h.contact_phone,
        h.contact_email
      FROM hotel_documents hd
      JOIN hotels h ON hd.hotel_id = h.id
      WHERE hd.status = 'PENDING'
      ORDER BY hd.uploaded_at ASC;
    `;

    const result = await db.query(queryText);

    res.status(200).json({
      count: result.rows.length,
      pending_verifications: result.rows
    });
  } catch (error) {
    console.error('Pending Verifications Error:', error);
    res.status(500).json({ message: 'Error fetching pending verifications.' });
  }
};

// Approve or Reject Hotel Account
exports.verifyHotel = async (req, res) => {
  const { hotel_id, document_id, status, rejection_reason } = req.body;

  if (!hotel_id || !document_id || !['APPROVED', 'REJECTED'].includes(status)) {
    return res.status(400).json({ message: 'Valid hotel_id, document_id, and status (APPROVED/REJECTED) are required.' });
  }

  try {
    // 1. Update Document Status
    await db.query(
      `UPDATE hotel_documents 
       SET status = $1, rejection_reason = $2 
       WHERE id = $3 AND hotel_id = $4;`,
      [status, rejection_reason || null, document_id, hotel_id]
    );

    // 2. If Approved, Enable Hotel Verification Badge
    if (status === 'APPROVED') {
      await db.query(
        `UPDATE hotels SET is_verified = true WHERE id = $1;`,
        [hotel_id]
      );
    }

    res.status(200).json({
      message: `Hotel verification status set to ${status}.`
    });
  } catch (error) {
    console.error('Hotel Verification Error:', error);
    res.status(500).json({ message: 'Error processing hotel verification.' });
  }
};