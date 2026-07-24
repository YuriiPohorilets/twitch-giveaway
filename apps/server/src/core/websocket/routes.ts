import { FastifyInstance } from "fastify";
import { Container } from "../container/Container.js";

export async function registerWebSocketRoutes(
  app: FastifyInstance,
  container: Container
): Promise<void> {
  app.get("/ws", { websocket: true }, socket => {
    container.websocket.manager.addClient(socket);

    console.info(
      `[WebSocket] Client connected. Clients: ${container.websocket.manager.clientCount}`
    );

    socket.send(
      JSON.stringify({
        type: "giveaway_state",
        data: container.giveaway.session.getSnapshot(),
      })
    );

    socket.on("close", () => {
      container.websocket.manager.removeClient(socket);

      console.info(
        `[WebSocket] Client disconnected. Clients: ${container.websocket.manager.clientCount}`
      );
    });
  });
}
