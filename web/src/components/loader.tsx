import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

export default function Loader({
  children,
  className,
  message
}: {
  className?: string;
  children?: ReactNode;
  message?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 items-center justify-center text-primary",
        className
      )}
    >
      <Loader2 className="animate-spin" size={30} />
      {message || children}
    </div>
  );
}
