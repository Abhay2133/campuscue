import { ReactNode } from "react";

export type SidebarLink = {
  label: string;
  href: string;
  icon: ReactNode;
  isActive?: boolean;
}
