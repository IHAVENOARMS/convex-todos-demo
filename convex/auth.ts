import { convexAuth, getAuthUserId } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";
import { query } from "./_generated/server";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Password],
});

export const getUserInfo = query({
  args: {},
  handler: async (ctx) => {
    const identity = ctx.auth.getUserIdentity();
    if (!identity) return undefined;
    const userId = await getAuthUserId(ctx);
    if (!userId) return undefined;
    const user = await ctx.db.get(userId);
    return { email: user?.email, _id: user?._id };
  },
});
