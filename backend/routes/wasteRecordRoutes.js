const express = require('express');
const router = express.Router();
const wasteRecordController = require('../controllers/wasteRecordController');
const authMiddleware = require('../middleware/authMiddleware');

// Semua routes memerlukan authentication
router.use(authMiddleware);

// POST /api/waste - Log waste record
router.post('/', wasteRecordController.logWaste);

// GET /api/waste - Get waste history
router.get('/', wasteRecordController.getWasteHistory);

module.exports = router;