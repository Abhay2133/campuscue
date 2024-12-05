"use client";

import {
  SidebarGroup,
  // SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  // SidebarMenuSub,
  // SidebarMenuSubButton,
  // SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { SidebarLink } from "@/types/site-content.types";
import Link from "next/link";

export function NavMain({ items }: { items: SidebarLink[] }) {
  const activeStyle =
    "border-l-blue-500 bg-secondary rounded-none rounded-tr rounded-br ";
  const { activeIndex } = useSidebar();
  return (
    <SidebarGroup>
      {/* <SidebarGroupLabel>Platform</SidebarGroupLabel> */}
      <SidebarMenu>
        {items.map((item, i) => (
          <SidebarMenuItem key={i}>
            <Link href={item.href} className="w-full">
              <SidebarMenuButton
                tooltip={item.label}
                className={cn(
                  `border-l-2 border-l-transparent ${
                    i === activeIndex ? activeStyle : ""
                  }`
                )}
              >
                {item.icon && item.icon}
                <span>{item.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
