import { request } from "@/lib/http";
import type { GiveawaySnapshot } from "@/types/giveaway";

export interface AuthUser {
  userId: string;
  login: string;
  displayName: string;
}

export function getCurrentUser() {
  return request<AuthUser>("/auth/me");
}

export interface Participant {
  userId: string;
  username: string;
  displayName: string;
}

export async function startGiveaway(keyword: string) {
  return request("/giveaway/start", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ keyword }),
  });
}

export async function stopGiveaway() {
  return request("/giveaway/stop", {
    method: "POST",
  });
}

export async function resetGiveaway() {
  localStorage.removeItem("keyword");
  return request("/giveaway/reset", {
    method: "POST",
  });
}

export async function getParticipants(): Promise<Participant[]> {
  return request<Participant[]>("/giveaway/participants", {
    method: "GET",
  });
}

export async function pickWinners(count: number) {
  return request("/giveaway/winners", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ count }),
  });
}

export async function getGiveaway(): Promise<GiveawaySnapshot> {
  return request<GiveawaySnapshot>("/giveaway");
}

export async function rerollWinner(userId: string) {
  return request<{
    oldWinner: Participant;
    newWinner: Participant;
  }>("/giveaway/winners/reroll", {
    method: "POST",
    body: JSON.stringify({ userId }),
  });
}

export async function logout() {
  return request("/auth/logout", {
    method: "POST",
  });
}
