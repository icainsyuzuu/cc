import express from 'express';
import {
    authMiddleware
} from '../middleware/authMiddleware.js';
import {
    getWasteHistory,
    logWaste
} from '../controller/wasteRecordController.js';

const WasteRecordRouter = express.Router();

// Semua routes memerlukan authentication
WasteRecordRouter.use(authMiddleware);

// POST /api/waste - Log waste record
WasteRecordRouter.post('/', logWaste);

// GET /api/waste - Get waste history
WasteRecordRouter.get('/', getWasteHistory);

// export default WasteRecordRouter;
export { WasteRecordRouter };