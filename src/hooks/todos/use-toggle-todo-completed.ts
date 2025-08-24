import { produce } from "immer";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export const useToggleTodoCompleted = () => {
  return useMutation(api.todos.toggleTodoCompleted).withOptimisticUpdate(
    (localStore, args) => {
      const todoQueries = localStore.getAllQueries(api.todos.getTodos);
      if (todoQueries.length === 0) return;
      for (const todoQuery of todoQueries) {
        const todos = todoQuery.value;
        const newState = produce(todos, (state) => {
          if (!state) return;
          const target = state.find((t) => t._id === args.todoId);
          if (!target) return;
          target.completedAt = target.completedAt ? null : Date.now();
        });
        localStore.setQuery(api.todos.getTodos, todoQuery.args, newState);
      }
    },
  );
};
