import express from 'express';
import {
    getNearbyLocations
} from '../controller/locationController.js';
import {
    authMiddleware
} from '../middleware/authMiddleware.js';

const locRouter = express.Router();
locRouter.use(authMiddleware);

locRouter.get('/locations/nearby', getNearbyLocations);

// export default locRouter;
export { locRouter };