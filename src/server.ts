import { buildApp } from './app.js';
import { ENV } from './env.js';

const app = buildApp();

app.listen({ port: ENV.PORT, host: '0.0.0.0' })
  .then(() => {
  // Use Fastify/pino logger (pino-pretty configured in development) for nice human-readable output
  app.log.info(`ShopNexus API up on http://localhost:${ENV.PORT}`);
  app.log.info(`Swagger at          http://localhost:${ENV.PORT}/docs`);
  app.log.info(`Health check at     http://localhost:${ENV.PORT}/health`);
  })
  .catch((err) => {
    app.log.error(err);
    process.exit(1);
  });
