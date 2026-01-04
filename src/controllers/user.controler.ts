import { Request, Response, NextFunction } from 'express';
import { User } from '@/models/User';

// Mock database
const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

export const getUsers = (req: Request, res: Response, next: NextFunction): void => {
  try {
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const id = parseInt(req.params.id);
    const user = users.find((u) => u.id === id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

export const createUser = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      res.status(400).json({
        success: false,
        message: 'Name and email are required'
      });
      return;
    }

    const newUser: User = {
      id: users.length + 1,
      name,
      email
    };

    users.push(newUser);

    res.status(201).json({
      success: true,
      data: newUser
    });
  } catch (error) {
    next(error);
  }
};
