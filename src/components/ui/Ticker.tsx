"use client";

import { useRef } from "react";
import { gsap, useGSAP, withMotion } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface TickerProps {
  items: string[];
  className?: string;
  /** Seconds for one full loop of the sequence. */
  speed?: number;
}

/**
 * Seamless horizontal editorial ticker. The sequence is duplicated and
 * translated by -50%, so the loop is continuous. Static under reduced motion.
 */
export function Ticker({ items, className, speed = 28 }: TickerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = ref.current?.querySelector<HTMLElement>("[data-track]");
      if (!track) return;
      return withMotion(() => {
        const tween = gsap.to(track, {
          xPercent: -50,
          duration: speed,
          ease: "none",
          repeat: -1,
        });
        const root = ref.current;
        const pause = () => tween.pause();
        const play = () => tween.play();
        root?.addEventListener("mouseenter", pause);
        root?.addEventListener("mouseleave", play);
        return () => {
          root?.removeEventListener("mouseenter", pause);
          root?.removeEventListener("mouseleave", play);
        };
      });
    },
    { scope: ref, dependencies: [speed] },
  );

  const sequence = (
    <>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-6 pr-6">
          <span>{item}</span>
          <span aria-hidden="true" className="block size-1.5 bg-accent" />
        </span>
      ))}
    </>
  );

  return (
    <div
      ref={ref}
      className={cn(
        "relative w-full overflow-hidden border-y border-border py-3 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground",
        className,
      )}
    >
      <div data-track className="flex w-max will-change-transform">
        <div className="flex shrink-0">{sequence}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {sequence}
        </div>
      </div>
    </div>
  );
}
