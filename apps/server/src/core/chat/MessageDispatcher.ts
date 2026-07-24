import type { ChatMessage } from "./ChatMessage.js";
import type { MessageHandler } from "./MessageHandler.js";

export class MessageDispatcher {
  private readonly handlers: MessageHandler[] = [];

  public subscribe(handler: MessageHandler): void {
    this.handlers.push(handler);
  }

  public dispatch(message: ChatMessage): void {
    for (const handler of this.handlers) {
      void handler.handle(message);
    }
  }
}
