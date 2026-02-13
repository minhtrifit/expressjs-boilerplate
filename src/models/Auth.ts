import { Role } from './User';

export interface RegisterPayload {
  email: string;
  password: string;
  fullName: string;
  role?: Role;
}

export interface LoginPayload {
  email: string;
  password: string;
}
