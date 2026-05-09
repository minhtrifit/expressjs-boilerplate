import swaggerJsdoc from 'swagger-jsdoc';
import { paths } from './paths';

const BASE_URL = process.env.BASE_URL;

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',

    info: {
      title: 'Express Boilerplate API',
      version: '1.0.0',
      description: 'API Documentation'
    },

    servers: [
      {
        url: BASE_URL
      }
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },

    paths: paths
  },

  apis: []
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
