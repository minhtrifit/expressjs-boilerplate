import { MultiSchema, SingleSchema } from '../schemas/upload.schema';

export const uploadPaths = {
  '/api/upload/single': {
    post: {
      tags: ['Upload'],

      summary: 'Single file upload',

      security: [
        {
          bearerAuth: []
        }
      ],

      requestBody: {
        required: true,

        content: {
          'multipart/form-data': {
            schema: SingleSchema
          }
        }
      },

      responses: {
        200: {
          description: 'Success'
        },
        400: {
          description: 'Bad request'
        }
      }
    }
  },

  '/api/upload/multiple': {
    post: {
      tags: ['Upload'],

      summary: 'Multiple file upload',

      security: [
        {
          bearerAuth: []
        }
      ],

      requestBody: {
        required: true,

        content: {
          'multipart/form-data': {
            schema: MultiSchema
          }
        }
      },

      responses: {
        200: {
          description: 'Success'
        },
        400: {
          description: 'Bad request'
        }
      }
    }
  }
};
