import Fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';

export function buildApp() {
  const isProd = process.env.NODE_ENV === 'production';
  const logger = isProd
    ? true
    : {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname'
          }
        }
      } as const;

  const app = Fastify({ logger });

  // Swagger/OpenAPI
  app.register(swagger, {
    openapi: {
      info: {
        title: 'ShopNexus API',
        version: '1.0.0',
      },
      servers: [{ url: '/' }],
    },
  });
  app.register(swaggerUI, {
    routePrefix: '/docs',
  });

  // Healthcheck
  app.get('/health', {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            status: { type: 'string' },
            uptime: { type: 'number' },
          },
        },
      },
    },
  }, async () => {
    return { status: 'ok', uptime: process.uptime() };
  });

  return app;
}
