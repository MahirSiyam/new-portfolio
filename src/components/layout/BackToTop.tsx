"use client";

import { ArrowUp } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function BackToTop({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <a
      href="#home"
      onClick={(event) => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
        history.replaceState(null, "", "#home");
      }}
      className={className}
    >
      <span>Back to top</span>
      <ArrowUp
        aria-hidden="true"
        className="size-3.5 transition-transform duration-300 ease-editorial group-hover:-translate-y-1"
      />
    </a>
  );
}
