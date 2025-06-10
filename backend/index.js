import express from 'express';
import cors from 'cors';
import "dotenv/config";
import { associateModels } from './config/assoc.js';
import { userRouter } from './route/userRoute.js';
import { authRouter } from './route/authRoute.js';
import { locRouter } from './route/locationRoute.js';
import { WasteRecordRouter } from './route/wasteRecordRoute.js';
import { wasteRouter } from './route/wasteRoute.js';
import cookieParser from 'cookie-parser';
import { feedbackRouter } from './route/feedbackRoute.js';

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5000",
    "http://localhost:3000",
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "http://localhost:8080",
    // "https://a-09-450915.uc.r.appspot.com"
];
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.get('/api', (req, res) => {
    res.send('Hello from Eco Waste backend!');

});
app.use('/api', authRouter);
app.use('/api/user', userRouter);
app.use('/api', locRouter);
app.use('/api/waste', wasteRouter);
app.use('/api/waste-record', WasteRecordRouter);
app.use('/api/feedback', feedbackRouter);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Link: http://localhost:' + PORT);
    associateModels(); // Initialize model associations
});