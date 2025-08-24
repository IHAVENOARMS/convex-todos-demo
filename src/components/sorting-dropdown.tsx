import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface SortingDropdownProps {
    value: string;
    onValueChange: (value: string) => void;
}

export function SortingDropdown({ value, onValueChange }: SortingDropdownProps) {
    return (
        <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Sort by:
            </label>
            <Select value={value} onValueChange={onValueChange}>
                <SelectTrigger className="w-32 bg-white dark:bg-neutral-800 border-orange-300 dark:border-orange-500/50 text-neutral-900 dark:text-neutral-100 shadow-none rounded-lg transition-colors hover:border-orange-400 dark:hover:border-orange-500 focus:border-orange-500 dark:focus:border-orange-400">
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="priority">Priority</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
} 