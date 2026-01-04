import bcrypt from 'bcryptjs';
import { Role } from '@/models/User';

const SALT_ROUNDS = 10;

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export function isValidRole(value: unknown): value is Role {
  return Object.values(Role).includes(value as Role);
}
