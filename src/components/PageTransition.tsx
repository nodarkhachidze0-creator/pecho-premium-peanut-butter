import { useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const key = useRouterState({ select: (state) => state.location.pathname });
  return <div key={key} className="page-transition">{children}</div>;
}