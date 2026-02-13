import { prisma } from '@/libs/prisma';
import { comparePassword, generateToken, hashPassword } from '@/libs/auth';
import { Role, UserPayload } from '@/models/User';
import { RegisterPayload, LoginPayload } from '@/models/Auth';

export enum AuthError {
  EXISTED = 'EXISTED',
  NOT_FOUND = 'USER_NOT_FOUND',
  EMAIL_EXISTED = 'USER_EMAIL_EXISTED',
  NO_PERMISSION = 'NO_PERMISSION',
  EMAIL_PASSWORD_NOT_MATCH = 'EMAIL_PASSWORD_NOT_MATCH',
  AUTHORZIED_FAILED = 'AUTHORZIED_FAILED'
}

export const authService = {
  async register(payload: RegisterPayload) {
    const { email, password, fullName } = payload;

    // Find user with email
    const existedUser = await prisma.user.findUnique({
      where: { email: email }
    });

    if (existedUser) throw new Error(AuthError.EMAIL_EXISTED);

    // Hash user password
    const hashedPassword = await hashPassword(password);

    const newUser: UserPayload = {
      email: email,
      password: hashedPassword,
      fullName: fullName,
      role: Role.USER
    };

    const user = await prisma.user.create({
      data: newUser
    });

    return user;
  },

  async login(payload: LoginPayload) {
    const { email, password } = payload;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email }
    });

    if (!user) throw new Error(AuthError.NOT_FOUND);

    if (!user.isActive) throw new Error(AuthError.NO_PERMISSION);

    // Compare password
    const validPassword = await comparePassword(password, user.password);

    if (!validPassword) throw new Error(AuthError.EMAIL_PASSWORD_NOT_MATCH);

    // Generate token
    const token = generateToken(user);

    if (!token) throw new Error(AuthError.AUTHORZIED_FAILED);

    return { ...user, token };
  }
};
