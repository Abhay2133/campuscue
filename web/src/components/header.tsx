import { ReactNode } from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { cn } from "@/lib/utils";

export default function Header({
  children,
  className,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <header className={cn("flex gap-3 px-3  items-center", className)}>
      <SidebarTrigger />
      {children}
    </header>
  );
}
