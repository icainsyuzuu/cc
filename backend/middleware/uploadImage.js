import multer from 'multer';
import { bucket } from '../config/gcs.js'; // path ke gcs.js yang kamu bikin

// Setup multer memory storage supaya file bisa langsung diupload ke GCS
const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // max 5MB
  },
});

const uploadImage = multerMid.single('image'); // field 'image' dari form-data

//export middleware untuk digunakan di route
export { uploadImage };