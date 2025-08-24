import { getAuthUserId } from "@convex-dev/auth/server";
import { QueryCtx } from "../_generated/server";

export const assertUserIsLoggedIn = async (ctx: Pick<QueryCtx, "auth">) => {
  const userId = await getAuthUserId(ctx);
  if (!userId) throw Error("Unauthorized");
  return userId;
};
