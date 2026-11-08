"use client";

import { useRef, useState, type CSSProperties } from "react";
import { about, personalInfo } from "@/data/portfolio";
import { gsap, useGSAP, EASE, MEDIA } from "@/lib/animations";
import { isPreloaderDone, markPreloaderDone } from "@/lib/preloader";

/* ------------------------------------------------------------------ */
/* Newspaper page content (decorative, scaled with container units)    */
/* ------------------------------------------------------------------ */

type Variant = "cover" | "story" | "figure" | "quote" | "index" | "home";

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
    // Home sketch: real headlines stay visible; copy, image and CTAs are blank.
    case "home":
      return (
        <div className="np np-home">
          <div className="np-home-header">
            <span className="np-home-brand">{info.shortName}</span>
            <span className="np-home-nav">
              <i />
              <i />
              <i />
              <i />
            </span>
          </div>
          <div className="np-rule" />
          <p className="np-home-masthead">{info.location}</p>
          <div className="np-home-hero">
            <div className="np-home-text">
              <p className="np-home-headline">
                {info.headline.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </p>
              <span className="np-home-underline" />
              <p className="np-home-tagline">{info.tagline}</p>
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
      const meta = q("[data-meta]");
      const metaItems = q("[data-meta] > *");
      const progress = q("[data-progress]");
      const counterEl = root.querySelector<HTMLElement>("[data-counter]");
      const counter = { value: 0 };

      const FLIP = 0.95;
      const GAP = 0.55;

      const paperWidth = (paper[0] as HTMLElement | undefined)?.offsetWidth ?? 800;
      const lift = Math.min(90, paperWidth * 0.14);
      gsap.set(paper, { transformPerspective: Math.max(1800, paperWidth * 1.8) });
      gsap.set(sheets, {
        transformOrigin: "left center",
        force3D: true,
        z: 0.01,
      });
      gsap.set(q(".sheet-curl"), { transformOrigin: "left center", force3D: true });
      sheets.forEach((sheet, i) => gsap.set(sheet, { zIndex: sheets.length - i }));

      const tl = gsap.timeline({
        defaults: { ease: EASE.expo, force3D: true },
        onComplete: () => {
          html.style.overflow = prevOverflow;
          setHidden(true);
        },
      });

      // Soft fade only — no y/x travel (those read as a bounce on reload).
      tl.from(paper, { autoAlpha: 0, duration: 0.55, ease: "power1.out" }).from(
        metaItems,
        { autoAlpha: 0, duration: 0.4, stagger: 0.06, ease: "power1.out" },
        "-=0.3",
      );

      let t = tl.duration() + 0.2;
      const openAt = t;
      const frontPage = sheets[FLIPS];

      for (let i = 0; i < FLIPS; i++) {
        const sheet = sheets[i];
        const curls = sheet.querySelectorAll<HTMLElement>(".sheet-curl");
        // Natural paper turn: page lifts toward the camera, free edge lags via
        // an inner curl, shade peaks when the leaf is edge-on, then settles.
        tl.set(sheet, { zIndex: 100 }, t)
          .to(
            sheet,
            {
              keyframes: [
                { rotateY: -100, z: lift, duration: FLIP * 0.55, ease: "power2.in" },
                { rotateY: -180, z: 0, duration: FLIP * 0.45, ease: "power2.out" },
              ],
            },
            t,
          )
          .to(
            curls,
            {
              keyframes: [
                { rotateY: 14, duration: FLIP * 0.45, ease: "sine.out" },
                { rotateY: 0, duration: FLIP * 0.55, ease: "sine.in" },
              ],
            },
            t,
          )
          .to(sheet, { "--shade": 0.7, duration: FLIP * 0.5, ease: "sine.out" }, t)
          .to(sheet, { "--shade": 0, duration: FLIP * 0.5, ease: "sine.in" }, t + FLIP * 0.5)
          .set(sheet, { zIndex: 50 + i, z: 0 }, t + FLIP)
          .set(curls, { rotateY: 0 }, t + FLIP);
        t += GAP;
      }

      const flipsEnd = t - GAP + FLIP;

      tl.to(
        counter,
        {
          value: 100,
          duration: flipsEnd - openAt,
          ease: "power1.inOut",
          onUpdate: () => {
            if (counterEl) counterEl.textContent = String(Math.round(counter.value)).padStart(3, "0");
          },
        },
        openAt,
      ).to(progress, { scaleX: 1, duration: flipsEnd - openAt, ease: "power1.inOut" }, openAt);

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
        .to(meta, { autoAlpha: 0, duration: 0.3 }, zoom - 0.1)
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
                <div className="sheet-curl">
                  <Face variant={front} />
                </div>
              </div>
              <div className="sheet-face sheet-face-back">
                <div className="sheet-curl">
                  <Face variant={back} />
                </div>
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
