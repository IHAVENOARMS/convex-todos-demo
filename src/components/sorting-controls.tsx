import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface SortingControlsProps {
    sortBy: string;
    order: 'asc' | 'desc';
    onSortByChange: (value: string) => void;
    onOrderToggle: (order: this['order']) => void;
}

export function SortingControls({
    sortBy,
    order,
    onSortByChange,
    onOrderToggle
}: SortingControlsProps) {
    return (
        <TooltipProvider>
            <div className="flex items-center gap-2 p-1 bg-white dark:bg-neutral-800 rounded-lg border border-orange-300 dark:border-orange-500/50">
                <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 px-2">
                        Sort by:
                    </label>
                    <Select value={sortBy} onValueChange={onSortByChange}>
                        <SelectTrigger className="w-32 bg-transparent border-0 shadow-none focus:ring-0 text-neutral-900 dark:text-neutral-100 hover:bg-orange-50 dark:hover:bg-orange-950/20 rounded-md">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="date">Date</SelectItem>
                            <SelectItem value="priority">Priority</SelectItem>
                            <SelectItem value="name">Name</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="w-px h-6 bg-orange-300 dark:bg-orange-500/50"></div>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => onOrderToggle(order === 'asc' ? 'desc' : "asc")}
                            className="w-8 h-8 hover:bg-orange-100 dark:hover:bg-orange-950/20 text-neutral-900 dark:text-neutral-100 rounded-md"
                        >
                            {order === 'asc' ? (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                </svg>
                            ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            )}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{order === 'asc' ? "Ascending" : "Descending"}</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </TooltipProvider>
    );
} 