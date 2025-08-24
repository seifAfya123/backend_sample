import swaggerJSDoc, { Options } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Project documentation',
      version: '1.1.0',
      description: 'API documentation using Swagger for simple backend project',
    },
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
