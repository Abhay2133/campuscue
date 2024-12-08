"use client";

import SidebarHeader from "@/components/header";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { useEffect } from "react";

export default function CommunitiesPage() {
  const { setActiveIndex } = useSidebar();
  useEffect(() => setActiveIndex(3), []);
  return (
    <div className="min-h-screen flex flex-col">
      <SidebarHeader className="p-3">
        <div className="font-semibold text-lg">Communitites</div>
      </SidebarHeader>
      <div className="flex-1 centered">
        <Button variant={'secondary'}>Coming Soon ...</Button>
      </div>
    </div>
  );
}
