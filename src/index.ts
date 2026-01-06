import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';
import { errorHandler } from './middlewares/errorHandler';
import { multerErrorHandler } from './middlewares/multer-error.middleware';
import { registerSocketEvents } from './sockets';
import { HTTP_STATUS } from './constants/http-status-code';
import userRoutes from './routes/user.router';
import authRoutes from './routes/auth.router';
import uploadRoutes from './routes/upload.router';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

// HTTP Server
const server = http.createServer(app);

// Socket IO
export const io = new Server(server, {
  cors: {
    origin: [CLIENT_URL],
    methods: ['GET', 'POST']
  }
});

// Register Socket Events
registerSocketEvents(io);

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
app.use('/uploads', express.static(path.resolve('uploads')));

// Routes
app.get('/', (req, res) => {
  res.status(HTTP_STATUS.OK).json({ success: true, message: 'Welcome to Express Boilerplate!' });
});
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);

// Error handling middleware
app.use(multerErrorHandler);
app.use(errorHandler);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
