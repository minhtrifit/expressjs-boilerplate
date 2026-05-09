import { Role } from '@/models/User';

export const CreateSchema = {
  type: 'object',

  properties: {
    adminCode: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    fullName: {
      type: 'string'
    },
    role: {
      type: 'string',
      enum: Object.values(Role),
      example: Role.USER
    }
  }
};

export const UpdateSchema = {
  type: 'object',

  properties: {
    email: {
      type: 'string'
    },
    isActive: {
      type: 'boolean'
    },
    fullName: {
      type: 'string'
    },
    role: {
      type: 'string',
      enum: Object.values(Role),
      example: Role.USER
    }
  }
};
