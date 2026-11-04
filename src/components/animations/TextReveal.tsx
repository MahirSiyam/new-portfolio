"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, EASE, DURATION, enterTrigger, withMotion } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  /** One entry per visual line. */
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  id?: string;
  /**
   * When `manual`, markup is rendered but no animation is scheduled; a parent
   * timeline can target `[data-line]` descendants instead (hero usage).
   */
  manual?: boolean;
  delay?: number;
  stagger?: number;
  start?: string;
}

/**
 * Masked line-by-line headline reveal. The text stays in a single semantic
 * element; each line is wrapped in an overflow-hidden span so no duplicate
 * text is exposed to assistive technology.
 */
export function TextReveal({
  lines,
  as: Tag = "h2",
  className,
  lineClassName,
  id,
  manual = false,
  delay = 0,
  stagger = 0.1,
  start,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (manual || !ref.current) return;
      const targets = gsap.utils.toArray<HTMLElement>("[data-line]", ref.current);

      return withMotion(() => {
        gsap.from(targets, {
          yPercent: 110,
          duration: DURATION.headline,
          ease: EASE.expo,
          stagger,
          delay,
          scrollTrigger: enterTrigger(ref.current as Element, start),
        });
      });
    },
    { scope: ref, dependencies: [manual, delay, stagger, start] },
  );

  return (
    <Tag ref={ref} id={id} className={cn(className)}>
      {lines.map((line, index) => (
        <span key={index} className={cn("reveal-line", lineClassName)}>
          <span data-line>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
