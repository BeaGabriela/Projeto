const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Pizzaria',
      version: '1.0.0',
      description: 'Documentação da API da pizzaria',
    },
  },
  apis: ['./src/Routes/*.js'],  // Caminho até suas rotas (ajuste conforme sua pasta)
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = swaggerDocs;
