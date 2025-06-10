import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { createFeedback, deleteFeedbackById, getFeedbackByUserId, getFeedbacksById, updateFeedbackById } from '../controller/feedbackController.js';
const feedbackRouter = express.Router();

// Semua routes memerlukan autentikasi\\
feedbackRouter.use(authMiddleware);
feedbackRouter.get('/feedback/user/:user_id', getFeedbackByUserId);  // Untuk mendapatkan feedback berdasarkan user_id
feedbackRouter.post('/feedback/user/:user_id', createFeedback); // Untuk menambah feedback berdasarkan user_id
feedbackRouter.put('/feedback/:id', updateFeedbackById); // Untuk update feedback berdasarkan id
feedbackRouter.delete('/feedback/:id', deleteFeedbackById); // Untuk menghapus feedback berdasarkan id



export { feedbackRouter };
