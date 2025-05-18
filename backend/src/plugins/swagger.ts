import fp from "fastify-plugin";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";

export default fp(async (fastify) => {
  await fastify.register(swagger, {
    openapi: {
      openapi: "3.0.0",
      info: {
        title: "Ecoward",
        description: "API documentation",
        version: "1.0.0",
      },
      tags: [
        { name: "Auth", description: "Authentication routes" },
        { name: "Token", description: "Token routes" },
        { name: "Trashbin", description: "Trashbin routes" },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
            description:
              'JWT Authorization header using the Bearer scheme. Example: "Authorization: Bearer {token}"',
          },
        },
      },
      security: [{ bearerAuth: [] }],
    },
  });

  await fastify.register(swaggerUI, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
      deepLinking: false,
    },
    staticCSP: true,
  });
});
