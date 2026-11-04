"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import type { PersonalInfo } from "@/types/portfolio";
import { EditorialButton } from "@/components/ui/EditorialButton";
import { PortraitPlaceholder } from "@/components/ui/PortraitPlaceholder";
import { Ticker } from "@/components/ui/Ticker";
import { TextReveal } from "@/components/animations/TextReveal";
import { gsap, useGSAP, EASE, MEDIA } from "@/lib/animations";

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
  const [localTime, setLocalTime] = useState("");

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
          )
          .from(q("[data-hero='scroll']"), { autoAlpha: 0, y: -8, duration: 0.6 }, "-=0.4");
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
          className="eyebrow flex flex-wrap items-center justify-end gap-x-6 gap-y-2 pt-5 text-muted-foreground"
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
        <div className="grid gap-8 pt-6 pb-10 sm:gap-10 sm:pt-8 sm:pb-12 md:gap-12 md:pt-10 md:pb-14 lg:grid-cols-12 lg:items-end lg:gap-8 lg:pt-14 lg:pb-20">
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

            <div data-hero="cta" data-hero-reveal className="mt-7 flex flex-wrap items-center gap-3 sm:mt-9 sm:gap-4">
              <EditorialButton href="#projects" variant="primary" arrow="right" size="lg">
                View my work
              </EditorialButton>
              <EditorialButton href="#about" variant="secondary" arrow="right" size="lg">
                About me
              </EditorialButton>
            </div>
          </div>

          {/* Portrait composition — first on small screens */}
          <div className="relative order-1 w-full lg:order-2 lg:col-span-5">
            <div className="relative mx-auto w-full max-w-[20.5rem] pb-[8%] xs:max-w-sm sm:max-w-md md:max-w-xl lg:ml-auto lg:max-w-none">
              <div
                data-hero="backdrop"
                data-hero-reveal
                aria-hidden="true"
                className="pointer-events-none absolute top-[8%] right-0 bottom-0 left-[12%] z-0 bg-accent"
              />

              <div
                data-hero="portrait"
                data-hero-reveal
                className="group relative z-10 mr-[10%] aspect-[4/5] overflow-hidden bg-[#1a1a1a] dark:ring-1 dark:ring-white/15"
              >
                {info.profileImage ? (
                  <div
                    data-portrait-media
                    className="absolute inset-0 origin-center scale-[1.18] transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform motion-reduce:transition-none group-hover:scale-[1.28]"
                  >
                    <Image
                      src={info.profileImage.src}
                      alt={info.profileImage.alt}
                      fill
                      priority
                      sizes="(min-width: 1024px) 40vw, (min-width: 768px) 55vw, (min-width: 640px) 70vw, 92vw"
                      className="object-cover object-[center_18%] grayscale contrast-[1.08] transition-[filter] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[filter] motion-reduce:transition-none group-hover:grayscale-0"
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

      {/* Ticker + scroll cue */}
      <div className="relative">
        <Ticker items={info.ticker} />
        <a
          data-hero="scroll"
          data-hero-reveal
          href="#about"
          aria-label="Scroll to About"
          className="group absolute right-[clamp(1.25rem,4vw,3.5rem)] -bottom-6 hidden size-12 items-center justify-center border border-border bg-background text-foreground transition-colors duration-300 hover:border-accent hover:text-accent md:flex"
        >
          <ArrowDown aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-y-1" />
        </a>
      </div>
    </section>
  );
}
