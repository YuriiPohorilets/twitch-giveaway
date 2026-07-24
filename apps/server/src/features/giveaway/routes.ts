import { FastifyInstance } from "fastify";

import { AuthMiddleware } from "../../auth/AuthMiddleware.js";
import { GiveawaySession } from "./GiveawaySession.js";
import { PickWinnersSchema, RerollWinnerSchema, StartGiveawaySchema } from "./schemas.js";
import { AuthorizationMiddleware } from "../../auth/AuthorizationMiddleware.js";
import { TwitchChatClient } from "../../core/twitch/TwitchChatClient.js";

export async function registerGiveawayRoutes(
  app: FastifyInstance,
  giveaway: GiveawaySession,
  twitchChatClient: TwitchChatClient,
  authMiddleware: AuthMiddleware,
  authorizationMiddleware: AuthorizationMiddleware
): Promise<void> {
  app.get("/giveaway", async () => {
    return giveaway.getSnapshot();
  });

  app.get("/giveaway/participants", async () => {
    return giveaway.getParticipants();
  });

  app.post<{ Body: { keyword: string } }>(
    "/giveaway/start",
    {
      preHandler: [authMiddleware.authenticate, authorizationMiddleware.requireGiveawayOwner],
    },
    async (request, reply) => {
      const body = StartGiveawaySchema.parse(request.body);

      const started = giveaway.start(body.keyword, request.user!.userId);

      if (!started) {
        return reply.status(409).send({
          error: "Giveaway is already controlled by another streamer",
        });
      }

      await twitchChatClient.joinChannel(request.user!.login);

      return {
        success: true,
      };
    }
  );

  app.post(
    "/giveaway/stop",
    { preHandler: [authMiddleware.authenticate, authorizationMiddleware.requireGiveawayOwner] },
    async () => {
      giveaway.stop();

      return { success: true };
    }
  );

  app.post(
    "/giveaway/reset",
    { preHandler: [authMiddleware.authenticate, authorizationMiddleware.requireGiveawayOwner] },
    async () => {
      giveaway.reset();

      return { success: true };
    }
  );

  app.post<{ Body: { count: number } }>(
    "/giveaway/winners",
    {
      preHandler: [authMiddleware.authenticate, authorizationMiddleware.requireGiveawayOwner],
    },
    async (request, reply) => {
      const { count } = PickWinnersSchema.parse(request.body);

      const winners = giveaway.pickWinners(count);

      if (winners.length === 0) {
        return reply.status(404).send({
          message: "No participants found",
        });
      }

      return winners;
    }
  );

  app.post<{ Body: { userId: string } }>(
    "/giveaway/winners/reroll",
    {
      preHandler: [authMiddleware.authenticate, authorizationMiddleware.requireGiveawayOwner],
    },
    async (request, reply) => {
      const { userId } = RerollWinnerSchema.parse(request.body);

      const result = giveaway.rerollWinner(userId);

      if (!result) {
        return reply.status(409).send({
          message: "No eligible participants left for reroll.",
        });
      }

      return result;
    }
  );
}
