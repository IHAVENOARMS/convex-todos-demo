import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { produce } from "immer";

export const useAddTodo = () => {
  const userInfo = useQuery(api.auth.getUserInfo);

  return useMutation(api.todos.addTodo).withOptimisticUpdate(
    (localStore, args) => {
      const todoQueries = localStore.getAllQueries(api.todos.getTodos);
      if (todoQueries.length === 0) return;
      for (const todoQuery of todoQueries) {
        const todos = todoQuery.value;
        const newState = produce(todos, (state) => {
          if (!state) return;
          state.push({
            ...args.todo,
            _creationTime: Date.now(),
            completedAt: null,
            _id: crypto.randomUUID() as Id<"todos">,
            userId: userInfo?._id ?? ("" as Id<"users">),
          });
        });
        localStore.setQuery(api.todos.getTodos, todoQuery.args, newState);
      }
    },
  );
};
