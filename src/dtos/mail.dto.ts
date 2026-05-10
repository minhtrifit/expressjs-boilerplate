import Joi from 'joi';

export const MailSchema = Joi.object({
  to: Joi.string().required(),
  subject: Joi.string().required(),
  html: Joi.string().required()
});

export const MailTemplateSchema = Joi.object({
  to: Joi.string().required(),
  subject: Joi.string().required(),
  name: Joi.string().required()
});
