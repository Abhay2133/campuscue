import { Skeleton } from "./ui/skeleton";

export const QuestionPlaceholder = () => (
  <div className="p-5 rounded border bg-primary-foreground space-y-2">
    <Skeleton className="h-[20px] w-[150px] rounded-full" />
    <Skeleton className="h-[20px] w-[200px] rounded-full" />
    <Skeleton className="h-[60px] w-full rounded" />
  </div>
);