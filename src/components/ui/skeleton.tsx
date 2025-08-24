import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-orange-200 dark:bg-orange-800/30", className)}
      {...props}
    />
  )
}

export { Skeleton }
