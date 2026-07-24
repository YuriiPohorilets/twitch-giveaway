import { env } from "../config/index.js";

import { MessageDispatcher } from "../chat/MessageDispatcher.js";
import { ChatLogger } from "../chat/ChatLogger.js";

import { TwitchChatClient } from "../twitch/TwitchChatClient.js";

import { WebSocketManager } from "../websocket/WebSocketManager.js";
import { GiveawayWebSocketBridge } from "../websocket/GiveawayWebSocketBridge.js";

import { GiveawaySession } from "../../features/giveaway/GiveawaySession.js";

import { TwitchOAuthService } from "../../auth/TwitchOAuthService.js";
import { TwitchApiService } from "../../auth/TwitchApiService.js";
import { AuthService } from "../../auth/AuthService.js";
import { AuthController } from "../../auth/AuthController.js";
import { JwtService } from "../../auth/JwtService.js";
import { AuthMiddleware } from "../../auth/AuthMiddleware.js";
import { AuthorizationMiddleware } from "../../auth/AuthorizationMiddleware.js";
import { AuthSessionService } from "../../auth/AuthSessionService.js";

export class Container {
  public readonly auth;
  public readonly giveaway;
  public readonly websocket;
  public readonly chat;

  constructor() {
    // Giveaway
    const session = new GiveawaySession();

    this.giveaway = {
      session,
    };

    // Chat
    const dispatcher = new MessageDispatcher();
    const logger = new ChatLogger();
    const twitch = new TwitchChatClient(dispatcher);

    this.chat = {
      dispatcher,
      logger,
      twitch,
    };

    // Auth session

    // Auth
    const oauth = new TwitchOAuthService(
      env.twitch.clientId,
      env.twitch.clientSecret,
      env.twitch.redirectUri
    );
    const api = new TwitchApiService(env.twitch.clientId);
    const jwt = new JwtService(env.jwt.secret);
    const middleware = new AuthMiddleware(jwt);
    const authorization = new AuthorizationMiddleware(session);
    const service = new AuthService(oauth, api, jwt);
    const authSession = new AuthSessionService(session, twitch);
    const controller = new AuthController(service, authSession);

    this.auth = {
      oauth,
      api,
      jwt,
      middleware,
      authorization,
      service,
      session: authSession,
      controller,
    };

    // WebSocket
    const manager = new WebSocketManager();
    const giveawayBridge = new GiveawayWebSocketBridge(manager);

    this.websocket = {
      manager,
      giveawayBridge,
    };
  }

  public initialize(): void {
    this.giveaway.session.subscribe(this.websocket.giveawayBridge);
    this.chat.dispatcher.subscribe(this.giveaway.session);

    if (process.env.NODE_ENV !== "production") {
      this.chat.dispatcher.subscribe(this.chat.logger);
    }
  }
}
