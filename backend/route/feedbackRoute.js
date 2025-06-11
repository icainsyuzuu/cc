import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { 
    createFeedback, 
    deleteFeedbackById, 
    getFeedbackByUserId, 
    getFeedbacksById, 
    updateFeedbackById 
} from '../controller/feedbackController.js';

const feedbackRouter = express.Router();

// Apply auth middleware to all routes
feedbackRouter.use(authMiddleware);

// Routes for feedback operations
feedbackRouter.get('/user/:user_id', getFeedbackByUserId);  // GET /api/feedback/user/:user_id
feedbackRouter.post('/user/:user_id', createFeedback);      // POST /api/feedback/user/:user_id
feedbackRouter.get('/:id', getFeedbacksById);              // GET /api/feedback/:id
feedbackRouter.put('/:id', updateFeedbackById);            // PUT /api/feedback/:id
feedbackRouter.delete('/:id', deleteFeedbackById);         // DELETE /api/feedback/:id

export { feedbackRouter };
