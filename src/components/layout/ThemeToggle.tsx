"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const subscribe = () => () => {};

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  // Theme is unknown during SSR; render a neutral control until mounted.
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"}
      aria-pressed={mounted ? isDark : undefined}
      title={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : undefined}
      className={cn(
        "relative inline-flex size-10 items-center justify-center border border-border bg-surface text-foreground transition-colors duration-300 ease-editorial hover:border-foreground",
        className,
      )}
    >
      <Sun
        aria-hidden="true"
        className={cn(
          "absolute size-[1.05rem] transition-[transform,opacity] duration-500 ease-editorial",
          isDark ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100",
        )}
      />
      <Moon
        aria-hidden="true"
        className={cn(
          "absolute size-[1.05rem] transition-[transform,opacity] duration-500 ease-editorial",
          isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0",
        )}
      />
    </button>
  );
}
