"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Achievements now live on /about — redirect on the client (static-export safe).
export default function Page() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/about");
  }, [router]);
  return null;
}
