import Fastify from "fastify";
import websocket from "@fastify/websocket";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";

export async function createApp() {
  const app = Fastify();

  await app.register(websocket);
  await app.register(cookie);

  await app.register(cors, {
    origin: true,
    credentials: true,
  });

  app.decorateRequest("user", null);

  return app;
}
