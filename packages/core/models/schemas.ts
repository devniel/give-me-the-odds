import { z } from "zod";

/**
 * Schemas based on `Empire` type,
 * targeted to be used with `zod` in client projects
 */

export const BountyHunterSchema = z.object({
  planet: z.string().min(1, "Planet cannot be empty"),
  day: z.number(),
});

export const EmpireSchema = z.object({
  countdown: z.number(),
  bounty_hunters: z.array(BountyHunterSchema),
});
