"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { useEffect } from "react";

export default function CommunitiesPage() {
  const { setActiveIndex } = useSidebar();
  useEffect(() => setActiveIndex(3), []);
  return <div className="min-h-screen centered">
    API UNDER DEV
  </div>;
}
