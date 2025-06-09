import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import {
  getWasteRecordsByUserId,
  createWasteRecordByUserId,
  updateWasteRecordById,
  deleteWasteRecordById
} from '../controller/wasteRecordController.js';
import { uploadImage } from '../middleware/uploadImage.js';
const WasteRecordRouter = express.Router();

// Semua routes memerlukan autentikasi
WasteRecordRouter.use(authMiddleware);
// GET /api/waste/user/:user_id - Ambil semua waste record milik user
WasteRecordRouter.get('/user/:user_id', getWasteRecordsByUserId);
// POST /api/waste/user/:user_id - Buat waste record baru untuk user
WasteRecordRouter.post('/user/:user_id', uploadImage, createWasteRecordByUserId);
// PUT /api/waste/:id - Update waste record berdasarkan ID
WasteRecordRouter.put('/:id', updateWasteRecordById);
// DELETE /api/waste/:id - Hapus waste record berdasarkan ID
WasteRecordRouter.delete('/:id', deleteWasteRecordById);

export { WasteRecordRouter };
