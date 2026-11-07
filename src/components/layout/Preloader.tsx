"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties } from "react";
import { about, personalInfo } from "@/data/portfolio";
import { gsap, useGSAP, EASE, MEDIA } from "@/lib/animations";
import { isPreloaderDone, markPreloaderDone } from "@/lib/preloader";

/* ------------------------------------------------------------------ */
/* Newspaper page content (decorative, scaled with container units)    */
/* ------------------------------------------------------------------ */

type Variant = "cover" | "story" | "figure" | "quote" | "index" | "landing";

function Lines({ n, className = "" }: { n: number; className?: string }) {
  return <div className={`np-lines ${className}`} style={{ "--n": n } as CSSProperties} />;
}

function Face({ variant }: { variant: Variant }) {
  const info = personalInfo;

  switch (variant) {
    case "cover":
      return (
        <div className="np">
          <div className="np-eyebrow np-between">
            <span>{info.edition.volume}</span>
            <span>{info.edition.label}</span>
          </div>
          <div className="np-rule np-rule-thick" />
          <p className="np-masthead">{info.name}</p>
          <div className="np-rule" />
          <div className="np-eyebrow np-between">
            <span>{info.title}</span>
            <span>{info.location}</span>
          </div>
          <p className="np-headline">{info.headline.slice(0, 2).join(" ")}</p>
          <div className="np-cols" style={{ "--cols": 2 } as CSSProperties}>
            <div className="np-figure" />
            <Lines n={9} />
          </div>
          <div className="np-cols" style={{ "--cols": 3 } as CSSProperties}>
            <Lines n={4} />
            <Lines n={4} />
            <Lines n={4} />
          </div>
        </div>
      );
    case "story":
      return (
        <div className="np">
          <p className="np-eyebrow">{about.eyebrow}</p>
          <div className="np-rule" />
          <p className="np-headline">{about.headline.join(" ")}</p>
          <div className="np-cols" style={{ "--cols": 3 } as CSSProperties}>
            <Lines n={12} />
            <Lines n={12} />
            <Lines n={12} />
          </div>
          <div className="np-rule" />
          <div className="np-cols" style={{ "--cols": 2 } as CSSProperties}>
            <Lines n={5} />
            <Lines n={5} />
          </div>
        </div>
      );
    case "figure":
      return (
        <div className="np">
          <p className="np-eyebrow np-between">
            <span>Selected work</span>
            <span>p. 03</span>
          </p>
          <div className="np-rule" />
          <div className="np-figure np-figure-wide" />
          <p className="np-caption">{info.tagline}</p>
          <div className="np-cols" style={{ "--cols": 2 } as CSSProperties}>
            <Lines n={8} />
            <Lines n={8} />
          </div>
        </div>
      );
    case "quote":
      return (
        <div className="np">
          <div className="np-cols" style={{ "--cols": 2 } as CSSProperties}>
            <Lines n={14} />
            <div>
              <div className="np-rule np-rule-thick" />
              <p className="np-quote">“{info.headline[0]}”</p>
              <div className="np-rule" />
              <Lines n={5} />
            </div>
          </div>
          <div className="np-cols" style={{ "--cols": 3 } as CSSProperties}>
            <Lines n={4} />
            <Lines n={4} />
            <Lines n={4} />
          </div>
        </div>
      );
    case "index":
      return (
        <div className="np">
          <p className="np-eyebrow np-between">
            <span>The index</span>
            <span>{info.edition.volume}</span>
          </p>
          <div className="np-rule np-rule-thick" />
          <ul className="np-list">
            {info.ticker.map((item, i) => (
              <li key={item} className="np-row">
                <span>{item}</span>
                <span>{String(i + 1).padStart(2, "0")}</span>
              </li>
            ))}
          </ul>
          <div className="np-cols" style={{ "--cols": 2 } as CSSProperties}>
            <Lines n={6} />
            <Lines n={6} />
          </div>
        </div>
      );
    case "landing":
      return <LandingFace />;
  }
}

