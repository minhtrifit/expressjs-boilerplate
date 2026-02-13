import Joi from 'joi';
import { Role } from '@/models/User';

const roleValues = Object.values(Role);

export const GetQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).max(100).optional(),
  q: Joi.string().trim().allow('').optional(),
  isActive: Joi.string().allow('').valid('true', 'false').optional()
});

export const GetParamsSchema = Joi.object({
  id: Joi.string().trim().required()
});

export const CreateSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  fullName: Joi.string().required(),
  role: Joi.string()
    .valid(...roleValues)
    .optional()
});

export const UpdateSchema = Joi.object({
  email: Joi.string().min(1).optional(),
  fullName: Joi.string().min(1).optional(),
  role: Joi.string()
    .valid(...roleValues)
    .optional(),
  isActive: Joi.boolean().optional()
});
