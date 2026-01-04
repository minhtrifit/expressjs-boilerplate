export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export interface UserBase {
  email: string;
  password: string;
  fullName: string;
}

export interface User extends UserBase {
  id: string;
  role: Role;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserPayload extends UserBase {
  role: Role;
}
