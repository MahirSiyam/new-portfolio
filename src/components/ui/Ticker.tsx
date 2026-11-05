"use client";

import { useEffect, useRef, useState, type Ref } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface TickerProps {
  items: string[];
  className?: string;
  /** Seconds for one full loop of the sequence. */
  speed?: number;
}

function Sequence({
  items,
  copy,
  hidden,
  measureRef,
}: {
  items: string[];
  copy: string;
  hidden?: boolean;
  measureRef?: Ref<HTMLDivElement>;
}) {
  return (
    <div ref={measureRef} className="flex shrink-0" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <span key={`${copy}-${item}`} className="inline-flex items-center gap-6 pr-6 whitespace-nowrap">
          <span>{item}</span>
          <span aria-hidden="true" className="block size-1.5 shrink-0 bg-accent" />
        </span>
      ))}
    </div>
  );
}

/**
 * Seamless horizontal ticker. CSS drives the loop on the compositor.
 * Pauses off-screen, in a background tab, on hover, and when motion is reduced.
 */
export function Ticker({ items, className, speed = 28 }: TickerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const unitRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [copies, setCopies] = useState(2);

  useEffect(() => {
    const root = ref.current;
    const unit = unitRef.current;
    if (!root || !unit) return;

    const fit = () => {
      const view = root.clientWidth;
      const unitWidth = unit.scrollWidth;
      if (!view || !unitWidth) return;
      const next = Math.max(2, Math.ceil(view / unitWidth) + 1);
      setCopies((current) => (current === next ? current : next));
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(root);
    return () => observer.disconnect();
  }, [items, reduced]);

  useEffect(() => {
    const root = ref.current;
    if (!root || reduced) return;

    const setPaused = (paused: boolean) => {
      root.dataset.tickerPaused = paused ? "true" : "false";
    };

    const observer = new IntersectionObserver(
      ([entry]) => setPaused(!entry.isIntersecting || document.hidden),
      { rootMargin: "100px" },
    );
    observer.observe(root);

    const onVisibility = () => {
      if (document.hidden) {
        setPaused(true);
        return;
      }
      const box = root.getBoundingClientRect();
      const visible = box.bottom > 0 && box.top < window.innerHeight;
      setPaused(!visible);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  return (
    <div
      ref={ref}
      className={cn(
        "relative w-full overflow-hidden border-y border-border py-3 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground",
        className,
      )}
    >
      <div
        className={cn("flex w-max", !reduced && "ticker-track")}
        style={reduced ? undefined : { animationDuration: `${speed * copies}s` }}
      >
        {Array.from({ length: reduced ? 1 : copies }, (_, index) => (
          <Sequence
            key={`a-${index}`}
            items={items}
            copy={`a-${index}`}
            measureRef={index === 0 ? unitRef : undefined}
          />
        ))}
        {reduced
          ? null
          : Array.from({ length: copies }, (_, index) => (
              <Sequence key={`b-${index}`} items={items} copy={`b-${index}`} hidden />
            ))}
      </div>
    </div>
  );
}
