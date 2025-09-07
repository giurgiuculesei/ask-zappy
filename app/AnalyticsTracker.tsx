"use client";

import * as ga from "@/lib/ga";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      ga.pageview(pathname);
    }
  }, [pathname]);

  return null;
}
