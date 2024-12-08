"use client";

import { doLogout } from "@/services/userService";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
  const router = useRouter();
  useEffect(() => {
    doLogout();
    router.replace("/");
  }, []);
  return <></>;
}
