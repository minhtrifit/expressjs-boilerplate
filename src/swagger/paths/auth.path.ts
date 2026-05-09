import { LoginSchema, RegisterSchema } from '../schemas/auth.schema';

export const authPaths = {
  '/api/auth/register': {
    post: {
      tags: ['Auth'],

      summary: 'Register',

      requestBody: {
        required: true,

        content: {
          'application/json': {
            schema: RegisterSchema
          }
        }
      },

      responses: {
        201: {
          description: 'Success'
        }
      }
    }
  },

  '/api/auth/login': {
    post: {
      tags: ['Auth'],

      summary: 'Login',

      requestBody: {
        required: true,

        content: {
          'application/json': {
            schema: LoginSchema
          }
        }
      },

      responses: {
        200: {
          description: 'Success'
        }
      }
    }
  }
};
