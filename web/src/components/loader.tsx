import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default function Loader({
  message,
  className,
}: {
  className?: string;
  message: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 items-center justify-center",
        className
      )}
    >
      <Loader2 className="animate-spin" size={30} />
      {message}
    </div>
  );
}
