import { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "./AuthService.js";
import { CallbackRequest, LoginRequest } from "./types.js";
import { env } from "../core/config/index.js";
import { AuthSessionService } from "./AuthSessionService.js";

export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly sessionService: AuthSessionService
  ) {}

  public login = async (request: LoginRequest, reply: FastifyReply) => {
    const flow = request.query.flow ?? "streamer";

    return reply.redirect(this.authService.getAuthorizationUrl(flow));
  };

  public logout = async (_: FastifyRequest, reply: FastifyReply) => {
    await this.sessionService.logout();

    reply.clearCookie("access_token", {
      path: "/",
    });

    return {
      success: true,
    };
  };

  public me = async (request: FastifyRequest, reply: FastifyReply) => {
    if (!request.user) {
      return reply.status(401).send({
        error: "Unauthorized",
      });
    }

    return {
      userId: request.user.userId,
      login: request.user.login,
      displayName: request.user.displayName,
    };
  };

  public callback = async (request: CallbackRequest, reply: FastifyReply) => {
    const { code, state } = request.query;

    if (!code) {
      return reply.status(400).send({
        error: "Missing authorization code",
      });
    }

    if (!state) {
      return reply.status(400).send({
        error: "Missing state",
      });
    }

    const oauthState = this.authService.decodeState(state);

    if (oauthState.flow === "bot") {
      return this.authService.authorizeBot(code);
    }

    const result = await this.authService.authorizeStreamer(code);

    reply.setCookie("access_token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return reply.redirect(env.app.clientUrl);
  };
}
