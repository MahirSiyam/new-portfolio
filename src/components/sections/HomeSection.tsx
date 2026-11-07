"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { PersonalInfo, SocialLink } from "@/types/portfolio";
import { socialLinks } from "@/data/portfolio";
import { EditorialButton } from "@/components/ui/EditorialButton";
import { PortraitPlaceholder } from "@/components/ui/PortraitPlaceholder";
import { Ticker } from "@/components/ui/Ticker";
import { TextReveal } from "@/components/animations/TextReveal";
import { gsap, useGSAP, EASE, MEDIA } from "@/lib/animations";

function BrandIcon({ path, scale = 1 }: { path: string; scale?: number }) {
  return (
    <span className="inline-flex size-9 shrink-0 items-center justify-center sm:size-10">
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="size-7 fill-current sm:size-8"
        style={{ transform: `scale(${scale})` }}
      >
        <path d={path} />
      </svg>
    </span>
  );
}

/** Brand marks kept local — Lucide/Simple Icons drop many trademarked logos. */
const socialIcons: Partial<Record<SocialLink["id"], ReactNode>> = {
  facebook: (
    <BrandIcon
      scale={1.08}
      path="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 4.99 3.64 9.13 8.4 9.93v-7.02H7.9v-2.91h2.36V9.8c0-2.33 1.39-3.62 3.52-3.62 1.02 0 2.09.18 2.09.18v2.3h-1.18c-1.16 0-1.52.72-1.52 1.46v1.75h2.59l-.41 2.91h-2.18V22c4.76-.8 8.4-4.94 8.4-9.93z"
    />
  ),
  github: (
    <BrandIcon path="M12 .3a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .3z" />
  ),
  linkedin: (
    <BrandIcon
      scale={0.96}
      path="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z"
    />
  ),
};

interface HomeSectionProps {
  info: PersonalInfo;
}

function formatLocalTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Dhaka",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export function HomeSection({ info }: HomeSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const portraitTap = useRef<{ x: number; y: number } | null>(null);
  const [localTime, setLocalTime] = useState("");
  const [portraitColor, setPortraitColor] = useState(false);

  useEffect(() => {
    const tick = () => setLocalTime(formatLocalTime(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const reveal = gsap.utils.toArray<HTMLElement>("[data-hero-reveal]", root);

      const mm = gsap.matchMedia();

      mm.add({ ok: MEDIA.ok, reduce: MEDIA.reduce }, (ctx) => {
        const conditions = ctx.conditions as { ok: boolean; reduce: boolean };
        if (conditions.reduce) {
          gsap.set(reveal, { clearProps: "all", visibility: "visible" });
          return;
        }

        const q = gsap.utils.selector(root);
        const tl = gsap.timeline({
          defaults: { ease: EASE.expo, duration: 0.9 },
          delay: 0.15,
        });

        // Everything flagged becomes visible; individual tweens handle state.
        tl.set(reveal, { visibility: "visible" })
          .from(q("[data-hero='masthead'] > *"), { y: 10, autoAlpha: 0, duration: 0.6, stagger: 0.08 })
          .from(q("[data-hero='headline'] [data-line]"), { yPercent: 110, duration: 1.05, stagger: 0.12 }, "-=0.3")
          .from(q("[data-hero='underline']"), { scaleX: 0, transformOrigin: "left center", duration: 0.8 }, "-=0.6")
          .from(q("[data-hero='title']"), { y: 16, autoAlpha: 0, duration: 0.7 }, "-=0.6")
          .from(q("[data-hero='copy']"), { y: 16, autoAlpha: 0, duration: 0.7 }, "-=0.55")
          .from(q("[data-hero='socials'] > *"), { y: 14, autoAlpha: 0, duration: 0.55, stagger: 0.08 }, "-=0.5")
          .from(q("[data-hero='cta'] > *"), { y: 18, autoAlpha: 0, duration: 0.6, stagger: 0.1 }, "-=0.5")
          .from(
            q("[data-hero='backdrop']"),
            { clipPath: "inset(0 0 100% 0)", duration: 1.1 },
            "-=1.6",
          )
          .from(
            q("[data-hero='portrait']"),
            { clipPath: "inset(100% 0 0 0)", duration: 1.1 },
            "-=0.8",
          )
          .from(q("[data-portrait-media]"), { scale: 1.12, duration: 1.4, clearProps: "transform" }, "<")
          .from(
            q("[data-hero='detail']"),
            { autoAlpha: 0, y: 10, duration: 0.65 },
            "-=0.7",
          );
      });
    },
    { scope: ref },
  );

  return (
    <section
      id="home"
      ref={ref}
      aria-labelledby="home-heading"
      className="relative overflow-hidden"
    >
      <div className="container-editorial">
        {/* Masthead */}
        <div
          data-hero="masthead"
          className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2 pt-5 font-mono text-[0.78rem] uppercase tracking-[0.14em] text-muted-foreground sm:text-[0.84rem]"
        >
          <span data-hero-reveal className="inline-flex items-center gap-2">
            {info.location}
            <Image
              src="/images/portrait/bangladesh.png"
              alt=""
              width={36}
              height={36}
              aria-hidden="true"
              className="size-[1.75em] w-auto object-contain opacity-80 brightness-0 dark:invert"
            />
            {localTime ? (
              <>
                <span aria-hidden="true">·</span>
                <span aria-live="polite" className="tabular-nums">
                  {localTime}
                </span>
              </>
            ) : null}
          </span>
        </div>

        {/* Hero grid */}
        <div className="grid gap-8 pt-6 pb-10 sm:gap-10 sm:pt-8 sm:pb-12 md:gap-12 md:pt-10 md:pb-14 lg:grid-cols-12 lg:items-center lg:gap-8 lg:pt-14 lg:pb-20">
          <div className="order-2 flex min-w-0 flex-col lg:order-1 lg:col-span-7">
            <div data-hero="headline" data-hero-reveal className="min-w-0 w-full">
              <TextReveal
                as="h1"
                id="home-heading"
                manual
                lines={info.headline}
                className="text-hero-quote"
                lineClassName="w-full"
              />
            </div>

            <span
              data-hero="underline"
              data-hero-reveal
              aria-hidden="true"
              className="mt-4 block h-1.5 w-24 bg-accent sm:mt-6 sm:h-2 sm:w-28 md:w-36"
            />

            <p
              data-hero="title"
              data-hero-reveal
              className="text-display-sm mt-5 w-full max-w-2xl text-foreground/90 sm:mt-7"
            >
              {info.tagline}
            </p>

            <p
              data-hero="copy"
              data-hero-reveal
              className="mt-4 w-full max-w-2xl text-[0.9375rem] leading-relaxed text-muted-foreground sm:mt-5 sm:text-base md:text-lg lg:max-w-lg"
            >
              {info.intro}
            </p>

            <ul
              data-hero="socials"
              data-hero-reveal
              className="mt-3 flex flex-wrap items-center gap-4 sm:mt-3.5 sm:gap-5"
              aria-label="Social profiles"
            >
              {socialLinks
                .filter((link) => link.href && socialIcons[link.id])
                .map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="inline-flex text-foreground transition-colors duration-300 hover:text-accent"
                    >
                      {socialIcons[link.id]}
                    </a>
                  </li>
                ))}
            </ul>

            <div data-hero="cta" data-hero-reveal className="mt-4 flex flex-wrap items-center gap-3 sm:mt-5 sm:gap-4">
              <EditorialButton href="/projects" variant="primary" arrow="right" size="lg">
                View my work
              </EditorialButton>
              <EditorialButton href="#about" variant="secondary" arrow="right" size="lg">
                About me
              </EditorialButton>
            </div>
          </div>

          {/* Portrait composition — first on small screens */}
          <div className="relative order-1 flex w-full items-center justify-center self-center lg:order-2 lg:col-span-5 lg:justify-end">
            <div className="relative mx-auto w-full max-w-[min(100%,20.5rem)] pb-[8%] xs:max-w-sm sm:max-w-md md:max-w-xl lg:mx-0 lg:ml-auto lg:max-w-none">
              <div
                data-hero="backdrop"
                data-hero-reveal
                aria-hidden="true"
                className="pointer-events-none absolute top-[8%] right-0 bottom-0 left-[12%] z-0 bg-accent"
              />

              <div
                data-hero="portrait"
                data-hero-reveal
                data-color={portraitColor ? "true" : undefined}
                className="relative z-10 mr-[10%] aspect-[4/5] overflow-hidden bg-[#1a1a1a] touch-manipulation select-none dark:ring-1 dark:ring-white/15"
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") setPortraitColor(true);
                }}
                onPointerLeave={(event) => {
                  if (event.pointerType === "mouse") setPortraitColor(false);
                }}
                onPointerDown={(event) => {
                  if (event.pointerType === "mouse") return;
                  portraitTap.current = { x: event.clientX, y: event.clientY };
                }}
                onPointerUp={(event) => {
                  if (event.pointerType === "mouse") return;
                  const start = portraitTap.current;
                  portraitTap.current = null;
                  if (!start) return;
                  const moved =
                    Math.abs(event.clientX - start.x) > 10 ||
                    Math.abs(event.clientY - start.y) > 10;
                  if (moved) return;
                  setPortraitColor((open) => !open);
                }}
                onPointerCancel={() => {
                  portraitTap.current = null;
                }}
              >
                {info.profileImage ? (
                  <div
                    data-portrait-media
                    className="absolute inset-0 origin-center scale-[1.18] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none data-[color=true]:scale-[1.28]"
                    data-color={portraitColor ? "true" : undefined}
                  >
                    <Image
                      src={info.profileImage.src}
                      alt={info.profileImage.alt}
                      fill
                      priority
                      sizes="(min-width: 1024px) 40vw, (min-width: 768px) 55vw, (min-width: 640px) 70vw, 92vw"
                      className="object-cover object-[center_18%] contrast-[1.08] grayscale transition-[filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none data-[color=true]:grayscale-0"
                      data-color={portraitColor ? "true" : undefined}
                    />
                  </div>
                ) : (
                  <div data-portrait-media className="absolute inset-0">
                    <PortraitPlaceholder name={info.name} title={info.title} />
                  </div>
                )}

                <div
                  data-hero="detail"
                  data-hero-reveal
                  className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-linear-to-t from-black via-black/70 to-transparent px-3 pt-16 pb-3 xs:px-4 xs:pt-20 xs:pb-4 sm:px-5 sm:pt-24 sm:pb-5"
                >
                  <p className="flex items-center gap-2 font-mono text-[length:clamp(0.58rem,0.5rem+0.35vw,0.72rem)] font-medium uppercase tracking-[0.16em] text-white/70">
                    <span aria-hidden="true" className="block size-1.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
                    {info.title}
                  </p>
                  <p
                    className="mt-1.5 font-body text-[length:clamp(1.4rem,0.9rem+2.8vw,2.75rem)] leading-[1.05] font-extrabold tracking-[-0.03em] text-balance normal-case sm:mt-2"
                    style={{ color: "#ffffff", textShadow: "0 1px 2px rgba(0,0,0,0.9), 0 4px 18px rgba(0,0,0,0.75)" }}
                  >
                    {info.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Ticker items={info.ticker} />
    </section>
  );
}
