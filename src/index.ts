import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';
import i18nextMiddleware from 'i18next-http-middleware';
import swaggerUi from 'swagger-ui-express';
import { errorHandler } from './middlewares/errorHandler';
import { multerErrorHandler } from './middlewares/multer-error.middleware';
import { morganMiddleware } from './configs/morgan';
import { registerSocketEvents } from './sockets';
import i18next from './configs/i18n';
import registerRoutes from './routes';
import swaggerSpec from './swagger';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';
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
app.use(i18nextMiddleware.handle(i18next));
app.use(morganMiddleware);

// Routes
registerRoutes(app);

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handling middleware
app.use(multerErrorHandler);
app.use(errorHandler);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API docs at ${BASE_URL}/api-docs`);
});

export default app;
