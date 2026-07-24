import { FastifyReply, FastifyRequest } from "fastify";

import { GiveawaySession } from "../features/giveaway/GiveawaySession.js";

export class AuthorizationMiddleware {
  constructor(private readonly giveaway: GiveawaySession) {}

  public requireGiveawayOwner = async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> => {
    if (!request.user) {
      return reply.status(401).send({
        error: "Unauthorized",
      });
    }

    const ownerId = this.giveaway.ownerId;

    if (ownerId !== null && ownerId !== request.user.userId) {
      return reply.status(403).send({
        error: "You do not own this giveaway",
      });
    }
  };
}
