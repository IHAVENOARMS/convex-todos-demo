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
import { useState } from "react";

interface AddTodoFormProps {
    onAddTodo: (text: string, priority: string) => void;
}

export function AddTodoForm({ onAddTodo }: AddTodoFormProps) {
    const [newTodoText, setNewTodoText] = useState("");
    const [newTodoPriority, setNewTodoPriority] = useState("medium");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleAddTodo = () => {
        if (newTodoText.trim()) {
            onAddTodo(newTodoText, newTodoPriority);
            setNewTodoText("");
            setNewTodoPriority("medium");
            setIsDialogOpen(false);
        }
    };

    const handleCancel = () => {
        setNewTodoText("");
        setNewTodoPriority("medium");
        setIsDialogOpen(false);
    };

    return (
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
                        <label htmlFor="todo-text" className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
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
                        <label htmlFor="todo-priority" className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                            Priority
                        </label>
                        <Select value={newTodoPriority} onValueChange={setNewTodoPriority}>
                            <SelectTrigger className="w-full bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100">
                                <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="low">Low Priority</SelectItem>
                                <SelectItem value="medium">Medium Priority</SelectItem>
                                <SelectItem value="high">High Priority</SelectItem>
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
    );
} 