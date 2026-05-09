import { Application } from 'express';
import { HTTP_STATUS } from '../constants/http-status-code';

import userRoutes from './user.router';
import authRoutes from './auth.router';
import uploadRoutes from './upload.router';

const registerRoutes = (app: Application) => {
  app.get('/', (req, res) => {
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Welcome to Express Boilerplate!'
    });
  });
  app.use('/api/users', userRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api/upload', uploadRoutes);
};

export default registerRoutes;
