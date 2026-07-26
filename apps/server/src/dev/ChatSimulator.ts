import { MessageDispatcher } from "../core/chat/MessageDispatcher.js";
import type { SimulationOptions } from "./SimulationOptions.js";

export class ChatSimulator {
  private running = false;
  private timeout?: NodeJS.Timeout;

  constructor(private readonly dispatcher: MessageDispatcher) {}

  public get isRunning(): boolean {
    return this.running;
  }

  public send(userId: string, username: string, message: string): void {
    this.dispatcher.dispatch({
      channel: "simulator",
      userId,
      username,
      displayName: username,
      rawMessage: message,
      normalizedMessage: message.trim().toLowerCase(),
      timestamp: Date.now(),
    });
  }

  public async start(options: SimulationOptions): Promise<void> {
    if (this.running) {
      throw new Error("Simulation is already running");
    }

    this.running = true;

    const intervalMs = 100;
    const ticks = options.durationSeconds * 10;
    const messagesPerTick = options.messagesPerSecond / 10;

    try {
      for (let tick = 0; tick < ticks && this.running; tick++) {
        const count = Math.floor(messagesPerTick);
        const remainder = messagesPerTick - count;
        const currentCount = count + (Math.random() < remainder ? 1 : 0);

        for (let i = 0; i < currentCount; i++) {
          const userIndex = Math.floor(Math.random() * options.activeUsers);
          const username = `viewer_${userIndex}`;

          const text =
            Math.random() < options.keywordChance ? options.keyword : this.randomMessage();

          this.send(`user-${userIndex}`, username, text);
        }

        await this.wait(intervalMs);
      }
    } finally {
      this.running = false;
      this.timeout = undefined;
    }
  }

  public stop(): void {
    this.running = false;

    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }
  }

  private randomMessage(): string {
    const messages = ["hello chat", "nice stream", "good luck", "lets go", "wow", "gg"];

    return messages[Math.floor(Math.random() * messages.length)];
  }

  private wait(ms: number): Promise<void> {
    return new Promise(resolve => {
      this.timeout = setTimeout(resolve, ms);
    });
  }
}
