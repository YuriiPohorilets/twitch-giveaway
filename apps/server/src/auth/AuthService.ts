import { TwitchApiService } from "./TwitchApiService.js";
import { TwitchOAuthService } from "./TwitchOAuthService.js";
import { JwtService } from "./JwtService.js";

export class AuthService {
  constructor(
    private readonly oauth: TwitchOAuthService,
    private readonly twitchApi: TwitchApiService,
    private readonly jwt: JwtService
  ) {}

  public getAuthorizationUrl(flow: "streamer" | "bot") {
    return this.oauth.getAuthorizationUrl({
      state: this.encodeState(flow),
      scope: flow === "bot" ? ["chat:read", "chat:edit"] : [],
      forceVerify: true,
    });
  }

  public encodeState(flow: "streamer" | "bot") {
    return this.oauth.encodeState({ flow });
  }

  public decodeState(state: string) {
    return this.oauth.decodeState(state);
  }

  public async authorizeStreamer(code: string) {
    const tokens = await this.oauth.exchangeCode(code);

    const user = await this.twitchApi.getCurrentUser(tokens.access_token);

    const token = this.jwt.sign({
      userId: user.id,
      login: user.login,
      displayName: user.display_name,
    });

    return {
      user,
      token,
    };
  }

  public async authorizeBot(code: string) {
    const tokens = await this.oauth.exchangeCode(code);

    if (process.env.NODE_ENV !== "production") {
      console.log(tokens);
    }

    return {
      success: true,
      message: "Bot authorized successfully.",
    };
  }
}
