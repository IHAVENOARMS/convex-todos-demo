import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
// The schema provides more precise TypeScript types.
export default defineSchema({
  ...authTables,
  todos: defineTable({
    name: v.string(),
    priority: v.union(v.literal(0), v.literal(1), v.literal(2)),
    completedAt: v.union(v.number(), v.null()),
    userId: v.id("users"),
  })
    .index("by_user_priorty", ["userId", "priority"])
    .index("by_user_name", ["userId", "name"])
    .index("by_user", ["userId"]),
  userPreferences: defineTable({
    theme: v.union(v.literal("light"), v.literal("dark"), v.literal("system")),
    userId: v.id("users"),
  }).index("by_user", ["userId"]),
});
