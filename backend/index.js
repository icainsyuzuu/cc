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

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/api', (req, res) => {
    res.send('Hello from Eco Waste backend!');
    
});
app.use('/api', authRouter);
// app.use('/api/user', userRouter);
app.use('/api', locRouter);
app.use('/api/waste', wasteRouter);
app.use('/api/waste-record', WasteRecordRouter);


app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
console.log('Link: http://localhost:' + PORT);
associateModels(); // Initialize model associations
});