"use client";

import { useRef, type ElementType, type HTMLAttributes, type ReactNode } from "react";
import { gsap, useGSAP, EASE, DURATION, enterTrigger, withMotion } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface ScrollRevealProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /**
   * CSS selector for the staggered items. Defaults to direct children.
   * Items can also opt in explicitly with `data-reveal`.
   */
  selector?: string;
  y?: number;
  stagger?: number;
  delay?: number;
  duration?: number;
  start?: string;
  id?: string;
}

/**
 * Staggered entrance for a group of elements once the wrapper scrolls into
 * view. Hidden state is applied by GSAP at mount (never in CSS), so content
 * remains visible when JavaScript is unavailable.
 */
export function ScrollReveal({
  children,
  as: Tag = "div",
  className,
  selector,
  y = 28,
  stagger = 0.08,
  delay = 0,
  duration = DURATION.enter,
  start,
  id,
  ...rest
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const targets = selector
        ? gsap.utils.toArray<HTMLElement>(selector, root)
        : Array.from(root.children).filter((el): el is HTMLElement => el instanceof HTMLElement);
      if (!targets.length) return;

      return withMotion(() => {
        gsap.from(targets, {
          y,
          autoAlpha: 0,
          duration,
          ease: EASE.out,
          stagger,
          delay,
          clearProps: "willChange",
          scrollTrigger: enterTrigger(root, start),
        });
      });
    },
    { scope: ref, dependencies: [selector, y, stagger, delay, duration, start] },
  );

  return (
    <Tag ref={ref} id={id} className={cn(className)} {...rest}>
      {children}
    </Tag>
  );
}
