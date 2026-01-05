import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middlewares/errorHandler';
import { HTTP_STATUS } from './constants/http-status-code';
import userRoutes from './routes/user.router';
import authRoutes from './routes/auth.router';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

// Middlewares
app.use(
  cors({
    origin: [CLIENT_URL],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.status(HTTP_STATUS.OK).json({ success: true, message: 'Welcome to Express Boilerplate!' });
});
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
