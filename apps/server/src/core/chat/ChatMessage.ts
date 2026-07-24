export interface ChatMessage {
  readonly channel: string;
  readonly userId: string;
  readonly username: string;
  readonly displayName: string;

  readonly rawMessage: string;
  readonly normalizedMessage: string;

  readonly timestamp: number;
}
