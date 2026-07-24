import { FastifyRequest } from "fastify";

export type OAuthFlow = "streamer" | "bot";

export interface AuthUser {
  userId: string;
  login: string;
  displayName: string;
}

export interface OAuthState {
  flow: OAuthFlow;
}

export interface OAuthTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  scope: string[];
  token_type: "bearer";
}

export interface LoginQuery {
  flow?: OAuthFlow;
}

export interface CallbackQuery {
  code?: string;
  state?: string;
}

export type LoginRequest = FastifyRequest<{
  Querystring: LoginQuery;
}>;

export type CallbackRequest = FastifyRequest<{
  Querystring: CallbackQuery;
}>;
