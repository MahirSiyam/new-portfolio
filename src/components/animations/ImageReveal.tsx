"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, EASE, DURATION, enterTrigger, withMotion } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  direction?: "up" | "left";
  delay?: number;
  start?: string;
}

/**
 * Clip-path mask reveal with a gentle inner scale. Wrap an `<Image>` or any
 * block-level media in it.
 */
export function ImageReveal({
  children,
  className,
  innerClassName,
  direction = "up",
  delay = 0,
  start,
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const inner = root.firstElementChild;
      if (!inner) return;

      return withMotion(() => {
        const from =
          direction === "up" ? "inset(100% 0 0 0)" : "inset(0 100% 0 0)";
        const tl = gsap.timeline({
          scrollTrigger: enterTrigger(root, start),
          delay,
          defaults: { ease: EASE.expo },
        });
        tl.fromTo(
          root,
          { clipPath: from },
          { clipPath: "inset(0% 0 0 0)", duration: DURATION.image + 0.2 },
        ).fromTo(
          inner,
          { scale: 1.15 },
          { scale: 1, duration: DURATION.image + 0.4, clearProps: "transform" },
          "<",
        );
      });
    },
    { scope: ref, dependencies: [direction, delay, start] },
  );

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <div className={cn("h-full w-full", innerClassName)}>{children}</div>
    </div>
  );
}
