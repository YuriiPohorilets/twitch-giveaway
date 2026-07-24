import { ChatClient } from "@twurple/chat";

import { createAuthProvider } from "./createAuthProvider.js";
import { MessageDispatcher } from "../chat/MessageDispatcher.js";

export class TwitchChatClient {
  private chatClient?: ChatClient;
  private currentChannel: string | null = null;

  constructor(private readonly dispatcher: MessageDispatcher) {}

  public async connect(): Promise<void> {
    if (this.chatClient) {
      return;
    }

    const authProvider = await createAuthProvider();

    this.chatClient = new ChatClient({
      authProvider,
    });

    this.chatClient.onJoin((channel, user) => {
      console.info(`[Twitch] ${user} joined ${channel}`);
    });

    this.chatClient.onJoinFailure((channel, reason) => {
      console.error(`[Twitch] Failed to join ${channel}:`, reason);
    });

    this.chatClient.onConnect(() => {
      console.info("[Twitch] Chat client connected");
    });

    this.chatClient.onMessage((channel, user, text, msg) => {
      this.dispatcher.dispatch({
        channel,
        userId: msg.userInfo.userId,
        username: user,
        displayName: msg.userInfo.displayName,
        rawMessage: text,
        normalizedMessage: text.trim().toLowerCase(),
        timestamp: Date.now(),
      });
    });

    await this.chatClient.connect();
  }

  public async joinChannel(channel: string): Promise<void> {
    if (!this.chatClient) {
      throw new Error("Twitch chat client is not connected");
    }

    const normalizedChannel = channel.trim().toLowerCase();

    console.log("[Twitch] Joining channel:", normalizedChannel);

    if (this.currentChannel === normalizedChannel) {
      return;
    }

    if (this.currentChannel) {
      await this.chatClient.part(this.currentChannel);
    }

    await this.chatClient.join(normalizedChannel);

    this.currentChannel = normalizedChannel;

    console.log("[Twitch] Listening to:", normalizedChannel);
  }

  public async partChannel(): Promise<void> {
    if (!this.chatClient || !this.currentChannel) {
      return;
    }

    await this.chatClient.part(this.currentChannel);

    console.log(`[Twitch] Parted ${this.currentChannel}`);

    this.currentChannel = null;
  }

  public async disconnect(): Promise<void> {
    await this.chatClient?.quit();

    this.chatClient = undefined;
    this.currentChannel = null;
  }
}
