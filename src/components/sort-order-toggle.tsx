import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface SortOrderToggleProps {
    isAscending: boolean;
    onToggle: (isAscending: boolean) => void;
}

export function SortOrderToggle({ isAscending, onToggle }: SortOrderToggleProps) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onToggle(!isAscending)}
                        className="w-8 h-8 border-orange-300 dark:border-orange-500/50 text-neutral-900 dark:text-neutral-100 hover:bg-orange-100 dark:hover:bg-orange-950/20 hover:border-orange-400 dark:hover:border-orange-500 focus:border-orange-500 dark:focus:border-orange-400"
                    >
                        {isAscending ? (
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
                    <p>{isAscending ? "Ascending" : "Descending"}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
} 