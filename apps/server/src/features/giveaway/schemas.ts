import { z } from "zod";

export const StartGiveawaySchema = z.object({
  keyword: z.string().trim().min(1, "Keyword is required").max(50, "Keyword is too long"),
});

export type StartGiveawayDto = z.infer<typeof StartGiveawaySchema>;

export const PickWinnersSchema = z.object({
  count: z.number().int().min(1).max(12),
});

export const RerollWinnerSchema = z.object({
  userId: z.string().min(1),
});
