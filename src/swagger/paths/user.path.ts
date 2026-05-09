import { CreateSchema, UpdateSchema } from '../schemas/user.schema';

export const userPaths = {
  '/api/users': {
    get: {
      tags: ['Users'],

      summary: 'Get users',

      security: [
        {
          bearerAuth: []
        }
      ],

      parameters: [
        {
          in: 'query',
          name: 'page',

          schema: {
            type: 'number',
            example: 1
          }
        },

        {
          in: 'query',
          name: 'limit',

          schema: {
            type: 'number',
            example: 10
          }
        },

        {
          in: 'query',
          name: 'q',

          schema: {
            type: 'string',
            example: ''
          }
        },

        {
          in: 'query',
          name: 'isActive',

          schema: {
            type: 'boolean',
            example: true
          }
        }
      ],

      responses: {
        200: {
          description: 'Success'
        }
      }
    }
  },

  '/api/users/{id}': {
    get: {
      tags: ['Users'],

      summary: 'Get detail user',

      security: [
        {
          bearerAuth: []
        }
      ],

      parameters: [
        {
          in: 'path',

          name: 'id',

          required: true,

          schema: {
            type: 'string',
            example: ''
          }
        }
      ],

      responses: {
        200: {
          description: 'Success'
        },

        404: {
          description: 'User not found'
        },

        401: {
          description: 'Unauthorized'
        }
      }
    }
  },

  '/api/users/': {
    post: {
      tags: ['Users'],

      summary: 'Create user',

      security: [
        {
          bearerAuth: []
        }
      ],

      requestBody: {
        required: true,

        content: {
          'application/json': {
            schema: CreateSchema
          }
        }
      },

      responses: {
        201: {
          description: 'Success'
        },
        400: {
          description: 'Bad request'
        }
      }
    }
  },

  '/api/users/{id}/': {
    patch: {
      tags: ['Users'],

      summary: 'Update user',

      security: [
        {
          bearerAuth: []
        }
      ],

      parameters: [
        {
          in: 'path',

          name: 'id',

          required: true,

          schema: {
            type: 'string',
            example: ''
          }
        }
      ],

      requestBody: {
        required: true,

        content: {
          'application/json': {
            schema: UpdateSchema
          }
        }
      },

      responses: {
        200: {
          description: 'Success'
        },
        404: {
          description: 'User not found'
        },
        400: {
          description: 'Bad request'
        }
      }
    }
  }
};
