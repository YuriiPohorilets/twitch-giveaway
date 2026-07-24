import { OAuthState, OAuthTokens } from "./types.js";

interface AuthorizationOptions {
  scope?: string[];
  state?: string;
  forceVerify?: boolean;
}

export class TwitchOAuthService {
  constructor(
    protected readonly clientId: string,
    protected readonly clientSecret: string,
    protected readonly redirectUri: string
  ) {}

  public getAuthorizationUrl(options: AuthorizationOptions = {}): string {
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      response_type: "code",
    });

    if (options.scope?.length) {
      params.set("scope", options.scope.join(" "));
    }

    if (options.state) {
      params.set("state", options.state);
    }

    if (options.forceVerify) {
      params.set("force_verify", "true");
    }

    return `https://id.twitch.tv/oauth2/authorize?${params}`;
  }

  public encodeState(state: OAuthState): string {
    return Buffer.from(JSON.stringify(state)).toString("base64url");
  }

  public decodeState(state: string): OAuthState {
    return JSON.parse(Buffer.from(state, "base64url").toString("utf8")) as OAuthState;
  }

  public async exchangeCode(code: string): Promise<OAuthTokens> {
    const response = await fetch("https://id.twitch.tv/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code,
        grant_type: "authorization_code",
        redirect_uri: this.redirectUri,
      }),
    });

    if (!response.ok) {
      throw new Error(`OAuth failed: ${response.status}`);
    }

    return (await response.json()) as OAuthTokens;
  }
}
