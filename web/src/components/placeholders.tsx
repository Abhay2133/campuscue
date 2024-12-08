import { Skeleton } from "./ui/skeleton";

export const QuestionPlaceholder = () => (
  <div className="p-5 rounded border bg-primary-foreground space-y-2">
    <Skeleton className="h-[20px] w-[150px] rounded-full" />
    <Skeleton className="h-[20px] w-[200px] rounded-full" />
    <Skeleton className="h-[60px] w-full rounded" />
  </div>
);

export const AnswerPlaceholder = () => {
  return (
    <div className="p-5 rounded border bg-primary-foreground space-y-2">
      <Skeleton className="h-[60px]" />
      <Skeleton className="w-[200px] h-[20px] ml-auto" />
    </div>
  );
};
