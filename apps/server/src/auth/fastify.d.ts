import "fastify";

import type { AuthUser } from "../types/AuthUser.js";

declare module "fastify" {
  interface FastifyRequest {
    user: AuthUser | null;
  }
}
