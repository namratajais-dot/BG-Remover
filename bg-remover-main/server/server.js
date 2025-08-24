import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/mongodb.js';
import userRouter from './routes/userRoute.js';
import imageRouter from './routes/ImageRoutes.js';

// App config
const PORT = process.env.PORT || 4000;
const app = express();

// Connect to MongoDB
try {
  await connectDB();
  console.log('✅ MongoDB connected');
} catch (err) {
  console.error('❌ MongoDB connection failed:', err);
  process.exit(1); // stop server if DB fails
}

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['https://<your-frontend>.vercel.app'], // replace with your frontend URL
  credentials: true
}));

// Health check
app.get('/health', (_req, res) => res.status(200).send('ok'));

// Test route
app.get('/', (_req, res) => res.send('API Working'));

// API routes
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
