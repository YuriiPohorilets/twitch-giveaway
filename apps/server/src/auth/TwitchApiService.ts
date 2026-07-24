export interface TwitchUser {
  id: string;
  login: string;
  display_name: string;
  profile_image_url: string;
}

export class TwitchApiService {
  constructor(private readonly clientId: string) {}

  public async getCurrentUser(accessToken: string): Promise<TwitchUser> {
    const response = await fetch("https://api.twitch.tv/helix/users", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Client-Id": this.clientId,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Twitch user (${response.status})`);
    }

    const body = (await response.json()) as {
      data: TwitchUser[];
    };

    if (body.data.length === 0) {
      throw new Error("Authenticated Twitch user not found.");
    }

    return body.data[0];
  }
}
