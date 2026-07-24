import { ChatMessage } from "../../core/chat/ChatMessage.js";
import { MessageHandler } from "../../core/chat/MessageHandler.js";
import { GiveawayEvent } from "./GiveawayEvent.js";
import { GiveawayEventListener } from "./GiveawayEventListener.js";
import { GiveawaySnapshot } from "./GiveawaySnapshot.js";

import { GiveawayState } from "./GiveawayState.js";
import { Participant } from "./Participant.js";

export class GiveawaySession implements MessageHandler {
  private _state = GiveawayState.Idle;
  private _keyword = "";
  private _ownerId: string | null = null;

  private readonly participants = new Map<string, number>();
  private readonly users: Participant[] = [];
  private winners: Participant[] = [];
  private readonly usedWinnerIds = new Set<string>();
  private readonly listeners = new Set<GiveawayEventListener>();

  private emit(event: GiveawayEvent): void {
    for (const listener of this.listeners) {
      listener.onGiveawayEvent(event);
    }
  }

  public get state(): GiveawayState {
    return this._state;
  }

  public get keyword(): string {
    return this._keyword;
  }

  public get participantCount(): number {
    return this.users.length;
  }

  public get ownerId(): string | null {
    return this._ownerId;
  }

  public getSnapshot(): GiveawaySnapshot {
    return {
      state: this.state,
      keyword: this.keyword,
      participants: this.participantCount,
      winners: this.winners,
    };
  }

  public subscribe(listener: GiveawayEventListener): void {
    this.listeners.add(listener);
  }

  public handle(message: ChatMessage): void {
    if (this.state !== GiveawayState.Running) {
      return;
    }

    if (message.normalizedMessage !== this._keyword) {
      return;
    }

    if (this.participants.has(message.userId)) {
      return;
    }

    const participant: Participant = {
      userId: message.userId,
      username: message.username,
      displayName: message.displayName,
    };

    this.participants.set(message.userId, this.users.length);
    this.users.push(participant);

    this.emit({
      type: "participant_joined",
      data: {
        userId: participant.userId,
        username: participant.username,
        displayName: participant.displayName,
        participants: this.users.length,
      },
    });
  }

  public start(keyword: string, ownerId: string): boolean {
    if (this.ownerId && this.ownerId !== ownerId) {
      return false;
    }

    this.reset();

    this._ownerId = ownerId;

    this._keyword = keyword.trim().toLowerCase();
    this._state = GiveawayState.Running;

    this.emit({
      type: "giveaway_started",
      data: {
        keyword: this._keyword,
      },
    });

    return true;
  }

  public stop(): void {
    this._state = GiveawayState.Finished;

    this.emit({
      type: "giveaway_stopped",
    });
  }

  public reset(): void {
    this.participants.clear();
    this.users.length = 0;
    this.winners = [];
    this.usedWinnerIds.clear();

    this._ownerId = null;
    this._keyword = "";
    this._state = GiveawayState.Idle;

    this.emit({ type: "giveaway_reset" });
  }

  public getParticipants(): readonly Participant[] {
    return this.users;
  }

  public rerollWinner(userId: string): Participant | null {
    const winnerIndex = this.winners.findIndex(winner => winner.userId === userId);

    if (winnerIndex === -1) {
      return null;
    }

    const pool = this.users.filter(participant => !this.usedWinnerIds.has(participant.userId));

    if (pool.length === 0) {
      return null;
    }

    const replacement = pool[Math.floor(Math.random() * pool.length)];

    const oldWinner = this.winners[winnerIndex];

    this.winners[winnerIndex] = replacement;
    this.usedWinnerIds.add(replacement.userId);

    this.emit({
      type: "winner_rerolled",
      data: {
        oldWinner,
        newWinner: replacement,
      },
    });

    return replacement;
  }

  public pickWinners(count: number): Participant[] {
    if (this.users.length === 0) {
      return [];
    }

    count = Math.max(1, Math.min(count, 12, this.users.length));

    const pool = [...this.users];

    for (let i = 0; i < count; i++) {
      const j = i + Math.floor(Math.random() * (pool.length - i));

      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    this.winners = pool.slice(0, count);

    for (const winner of this.winners) {
      this.usedWinnerIds.add(winner.userId);
    }

    this.emit({
      type: "winners_selected",
      data: this.winners,
    });

    return this.winners;
  }
}
