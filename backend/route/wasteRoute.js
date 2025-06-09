import express from 'express';

import { getAllWastes } from '../controller/wasteController.js';

const wasteRouter = express.Router();
// GET /api/waste - Get all waste types
wasteRouter.get('/', getAllWastes);

// Export the wasteRouter
export { wasteRouter };