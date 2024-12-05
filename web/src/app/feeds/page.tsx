"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { useEffect } from "react";

export default function FeedsPage() {
  const { setActiveIndex } = useSidebar();
  useEffect(() => setActiveIndex(0), []);
  return <div className="min-h-screen centered">
    API UNDER DEV
  </div>;
}
