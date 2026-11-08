"use client";

import { useRef, useState, type CSSProperties } from "react";
import { gsap, useGSAP, EASE, MEDIA } from "@/lib/animations";
import { isPreloaderDone, markPreloaderDone } from "@/lib/preloader";

/* ------------------------------------------------------------------ */
/* Decorative newsprint — intentionally different from site copy       */
/* ------------------------------------------------------------------ */

const PRESS = {
  issue: "No. 214",
  section: "Morning Dispatch",
  masthead: "The Daily Signal",
  desk: "City desk",
  city: "Late edition",
  coverLead: "CITY WAKES TO A QUIETER HORIZON AFTER THE STORM",
  storyEyebrow: "Inside the archive",
  storyLead: "NOTES FROM A LONG WEEK ON THE PRINTING FLOOR",
  figureEyebrow: "Photo plate",
  figureCaption: "Press room, early light.",
  quote: "Ink still drying. Hold the page by the edges.",
  indexTitle: "Today’s brief",
  indexItems: ["Weather & tide", "Market ledger", "Letters desk", "Classifieds", "Sports wrap"],
  homeBrand: "The Signal",
  homePlace: "Printed at dawn",
  homeHeadline: ["HOLD THE LINE", "UNTIL THE INK", "SETTLES CLEAN.", "TURN THE PAGE."],
  homeTagline: "A morning paper for restless minds.",
};

type Variant = "cover" | "story" | "figure" | "quote" | "index" | "home";

function Lines({ n, className = "" }: { n: number; className?: string }) {
  return <div className={`np-lines ${className}`} style={{ "--n": n } as CSSProperties} />;
}

function Face({ variant }: { variant: Variant }) {
  switch (variant) {
    case "cover":
      return (
        <div className="np">
          <div className="np-eyebrow np-between">
            <span>{PRESS.issue}</span>
            <span>{PRESS.section}</span>
          </div>
          <div className="np-rule np-rule-thick" />
          <p className="np-masthead">{PRESS.masthead}</p>
          <div className="np-rule" />
          <div className="np-eyebrow np-between">
            <span>{PRESS.desk}</span>
            <span>{PRESS.city}</span>
          </div>
          <p className="np-headline">{PRESS.coverLead}</p>
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
          <p className="np-eyebrow">{PRESS.storyEyebrow}</p>
          <div className="np-rule" />
          <p className="np-headline">{PRESS.storyLead}</p>
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
            <span>{PRESS.figureEyebrow}</span>
            <span>p. 07</span>
          </p>
          <div className="np-rule" />
          <div className="np-figure np-figure-wide" />
          <p className="np-caption">{PRESS.figureCaption}</p>
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
              <p className="np-quote">“{PRESS.quote}”</p>
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
            <span>{PRESS.indexTitle}</span>
            <span>{PRESS.issue}</span>
          </p>
          <div className="np-rule np-rule-thick" />
          <ul className="np-list">
            {PRESS.indexItems.map((item, i) => (
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
    // Home-shaped sketch with press copy — not the site's own lines.
    case "home":
      return (
        <div className="np np-home">
          <div className="np-home-header">
            <span className="np-home-brand">{PRESS.homeBrand}</span>
            <span className="np-home-nav">
              <i />
              <i />
              <i />
              <i />
            </span>
          </div>
          <div className="np-rule" />
          <p className="np-home-masthead">{PRESS.homePlace}</p>
          <div className="np-home-hero">
            <div className="np-home-text">
              <p className="np-home-headline">
                {PRESS.homeHeadline.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </p>
              <span className="np-home-underline" />
              <p className="np-home-tagline">{PRESS.homeTagline}</p>
              <Lines n={3} className="np-home-copy" />
              <div className="np-home-socials">
                <span />
                <span />
                <span />
              </div>
              <div className="np-home-cta">
                <span className="np-block" />
                <span className="np-block np-block-outline" />
              </div>
            </div>
            <div className="np-home-figure">
              <span className="np-home-backdrop" />
              <div className="np-home-portrait" />
            </div>
          </div>
          <div className="np-rule" />
          <div className="np-cols" style={{ "--cols": 3 } as CSSProperties}>
            <Lines n={7} />
            <Lines n={7} />
            <Lines n={7} />
          </div>
        </div>
      );
  }
}

/** [front, back] for each sheet, cover first. */
const SHEETS: [Variant, Variant][] = [
  ["cover", "story"],
  ["figure", "quote"],
  ["index", "story"],
  ["figure", "cover"],
  ["home", "index"],
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

      const FLIP = 0.72;
      const GAP = 0.5;

      const paperWidth = (paper[0] as HTMLElement | undefined)?.offsetWidth ?? 800;
      gsap.set(sheets, {
        transformPerspective: Math.max(1600, paperWidth * 1.6),
        transformOrigin: "left center",
      });
      sheets.forEach((sheet, i) => gsap.set(sheet, { zIndex: sheets.length - i }));

      const tl = gsap.timeline({
        defaults: { ease: EASE.expo },
        onComplete: () => {
          html.style.overflow = prevOverflow;
          setHidden(true);
        },
      });

      // Soft fade only — no y/x travel (those read as a bounce on reload).
      tl.from(paper, { autoAlpha: 0, duration: 0.55, ease: "power1.out" });

      let t = tl.duration() + 0.2;
      const frontPage = sheets[FLIPS];

      for (let i = 0; i < FLIPS; i++) {
        const sheet = sheets[i];
        tl.set(sheet, { zIndex: 100 }, t)
          .to(sheet, { rotateY: -180, duration: FLIP, ease: "power2.inOut" }, t)
          .to(sheet, { "--shade": 0.55, duration: FLIP / 2, ease: "sine.in" }, t)
          .to(sheet, { "--shade": 0, duration: FLIP / 2, ease: "sine.out" }, t + FLIP / 2)
          .set(sheet, { zIndex: 50 + i }, t + FLIP);
        t += GAP;
      }

      const flipsEnd = t - GAP + FLIP;

      // Right page (home sketch) zooms flush onto the screen, then the real
      // hero/header entrance plays underneath as the paper dissolves.
      const zoom = flipsEnd + 0.55;
      const turned = sheets.slice(0, FLIPS);
      const shadow = q("[data-shadow]");
      const ZOOM = 1.3;

      const fit = { scale: 1, x: 0, y: 0 };
      const measureFit = () => {
        if (!frontPage) return;
        const rect = frontPage.getBoundingClientRect();
        let scale = window.innerWidth / rect.width;
        if (rect.height * scale < window.innerHeight) scale = window.innerHeight / rect.height;
        fit.scale = scale;
        fit.x = (window.innerWidth - rect.width * scale) / 2 - rect.left;
        fit.y = -rect.top;
      };

      tl.add(measureFit, zoom)
        .set(frontPage, { zIndex: 200, transformOrigin: "0 0", force3D: true }, zoom)
        .to([...turned, ...shadow], { autoAlpha: 0, duration: 0.4, ease: "power2.out" }, zoom)
        .to(
          frontPage,
          {
            scale: () => fit.scale,
            x: () => fit.x,
            y: () => fit.y,
            duration: ZOOM,
            ease: "power3.inOut",
            force3D: true,
          },
          zoom,
        )
        .add(() => markPreloaderDone(), zoom + ZOOM)
        .to(root, { autoAlpha: 0, duration: 0.7, ease: "power2.inOut" }, zoom + ZOOM + 0.05);

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
    </div>
  );
}
