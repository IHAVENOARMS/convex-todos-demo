import { QueryCtx } from "../_generated/server";
import { Id } from "../_generated/dataModel";

export const getUserPreferences = async (
  ctx: Pick<QueryCtx, "db" | "auth">,
  userId: Id<"users">,
) => {
  const preferences = await ctx.db
    .query("userPreferences")
    .withIndex("by_user", (q) => q.eq("userId", userId))
    .unique();

  return preferences;
};
