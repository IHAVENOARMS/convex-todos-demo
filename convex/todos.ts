import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getTodos = query({
  args: {
    sortBy: v.optional(
      v.union(v.literal("date"), v.literal("priority"), v.literal("name")),
    ),
    order: v.optional(v.union(v.literal("asc"), v.literal("desc"))),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw Error("Unauthorized");
    }
    const index =
      args.sortBy === "date"
        ? "by_user"
        : args.sortBy === "priority"
          ? "by_user_priorty"
          : "by_user_name";

    const todos = await ctx.db
      .query("todos")
      .withIndex(index, (q) => q.eq("userId", userId))
      .order(args.order ?? "desc")
      .take(100);

    return todos;
  },
});

export const addTodo = mutation({
  args: {
    todo: v.object({
      name: v.string(),
      priority: v.union(v.literal(0), v.literal(1), v.literal(2)),
    }),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw Error("Unauthorized");
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_id", (q) => q.eq("_id", userId))
      .unique();

    console.log(user);

    if (!user) {
      throw Error("User not found in db");
    }

    await ctx.db.insert("todos", {
      ...args.todo,
      completedAt: null,
      userId: user._id,
    });
  },
});

export const toggleTodoCompleted = mutation({
  args: { todoId: v.id("todos") },
  handler: async (ctx, { todoId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw Error("Unauthorized");
    const todo = await ctx.db.get(todoId);
    if (!todo) throw Error("Todo doesn't exist");
    if (todo.userId !== userId) throw Error("Todo doesn't belong to you");

    await ctx.db.patch(todoId, {
      completedAt: todo.completedAt ? null : Date.now(),
    });
  },
});
