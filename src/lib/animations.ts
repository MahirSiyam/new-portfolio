import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const EASE = {
  out: "power3.out",
  soft: "power2.out",
  expo: "expo.out",
  inOut: "power2.inOut",
} as const;

export const DURATION = {
  ui: 0.3,
  enter: 0.7,
  image: 0.9,
  headline: 0.95,
} as const;

export const MEDIA = {
  reduce: "(prefers-reduced-motion: reduce)",
  ok: "(prefers-reduced-motion: no-preference)",
  desktop: "(min-width: 1024px)",
} as const;

/**
 * Default ScrollTrigger config for a one-shot entrance. Plays when the
 * element is entered from either direction (e.g. the page was restored or
 * deep-linked below it), then kills itself.
 */
export function enterTrigger(
  trigger: Element,
  start = "top 82%",
): ScrollTrigger.Vars {
  return { trigger, start, once: true, toggleActions: "play none play none" };
}

/**
 * Runs `build` only when the visitor allows motion. When motion is reduced,
 * `settle` (optional) can put targets into their final state instantly.
 */
export function withMotion(
  build: (ctx: gsap.Context) => void | (() => void),
  settle?: () => void,
) {
  const mm = gsap.matchMedia();
  mm.add(MEDIA.ok, (ctx) => build(ctx));
  mm.add(MEDIA.reduce, () => {
    settle?.();
  });
  return mm;
}

export { gsap, ScrollTrigger, useGSAP };
