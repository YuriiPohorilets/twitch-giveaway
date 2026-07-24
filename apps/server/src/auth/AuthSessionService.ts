import { GiveawaySession } from "../features/giveaway/GiveawaySession.js";
import { TwitchChatClient } from "../core/twitch/TwitchChatClient.js";

export class AuthSessionService {
  constructor(
    private readonly giveaway: GiveawaySession,
    private readonly twitch: TwitchChatClient
  ) {}

  public async logout(): Promise<void> {
    await this.twitch.partChannel();

    this.giveaway.reset();
  }
}
