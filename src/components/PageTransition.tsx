import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const key = useRouterState({ select: (state) => state.location.pathname });
  return <TransitionFrame key={key}>{children}</TransitionFrame>;
}

function TransitionFrame({ children }: { children: ReactNode }) {
  const [entering, setEntering] = useState(true);
  useEffect(() => {
    const timer = window.setTimeout(() => setEntering(false), 280);
    return () => window.clearTimeout(timer);
  }, []);
  return <div className={entering ? "page-transition" : ""}>{children}</div>;
}