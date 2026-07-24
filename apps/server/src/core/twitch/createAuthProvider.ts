import { RefreshingAuthProvider } from "@twurple/auth";
import { env } from "../config/index.js";

export async function createAuthProvider() {
  const authProvider = new RefreshingAuthProvider({
    clientId: env.twitch.clientId,
    clientSecret: env.twitch.clientSecret,
  });

  if (env.twitch.bot.accessToken && env.twitch.bot.refreshToken) {
    await authProvider.addUserForToken(
      {
        accessToken: env.twitch.bot.accessToken,
        refreshToken: env.twitch.bot.refreshToken,
        expiresIn: 0,
        obtainmentTimestamp: 0,
      },
      ["chat"]
    );
  }

  return authProvider;
}
