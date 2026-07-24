import { WebSocket } from "ws";

export class WebSocketManager {
  private readonly clients = new Set<WebSocket>();

  public addClient(client: WebSocket): void {
    this.clients.add(client);
  }

  public removeClient(client: WebSocket): void {
    this.clients.delete(client);
  }

  public broadcast(message: unknown): void {
    const payload = JSON.stringify(message);

    for (const client of this.clients) {
      if (client.readyState === client.OPEN) {
        client.send(payload);
      }
    }
  }

  public get clientCount(): number {
    return this.clients.size;
  }
}
