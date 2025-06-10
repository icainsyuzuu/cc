import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { createFeedback, deleteFeedbackById, getFeedbackByUserId, updateFeedbackById } from '../controller/feedbackController.js';
const feedbackRouter = express.Router();

// Semua routes memerlukan autentikasi\\
feedbackRouter.use(authMiddleware);
// GET /api/feed/user/:user_id - Ambil semua feedback record milik user
feedbackRouter.get('/feedback/user/:user_id', getFeedbackByUserId);
// POST /api/feedback/user/:user_id - Buat feedback record baru untuk user
feedbackRouter.post('/feedback/user/:user_id', createFeedback);
// PUT /api/feedback/:id - Update feedback record berdasarkan ID
feedbackRouter.put('feedback/:id', updateFeedbackById);
// DELETE /api/feedback/:id - Hapus feedback record berdasarkan ID
feedbackRouter.delete('/:id', deleteFeedbackById);

export { feedbackRouter };