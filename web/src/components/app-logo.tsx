import { Hospital } from "lucide-react";
import { SidebarMenu, SidebarMenuItem } from "./ui/sidebar";
import Link from "next/link";

export default function AppLogo() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Link href="/"  className="flex gap-3 items-center">
          <div className=" aspect-square size-8 rounded bg-blue-300 dark:bg-blue-600 flex items-center justify-center">
            <Hospital className="size-4" />
          </div>
          <span className=" truncate">CampusCue</span>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
