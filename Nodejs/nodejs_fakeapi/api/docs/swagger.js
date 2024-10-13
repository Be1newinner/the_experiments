const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Product API",
      version: "1.0.0",
      description: "API for managing products",
      contact: {
        name: "API Support",
        url: "https://fake-api.shipsar.in",
        email: "be1newinner@gmail.com",
      },
      servers: [
        {
          url: "https://fake-api.shipsar.in",
          description: "Shipsar server",
        },
      ],
    },
  },
  apis: ["./api/index.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
  app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
