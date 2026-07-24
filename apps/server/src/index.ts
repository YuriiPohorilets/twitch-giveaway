import { Container } from "./core/container/Container.js";
import { env } from "./core/config/index.js";
import { createApp } from "./server/app.js";
import { registerRoutes } from "./server/routes.js";
import { registerWebSocketRoutes } from "./core/websocket/routes.js";

async function bootstrap() {
  const app = await createApp();

  const container = new Container();

  container.initialize();

  await registerRoutes(app, container);

  await registerWebSocketRoutes(app, container);

  if (env.twitch.bot.accessToken && env.twitch.bot.refreshToken) {
    await container.chat.twitch.connect();
  }

  await app.listen({
    host: "0.0.0.0",
    port: env.port,
  });
}

bootstrap().catch(error => {
  console.error(error);
  process.exit(1);
});
