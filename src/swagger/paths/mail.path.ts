import { MailSchema, MailTemplateSchema } from '../schemas/mail.schema';

export const mailPaths = {
  '/api/mail/send-example': {
    post: {
      tags: ['Email'],

      summary: 'Send example email',

      security: [
        {
          bearerAuth: []
        }
      ],

      requestBody: {
        required: true,

        content: {
          'application/json': {
            schema: MailSchema
          }
        }
      },

      responses: {
        200: {
          description: 'Success'
        },
        400: {
          description: 'Bad request'
        },
        401: {
          description: 'Unauthorized'
        }
      }
    }
  },

  '/api/mail/send-template': {
    post: {
      tags: ['Email'],

      summary: 'Send email temlate',

      security: [
        {
          bearerAuth: []
        }
      ],

      requestBody: {
        required: true,

        content: {
          'application/json': {
            schema: MailTemplateSchema
          }
        }
      },

      responses: {
        200: {
          description: 'Success'
        },
        400: {
          description: 'Bad request'
        },
        401: {
          description: 'Unauthorized'
        }
      }
    }
  }
};
