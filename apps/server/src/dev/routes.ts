import { FastifyInstance } from "fastify";
import { z } from "zod";

import { Container } from "../core/container/Container.js";
import { ChatSimulator } from "./ChatSimulator.js";

const StartSimulationSchema = z.object({
  activeUsers: z.number().int().min(1).max(100_000),
  messagesPerSecond: z.number().min(1).max(20_000),
  durationSeconds: z.number().int().min(1).max(600),
  keyword: z.string().trim().min(1),
  keywordChance: z.number().min(0).max(1),
});

export async function registerDevRoutes(app: FastifyInstance, container: Container): Promise<void> {
  const simulator = new ChatSimulator(container.chat.dispatcher);

  app.post("/dev/simulate/start", async (request, reply) => {
    const options = StartSimulationSchema.parse(request.body);

    if (simulator.isRunning) {
      return reply.status(409).send({
        error: "Simulation is already running",
      });
    }

    void simulator.start(options).catch(error => {
      console.error("[Simulator] Failed:", error);
    });

    return {
      success: true,
      options,
    };
  });

  app.post("/dev/simulate/stop", async () => {
    simulator.stop();

    return {
      success: true,
    };
  });

  app.get("/dev/simulate/status", async () => ({
    running: simulator.isRunning,
  }));
}
