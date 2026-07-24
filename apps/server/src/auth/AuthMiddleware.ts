import { FastifyReply, FastifyRequest } from "fastify";

import { JwtService } from "./JwtService.js";

export class AuthMiddleware {
  constructor(private readonly jwt: JwtService) {}

  public authenticate = async (request: FastifyRequest, reply: FastifyReply) => {
    const token = request.cookies.access_token;

    if (!token) {
      return reply.status(401).send({
        error: "Unauthorized",
      });
    }

    try {
      const payload = this.jwt.verify(token);

      request.user = payload;
    } catch {
      return reply.status(401).send({
        error: "Invalid token",
      });
    }
  };
}
