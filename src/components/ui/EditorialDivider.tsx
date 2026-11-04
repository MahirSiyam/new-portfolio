"use client";

import { useRef } from "react";
import { gsap, useGSAP, EASE, enterTrigger, withMotion } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface EditorialDividerProps {
  className?: string;
  /** `strong` renders a 2px foreground rule instead of the 1px border rule. */
  strong?: boolean;
  /** Draws the rule from left to right when scrolled into view. */
  animate?: boolean;
  delay?: number;
  /** Optional label rendered on the rule (e.g. "02 / 07"). */
  label?: string;
}

export function EditorialDivider({
  className,
  strong = false,
  animate = true,
  delay = 0,
  label,
}: EditorialDividerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!animate || !ref.current) return;
      const rule = ref.current.querySelector<HTMLElement>("[data-rule]");
      if (!rule) return;
      return withMotion(() => {
        gsap.from(rule, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.1,
          ease: EASE.expo,
          delay,
          scrollTrigger: enterTrigger(ref.current as Element, "top 90%"),
        });
      });
    },
    { scope: ref, dependencies: [animate, delay] },
  );

  if (label) {
    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-4", className)}
        aria-hidden="true"
      >
        <span className="eyebrow shrink-0 text-muted-foreground">{label}</span>
        <span data-rule className={cn(strong ? "ink-rule-strong" : "ink-rule")} />
      </div>
    );
  }

  return (
    <div ref={ref} className={cn(className)} aria-hidden="true">
      <span data-rule className={cn("block", strong ? "ink-rule-strong" : "ink-rule")} />
    </div>
  );
}
