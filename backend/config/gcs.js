import { Storage } from '@google-cloud/storage';
//env
import dotenv from "dotenv";
dotenv.config();

const storage = new Storage(); // Auto pakai default creds dari environment
const bucketName = process.env.GCS_BUCKET_NAME;
const bucket = storage.bucket(bucketName);

export { bucket };
