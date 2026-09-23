"use client";

import { useEffect } from "react";

export function Analytics() {
  useEffect(() => {
    import("@/instrumentation-client");
  }, []);

  return null;
}
