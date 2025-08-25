import * as UserPreferences from "./models/userpreferences";
import * as Auth from "./models/auth";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getUserPreferences = query({
  args: {},
  handler: async (ctx) => {
    const defaultPreferences = { theme: "system" };
    try {
      const userId = await Auth.assertUserIsLoggedIn(ctx);
      const preferences = await UserPreferences.getUserPreferences(ctx, userId);
      return preferences ? { theme: preferences.theme } : defaultPreferences;
    } catch (exc) {
      return null;
    }
  },
});

export const saveUserPreferences = mutation({
  args: {
    preferences: v.object({
      theme: v.union(
        v.literal("light"),
        v.literal("dark"),
        v.literal("system"),
      ),
    }),
  },
  handler: async (ctx, args) => {
    const userId = await Auth.assertUserIsLoggedIn(ctx);
    const preferences = await UserPreferences.getUserPreferences(ctx, userId);

    if (!preferences) {
      await ctx.db.insert("userPreferences", {
        ...args.preferences,
        userId,
      });
      return;
    }

    await ctx.db.patch(preferences._id, {
      ...args.preferences,
    });
  },
});
