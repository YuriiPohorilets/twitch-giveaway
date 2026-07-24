function getEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

function getOptionalEnv(name: string): string | undefined {
  return process.env[name];
}

export const env = {
  port: Number(process.env.PORT ?? 3000),

  app: {
    url: getEnv("APP_URL"),
    clientUrl: getEnv("CLIENT_URL"),
  },

  jwt: {
    secret: getEnv("JWT_SECRET"),
  },

  twitch: {
    clientId: getEnv("TWITCH_APP_CLIENT_ID"),
    clientSecret: getEnv("TWITCH_APP_CLIENT_SECRET"),
    redirectUri: getEnv("TWITCH_REDIRECT_URI"),

    bot: {
      username: getEnv("TWITCH_BOT_USERNAME"),
      accessToken: getOptionalEnv("TWITCH_BOT_ACCESS_TOKEN"),
      refreshToken: getOptionalEnv("TWITCH_BOT_REFRESH_TOKEN"),
    },
  },
};
