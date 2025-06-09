import express from 'express';
import {
    getNearbyLocations,
    getAllLocations
} from '../controller/locationController.js';
import {
    authMiddleware
} from '../middleware/authMiddleware.js';

const locRouter = express.Router();
locRouter.use(authMiddleware);
locRouter.get('/locations', getAllLocations);
locRouter.get('/locations/nearby', getNearbyLocations);

// export default locRouter;
export { locRouter };