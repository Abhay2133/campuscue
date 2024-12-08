"use client";

import SidebarHeader from "@/components/header";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { SearchIcon } from "lucide-react";
import { useEffect } from "react";

export default function FeedsPage() {
  const { setActiveIndex } = useSidebar();
  useEffect(() => setActiveIndex(0), []);
  return <div className="min-h-screen">
    <SidebarHeader className="p-3">
      <div className="font-semibold text-lg">Feeds</div>
      <Button variant={'ghost'} className="ml-auto ">
        <SearchIcon size={20}/>
      </Button>
    </SidebarHeader>
  </div>;
}