/** Miniature of the hero (`#home > .container-editorial`) on the final right-hand page. */
function LandingFace() {
  const info = personalInfo;
  return (
    <div className="lp">
      <div className="lp-header">
        <span className="lp-brand">{info.shortName}</span>
        <span className="lp-nav">
          <span>Home</span>
          <span>About</span>
          <span>Projects</span>
        </span>
      </div>
      <div className="lp-masthead">{info.location}</div>
      {/* Mirrors the real hero: stacked (portrait first) on small screens, 7/5 grid on large. */}
      <div className="lp-hero">
        <div className="lp-text">
          <p className="lp-headline">
            {info.headline.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
          <span className="lp-underline" />
          <p className="lp-tagline">{info.tagline}</p>
          <p className="lp-copy">{info.intro}</p>
          <div className="lp-socials">
            <span />
            <span />
            <span />
          </div>
          <div className="lp-cta">
            <span className="lp-btn lp-btn-primary">View my work</span>
            <span className="lp-btn">About me</span>
          </div>
        </div>
        <div className="lp-figure">
          <span className="lp-backdrop" />
          <div className="lp-portrait">
            {info.profileImage ? (
              <Image src={info.profileImage.src} alt="" fill sizes="20vw" className="lp-portrait-img" />
            ) : null}
            <span className="lp-portrait-name">{info.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** [front, back] for each sheet, cover first. */
const SHEETS: [Variant, Variant][] = [
  ["cover", "story"],
  ["figure", "quote"],
  ["index", "story"],
  ["figure", "cover"],
  ["landing", "index"],
];

/** Sheets that turn before the site is revealed; the last stays as the right page. */
const FLIPS = SHEETS.length - 1;

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const skip = useRef(isPreloaderDone());
  const [hidden, setHidden] = useState(false);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const html = document.documentElement;
      const reduce = window.matchMedia(MEDIA.reduce).matches;

      // No intro without JS-enabled motion, or when it already played.
      if (skip.current || reduce || !html.classList.contains("motion")) {
        markPreloaderDone();
        setHidden(true);
        return;
      }

      const prevOverflow = html.style.overflow;
      html.style.overflow = "hidden";
      window.scrollTo(0, 0);

      const q = gsap.utils.selector(root);
      const paper = q("[data-paper]");
      const sheets = q<HTMLElement>("[data-sheet]");
      const meta = q("[data-meta]");
      const metaItems = q("[data-meta] > *");
      const progress = q("[data-progress]");
      const counterEl = root.querySelector<HTMLElement>("[data-counter]");
      const counter = { value: 0 };

      const FLIP = 0.72; // one page turn
      const GAP = 0.5; // time between successive turns

      const paperWidth = (paper[0] as HTMLElement | undefined)?.offsetWidth ?? 800;
      gsap.set(sheets, {
        transformPerspective: Math.max(1600, paperWidth * 1.6),
        transformOrigin: "left center",
      });
      sheets.forEach((sheet, i) => gsap.set(sheet, { zIndex: sheets.length - i }));
      // Closed newspaper: centre the right-hand stack, open into a spread later.
      gsap.set(paper, { xPercent: -25 });

      const tl = gsap.timeline({
        defaults: { ease: EASE.expo },
        onComplete: () => {
          html.style.overflow = prevOverflow;
          setHidden(true);
        },
      });

      tl.from(paper, { y: 28, autoAlpha: 0, duration: 0.9 })
        .from(metaItems, { y: 8, autoAlpha: 0, duration: 0.5, stagger: 0.08 }, "-=0.6");

      let t = tl.duration() - 0.15;
      for (let i = 0; i < FLIPS; i++) {
        const sheet = sheets[i];
        tl.set(sheet, { zIndex: 100 }, t)
          .to(sheet, { rotateY: -180, duration: FLIP, ease: "power2.inOut" }, t)
          .to(sheet, { "--shade": 0.55, duration: FLIP / 2, ease: "sine.in" }, t)
          .to(sheet, { "--shade": 0, duration: FLIP / 2, ease: "sine.out" }, t + FLIP / 2)
          .set(sheet, { zIndex: 50 + i }, t + FLIP);
        if (i === 0) {
          tl.to(paper, { xPercent: 0, duration: FLIP + 0.3, ease: EASE.inOut }, t);
        }
        t += GAP;
      }

      const flipsEnd = t - GAP + FLIP;

      tl.to(
        counter,
        {
          value: 100,
          duration: flipsEnd,
          ease: "power1.inOut",
          onUpdate: () => {
            if (counterEl) counterEl.textContent = String(Math.round(counter.value)).padStart(3, "0");
          },
        },
        0,
      ).to(progress, { scaleX: 1, duration: flipsEnd, ease: "power1.inOut" }, 0);

      // The last turn leaves the site's front page on the right-hand page.
      // Only that page zooms: the turned pages fade, the page slides to the
      // centre and grows until it fills the viewport, dissolving into the hero.
      const zoom = flipsEnd + 0.55;
      const frontPage = sheets[FLIPS];
      const turned = sheets.slice(0, FLIPS);
      const shadow = q("[data-shadow]");
      const zoomScale = () => {
        if (!frontPage) return 4;
        return (
          Math.max(window.innerWidth / frontPage.offsetWidth, window.innerHeight / frontPage.offsetHeight) *
          1.08
        );
      };
      tl.add(() => markPreloaderDone(), zoom)
        .set(frontPage, { zIndex: 200, transformOrigin: "center center" }, zoom)
        .to(meta, { autoAlpha: 0, duration: 0.35 }, zoom - 0.1)
        .to([...turned, ...shadow], { autoAlpha: 0, duration: 0.45, ease: "power2.out" }, zoom)
        .to(paper, { xPercent: -25, duration: 1.4, ease: "power3.inOut" }, zoom)
        .to(frontPage, { scale: zoomScale, duration: 1.4, ease: "power3.inOut" }, zoom)
        .to(root, { autoAlpha: 0, duration: 0.7, ease: "power2.inOut" }, zoom + 0.6);
      return () => {
        html.style.overflow = prevOverflow;
      };
    },
    { scope: ref },
  );

  if (hidden) return null;

  return (
    <div ref={ref} data-preloader aria-hidden="true" className="preloader">
      <div className="preloader-stage">
        <div data-paper className="preloader-paper">
          <span data-shadow className="preloader-shadow" />
          {SHEETS.map(([front, back], i) => (
            <div key={i} data-sheet className="sheet" style={{ zIndex: SHEETS.length - i }}>
              <div className="sheet-face">
                <Face variant={front} />
              </div>
              <div className="sheet-face sheet-face-back">
                <Face variant={back} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div data-meta className="preloader-meta">
        <span className="eyebrow">
          {personalInfo.edition.volume} — {personalInfo.edition.label}
        </span>
        <span className="preloader-progress">
          <i data-progress />
        </span>
        <span className="eyebrow tabular-nums">
          <span data-counter>000</span> / 100
        </span>
      </div>
    </div>
  );
}
