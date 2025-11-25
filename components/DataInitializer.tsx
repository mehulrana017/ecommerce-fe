"use client";

import { useDataInitialization } from "@/hooks/useDataInitialization";

export function DataInitializer({ children }: { children: React.ReactNode }) {
  useDataInitialization();
  return <>{children}</>;
}
