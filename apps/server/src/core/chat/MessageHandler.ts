import type { ChatMessage } from "./ChatMessage.js";

export interface MessageHandler {
  handle(message: ChatMessage): void | Promise<void>;
}
