import { prisma } from '@/libs/prisma';
import { hashPassword, JwtPayload } from '@/libs/auth';
import { GetUsersParams, Role, UpdateUserPayload, UserPayload } from '@/models/User';
import { PagingType } from '@/models';

export enum UserError {
  EXISTED = 'EXISTED',
  ID_NOT_FOUND = 'USER_ID_NOT_FOUND',
  NOT_FOUND = 'USER_NOT_FOUND',
  EMAIL_EXISTED = 'USER_EMAIL_EXISTED',
  NO_ACCESS_PERMISSION = 'NO_ACCESS_PERMISSION'
}

export const userService = {
  async getList(params: GetUsersParams) {
    const page = Math.max(Number(params.page) || 1, 1);
    const limit = Math.min(Number(params.limit) || 10, 100);

    const q = (params.q as string)?.trim();
    const isActive = params.isActive !== undefined ? params.isActive === 'true' : undefined;

    const skip = (page - 1) * limit;

    // Build where condition
    const where: any = {
      ...(isActive !== undefined && { isActive }),
      ...(q && {
        OR: [{ email: { contains: q, mode: 'insensitive' } }, { fullName: { contains: q, mode: 'insensitive' } }]
      })
    };

    const [data, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.user.count({ where })
    ]);

    const paging: PagingType = {
      current_page: page,
      total_item: data.length,
      total_page: Math.ceil(total / limit),
      total
    };

    return {
      data,
      paging
    };
  },

  async getById(id: string) {
    if (!id) throw new Error(UserError.ID_NOT_FOUND);

    // Find user
    const user = await prisma.user.findUnique({
      where: { id: id }
    });

    if (!user) throw new Error(UserError.NOT_FOUND);
  },

  async create(payload: UserPayload) {
    const { email, password, fullName, role } = payload;

    // Find user with email
    const existedUser = await prisma.user.findUnique({
      where: { email: email }
    });

    if (existedUser) throw new Error(UserError.EMAIL_EXISTED);

    // Hash user password
    const hashedPassword = await hashPassword(password);

    const newUser: UserPayload = {
      email: email,
      password: hashedPassword,
      fullName: fullName,
      role: role ? role : Role.USER
    };

    const user = await prisma.user.create({
      data: newUser
    });

    return user;
  },

  async update(id: string, payload: Partial<UpdateUserPayload>, jwtPayload: JwtPayload) {
    if (jwtPayload.role === Role.USER && jwtPayload.userId !== id) {
      throw new Error(UserError.NO_ACCESS_PERMISSION);
    }

    const { email, fullName, isActive } = payload;

    // 2. Check user by ID
    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user) throw new Error(UserError.NOT_FOUND);

    // 3. Build data update
    const data: any = {};

    if (fullName !== undefined) data.fullName = fullName;
    if (email !== undefined) data.email = email;
    if (isActive !== undefined) data.isActive = isActive;

    // 4. Update
    const updatedUser = await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        fullName: true,
        email: true,
        isActive: true,
        updatedAt: true
      }
    });

    return updatedUser;
  }
};
