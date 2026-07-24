import { FastifyInstance } from "fastify";

import { Container } from "../core/container/Container.js";

import { registerAuthRoutes } from "../auth/routes.js";
import { registerGiveawayRoutes } from "../features/giveaway/routes.js";

export async function registerRoutes(app: FastifyInstance, container: Container) {
  app.get("/", async () => ({
    name: "Giveaway API",
    status: "ok",
  }));

  await registerAuthRoutes(app, container.auth.controller, container.auth.middleware);

  await registerGiveawayRoutes(
    app,
    container.giveaway.session,
    container.chat.twitch,
    container.auth.middleware,
    container.auth.authorization
  );
}
