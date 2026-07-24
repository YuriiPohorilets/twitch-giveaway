import { FastifyInstance } from "fastify";

import { AuthController } from "./AuthController.js";
import { AuthMiddleware } from "./AuthMiddleware.js";

export async function registerAuthRoutes(
  app: FastifyInstance,
  controller: AuthController,
  middleware: AuthMiddleware
): Promise<void> {
  app.get("/auth/twitch/login", controller.login);

  app.post("/auth/logout", controller.logout);

  app.get("/auth/twitch/callback", controller.callback);

  app.get("/auth/me", { preHandler: middleware.authenticate }, controller.me);
}
