import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { Role } from '@/models/User';
import { StringValue } from 'ms';

const SALT_ROUNDS = 10;

export interface JwtPayload {
  userId: string;
  role: Role;
}

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export function isValidRole(value: unknown): value is Role {
  return Object.values(Role).includes(value as Role);
}

export const generateToken = (payload: object): string => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN || '1h';

  if (!secret) throw new Error('JWT_SECRET is not set');

  const options: SignOptions = {
    expiresIn: expiresIn as StringValue | number
  };

  return jwt.sign(payload, secret, options);
};

export const verifyToken = (token: string, secret: string) => {
  try {
    const decoded: any = jwt.verify(token, secret);

    const payload: JwtPayload = {
      userId: decoded?.id,
      role: decoded?.role
    };

    return {
      success: true,
      data: payload,
      message: 'Verify token successfully'
    };
  } catch (error: any) {
    return {
      success: false,
      data: null,
      message: 'Verify token failed'
    };
  }
};
