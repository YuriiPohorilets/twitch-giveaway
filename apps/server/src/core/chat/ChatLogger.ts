import type { ChatMessage } from "./ChatMessage.js";
import type { MessageHandler } from "./MessageHandler.js";

export class ChatLogger implements MessageHandler {
  public handle(message: ChatMessage): void {
    console.log(message);
  }
}
