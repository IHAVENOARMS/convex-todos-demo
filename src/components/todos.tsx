import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { SortingControls } from "@/components/sorting-controls";
import { useAddTodo } from "@/hooks/todos/use-add-todo";
import { useToggleTodoCompleted } from "@/hooks/todos/use-toggle-todo-completed";

const priorityMapper = ["low", "medium", "high"];

function TodoSkeleton() {
  return (
    <div className="flex items-center justify-between p-3 bg-white dark:bg-neutral-800 rounded-lg border border-orange-200 dark:border-orange-700/30">
      <div className="flex-1">
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <Skeleton className="h-6 w-16 rounded-full" />
    </div>
  );
}

export function Todos() {
  const addTodo = useAddTodo();
  const toggleTodoCompleted = useToggleTodoCompleted();

  const [newTodoText, setNewTodoText] = useState("");
  const [newTodoPriority, setNewTodoPriority] = useState<0 | 1 | 2>(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sortBy, setSortBy] = useState<"date" | "name" | "priority">("date");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const todos = useQuery(api.todos.getTodos, { sortBy, order });
  const completedTodos = todos
    ? todos.filter((t) => !!t.completedAt)
    : undefined;
  const uncompletedTodos = todos
    ? todos.filter((t) => !t.completedAt)
    : undefined;
  const isPending = todos === undefined;

  const handleAddTodo = () => {
    if (newTodoText.trim()) {
      void addTodo({ todo: { name: newTodoText, priority: newTodoPriority } });
      setNewTodoText("");
      setNewTodoPriority(1);
      setIsDialogOpen(false);
    }
  };

  const handleCancel = () => {
    setNewTodoText("");
    setNewTodoPriority(1);
    setIsDialogOpen(false);
  };

  const handleToggleTodoCompleted = (todoId: Id<"todos">) => {
    void toggleTodoCompleted({ todoId });
  };

  return (
    <div className="flex flex-row justify-center items-start w-full h-full p-6">
      <div className="flex flex-row justify-start items-stretch w-full h-full max-w-[70%] gap-7">
        <Card className="flex-1 flex flex-col">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-xl font-bold text-orange-600">
              Todos
            </CardTitle>
            <div className="flex items-center gap-3">
              <SortingControls
                sortBy={sortBy}
                order={order}
                onSortByChange={(n) =>
                  setSortBy(n as "name" | "date" | "priority")
                }
                onOrderToggle={setOrder}
              />
              <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="w-10 h-10 rounded-full bg-orange-500/20 hover:bg-orange-500/30 text-orange-600 border border-orange-500/30"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Add New Todo</AlertDialogTitle>
                    <AlertDialogDescription>
                      Create a new todo item with a title and priority level.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="todo-text"
                        className="text-sm font-medium text-neutral-900 dark:text-neutral-100"
                      >
                        Todo Text
                      </label>
                      <Input
                        id="todo-text"
                        type="text"
                        placeholder="Enter todo text..."
                        value={newTodoText}
                        onChange={(e) => setNewTodoText(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleAddTodo()}
                        className="bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="todo-priority"
                        className="text-sm font-medium text-neutral-900 dark:text-neutral-100"
                      >
                        Priority
                      </label>
                      <Select
                        value={String(newTodoPriority)}
                        onValueChange={(n) =>
                          setNewTodoPriority(Number(n) as 0 | 1 | 2)
                        }
                      >
                        <SelectTrigger className="w-full bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={"0"}>Low Priority</SelectItem>
                          <SelectItem value="1">Medium Priority</SelectItem>
                          <SelectItem value="2">High Priority</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleCancel}>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleAddTodo}>
                      Add Todo
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto">
            <div className="space-y-3">
              {isPending ? (
                // Show skeleton loading states
                <>
                  <TodoSkeleton />
                  <TodoSkeleton />
                  <TodoSkeleton />
                  <TodoSkeleton />
                  <TodoSkeleton />
                </>
              ) : (
                // Show actual todos
                <>
                  {uncompletedTodos &&
                    uncompletedTodos.map((todo) => (
                      <div
                        key={todo._id}
                        className="group flex items-center justify-between p-3 bg-white dark:bg-neutral-800 rounded-lg border border-orange-200 dark:border-orange-700/30 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
                        onClick={() => handleToggleTodoCompleted(todo._id)}
                      >
                        <span className="relative text-neutral-800 dark:text-neutral-200">
                          {todo.name}
                          <span className="absolute left-0 top-[50%] w-0 h-[1px] bg-neutral-800 dark:bg-neutral-200 transition-[width] duration-500 group-hover:w-full" />
                        </span>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            todo.priority === 2
                              ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                              : todo.priority === 1
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                                : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                          }`}
                        >
                          {priorityMapper[todo.priority]}
                        </span>
                      </div>
                    ))}
                  {todos && todos.length === 0 && (
                    <p className="text-neutral-800 dark:text-neutral-200">
                      You still don't have any todos, press the plus button to
                      add one
                    </p>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1 flex flex-col">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-orange-600">
              Done
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto">
            <div className="space-y-3">
              {isPending ? (
                // Show skeleton loading states for completed todos
                <>
                  <TodoSkeleton />
                  <TodoSkeleton />
                </>
              ) : (
                // Show actual completed todos
                <>
                  {completedTodos &&
                    completedTodos.map((todo) => (
                      <div
                        key={todo._id}
                        className="group flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-orange-200 dark:border-orange-700/30 cursor-pointer hover:bg-white dark:hover:bg-neutral-700"
                        onClick={() => handleToggleTodoCompleted(todo._id)}
                      >
                        <span className="relative text-neutral-800 dark:text-neutral-200">
                          {todo.name}
                          <span className="absolute left-0 top-[50%] w-full h-[1px] bg-neutral-800 dark:bg-neutral-200 transition-[width] duration-500 group-hover:w-0" />
                        </span>
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">
                          {todo.completedAt &&
                            new Date(todo.completedAt).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  {completedTodos && completedTodos.length === 0 && (
                    <p className="text-neutral-800 dark:text-neutral-200">
                      Your completed todos will show up here
                    </p>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
