"use client";

import { useRef, useState, type CSSProperties } from "react";
import { gsap, useGSAP, EASE, MEDIA } from "@/lib/animations";
import { isPreloaderDone, markPreloaderDone } from "@/lib/preloader";

/* ------------------------------------------------------------------ */
/* Decorative newsprint — every face has unique copy, none repeats     */
/* ------------------------------------------------------------------ */

type Variant =
  | "cover"
  | "pressFloor"
  | "photoPlate"
  | "marginNote"
  | "morningBrief"
  | "harborWatch"
  | "atlasSpread"
  | "colophon"
  | "window"
  | "closingMark";

function Lines({ n, className = "" }: { n: number; className?: string }) {
  return <div className={`np-lines ${className}`} style={{ "--n": n } as CSSProperties} />;
}

function Face({ variant }: { variant: Variant }) {
  switch (variant) {
    case "cover":
      return (
        <div className="np">
          <div className="np-eyebrow np-between">
            <span>No. 214</span>
            <span>Morning Dispatch</span>
          </div>
          <div className="np-rule np-rule-thick" />
          <p className="np-masthead">The Daily Signal</p>
          <div className="np-rule" />
          <div className="np-eyebrow np-between">
            <span>City desk</span>
            <span>Late edition</span>
          </div>
          <p className="np-headline">CITY WAKES TO A QUIETER HORIZON AFTER THE STORM</p>
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
    case "pressFloor":
      return (
        <div className="np">
          <p className="np-eyebrow">Inside the archive</p>
          <div className="np-rule" />
          <p className="np-headline">NOTES FROM A LONG WEEK ON THE PRINTING FLOOR</p>
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
    case "photoPlate":
      return (
        <div className="np">
          <p className="np-eyebrow np-between">
            <span>Photo plate</span>
            <span>p. 07</span>
          </p>
          <div className="np-rule" />
          <div className="np-figure np-figure-wide" />
          <p className="np-caption">Press room, early light.</p>
          <div className="np-cols" style={{ "--cols": 2 } as CSSProperties}>
            <Lines n={8} />
            <Lines n={8} />
          </div>
        </div>
      );
    case "marginNote":
      return (
        <div className="np">
          <div className="np-cols" style={{ "--cols": 2 } as CSSProperties}>
            <Lines n={14} />
            <div>
              <div className="np-rule np-rule-thick" />
              <p className="np-quote">“Ink still drying. Hold the page by the edges.”</p>
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
    case "morningBrief":
      return (
        <div className="np">
          <p className="np-eyebrow np-between">
            <span>Today’s brief</span>
            <span>Sec. A</span>
          </p>
          <div className="np-rule np-rule-thick" />
          <ul className="np-list">
            {["Weather & tide", "Market ledger", "Letters desk", "Classifieds", "Sports wrap"].map(
              (item, i) => (
                <li key={item} className="np-row">
                  <span>{item}</span>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                </li>
              ),
            )}
          </ul>
          <div className="np-cols" style={{ "--cols": 2 } as CSSProperties}>
            <Lines n={6} />
            <Lines n={6} />
          </div>
        </div>
      );
    case "harborWatch":
      return (
        <div className="np">
          <p className="np-eyebrow">Harbor watch</p>
          <div className="np-rule" />
          <p className="np-headline">FOG LIFTS OVER THE NORTH PIER BEFORE NOON</p>
          <div className="np-cols" style={{ "--cols": 3 } as CSSProperties}>
            <Lines n={11} />
            <Lines n={11} />
            <Lines n={11} />
          </div>
          <div className="np-rule" />
          <div className="np-cols" style={{ "--cols": 2 } as CSSProperties}>
            <Lines n={6} />
            <Lines n={6} />
          </div>
        </div>
      );
    case "atlasSpread":
      return (
        <div className="np">
          <p className="np-eyebrow np-between">
            <span>Atlas insert</span>
            <span>p. 12</span>
          </p>
          <div className="np-rule" />
          <div className="np-figure np-figure-wide" />
          <p className="np-caption">Rail lines drawn before the first train.</p>
          <div className="np-cols" style={{ "--cols": 2 } as CSSProperties}>
            <Lines n={7} />
            <Lines n={7} />
          </div>
        </div>
      );
    case "colophon":
      return (
        <div className="np">
          <div className="np-eyebrow np-between">
            <span>Colophon</span>
            <span>Sheet 09</span>
          </div>
          <div className="np-rule np-rule-thick" />
          <p className="np-masthead">Set in Metal</p>
          <div className="np-rule" />
          <div className="np-eyebrow np-between">
            <span>Type room</span>
            <span>Night shift</span>
          </div>
          <p className="np-headline">EVERY MARK COUNTS WHEN THE FORM IS LOCKED</p>
          <div className="np-cols" style={{ "--cols": 2 } as CSSProperties}>
            <div className="np-figure" />
            <Lines n={8} />
          </div>
          <div className="np-cols" style={{ "--cols": 3 } as CSSProperties}>
            <Lines n={3} />
            <Lines n={3} />
            <Lines n={3} />
          </div>
        </div>
      );
    // See-through page: real header + hero show through the top; blank
    // newsprint fills the rest so it still reads as a full newspaper leaf.
    case "window":
      return (
        <div className="np np-window">
          <div className="np-window-hero" />
          <div data-window-lines className="np np-window-body">
            <div className="np-rule" />
            <div className="np-cols" style={{ "--cols": 3 } as CSSProperties}>
              <Lines n={9} />
              <Lines n={9} />
              <Lines n={9} />
            </div>
            <div className="np-rule" />
            <div className="np-cols" style={{ "--cols": 2 } as CSSProperties}>
              <Lines n={8} />
              <Lines n={8} />
            </div>
          </div>
        </div>
      );
    case "closingMark":
      return (
        <div className="np">
          <p className="np-eyebrow np-between">
            <span>End matter</span>
            <span>p. 16</span>
          </p>
          <div className="np-rule np-rule-thick" />
          <ul className="np-list">
            {["Publisher’s note", "Correction desk", "Paper stock", "Subscription", "Press credits"].map(
              (item, i) => (
                <li key={item} className="np-row">
                  <span>{item}</span>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                </li>
              ),
            )}
          </ul>
          <div className="np-cols" style={{ "--cols": 2 } as CSSProperties}>
            <Lines n={5} />
            <Lines n={5} />
          </div>
          <div className="np-rule" />
          <p className="np-caption">Fold once. Leave the rest for morning.</p>
        </div>
      );
  }
}

/** Ten unique faces — no layout/copy reused across the spread. */
const SHEETS: [Variant, Variant][] = [
  ["cover", "pressFloor"],
  ["photoPlate", "marginNote"],
  ["morningBrief", "harborWatch"],
  ["atlasSpread", "colophon"],
  ["window", "closingMark"],
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
      const site = document.querySelector<HTMLElement>("[data-site]");
      const releaseSite = () => {
        if (!site) return;
        site.style.clipPath = "";
        gsap.set(site, { clearProps: "transform,transformOrigin,clipPath,willChange" });
      };

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
          releaseSite();
          html.style.overflow = prevOverflow;
          setHidden(true);
        },
      });

      // Soft fade only — no y/x travel (those read as a bounce on reload).
      tl.from(paper, { autoAlpha: 0, duration: 0.55, ease: "power1.out" });

      let t = tl.duration() + 0.2;
      const frontPage = sheets[FLIPS];

      // Real site scaled into the window page, then grown back to 1:1.
      const geo = { scale: 1, x: 0, y: 0, clipH: 0 };
      const applyClip = () => {
        if (site) site.style.clipPath = `inset(0 0 calc(100% - ${geo.clipH}px) 0)`;
      };
      const siteIntoWindow = () => {
        if (!site || !frontPage) return;
        // Settle hero/header so the real homepage shows through the page.
        markPreloaderDone();
        const rect = frontPage.getBoundingClientRect();
        const heroBottom = document.getElementById("home")?.getBoundingClientRect().bottom ?? Infinity;
        geo.scale = rect.width / window.innerWidth;
        geo.x = rect.left;
        geo.y = rect.top;
        geo.clipH = Math.min(rect.height / geo.scale, heroBottom + window.scrollY);
        frontPage.style.setProperty("--hero-h", `${geo.clipH * geo.scale}px`);
        gsap.set(site, {
          transformOrigin: "0 0",
          x: geo.x,
          y: geo.y,
          scale: geo.scale,
          force3D: true,
          willChange: "transform",
        });
        applyClip();
        root.classList.add("is-window");
      };

      for (let i = 0; i < FLIPS; i++) {
        const sheet = sheets[i];
        if (i === FLIPS - 1) {
          tl.add(siteIntoWindow, t - 0.02).to(
            q("[data-shadow]"),
            { autoAlpha: 0, duration: FLIP, ease: "power1.out" },
            t - 0.02,
          );
        }
        tl.set(sheet, { zIndex: 100 }, t)
          .to(sheet, { rotateY: -180, duration: FLIP, ease: "power2.inOut" }, t)
          .to(sheet, { "--shade": 0.55, duration: FLIP / 2, ease: "sine.in" }, t)
          .to(sheet, { "--shade": 0, duration: FLIP / 2, ease: "sine.out" }, t + FLIP / 2)
          .set(sheet, { zIndex: 50 + i }, t + FLIP);
        t += GAP;
      }

      const flipsEnd = t - GAP + FLIP;

      // Window page + border + site zoom together, then dissolve.
      const isSmall = window.matchMedia("(max-width: 767px)").matches;
      const zoom = flipsEnd + 0.55;
      const turned = sheets.slice(0, FLIPS);
      const shadow = q("[data-shadow]");
      const ZOOM = isSmall ? 1.1 : 1.3;
      const zoomFrame = root.querySelector<HTMLElement>("[data-zoom-frame]");

      // Border follows the site’s live transform every frame — no separate tween lag.
      const syncBorderToSite = () => {
        if (!zoomFrame || !site) return;
        const vw = window.visualViewport?.width ?? window.innerWidth;
        const vh = window.visualViewport?.height ?? window.innerHeight;
        const s = Number(gsap.getProperty(site, "scale")) || geo.scale;
        const x = Number(gsap.getProperty(site, "x"));
        const y = Number(gsap.getProperty(site, "y"));
        gsap.set(zoomFrame, {
          left: x,
          top: y,
          width: vw * s,
          height: Math.min(geo.clipH * s, vh),
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          clearProps: "",
        });
      };

      const armZoom = () => {
        if (!frontPage) return;
        const rect = frontPage.getBoundingClientRect();
        const vw = window.visualViewport?.width ?? window.innerWidth;
        geo.scale = Math.max(rect.width / Math.max(vw, 1), 0.0001);
        geo.x = rect.left;
        geo.y = rect.top;
        if (site) {
          gsap.set(site, {
            transformOrigin: "0 0",
            x: geo.x,
            y: geo.y,
            scale: geo.scale,
            force3D: true,
          });
        }
        const face = frontPage.querySelector<HTMLElement>(".sheet-face-window");
        if (face) gsap.set(face, { borderColor: "transparent" });
        syncBorderToSite();
      };

      tl.add(armZoom, zoom)
        .set(frontPage, {
          zIndex: 200,
          transformOrigin: "0 0",
          transformPerspective: 0,
          transformStyle: "flat",
          force3D: true,
        }, zoom)
        .to([...turned, ...shadow, ...q("[data-window-lines]")], {
          autoAlpha: 0,
          duration: 0.35,
          ease: "power2.out",
        }, zoom)
        .to(
          frontPage,
          {
            scale: () => 1 / geo.scale,
            x: () => -geo.x,
            y: () => -geo.y,
            duration: ZOOM,
            ease: "power3.inOut",
            force3D: true,
          },
          zoom,
        )
        .to(
          site ?? [],
          {
            x: 0,
            y: 0,
            scale: 1,
            duration: ZOOM,
            ease: "power3.inOut",
            force3D: true,
            onUpdate: syncBorderToSite,
          },
          zoom,
        )
        .to(
          geo,
          {
            clipH: () => window.visualViewport?.height ?? window.innerHeight,
            duration: ZOOM,
            ease: "power3.inOut",
            onUpdate: () => {
              applyClip();
              syncBorderToSite();
            },
          },
          zoom,
        )
        .add(() => {
          releaseSite();
          html.style.overflow = prevOverflow;
        }, zoom + ZOOM)
        .to(zoomFrame ?? [], { opacity: 0, duration: 0.28, ease: "power2.out" }, zoom + ZOOM - 0.12)
        .to(frontPage, { autoAlpha: 0, duration: 0.3, ease: "power2.out" }, zoom + ZOOM - 0.12)
        .to(root, { autoAlpha: 0, duration: 0.35, ease: "power2.out" }, zoom + ZOOM);

      return () => {
        releaseSite();
        html.style.overflow = prevOverflow;
      };
    },
    { scope: ref },
  );

  if (hidden) return null;

  return (
    <div ref={ref} data-preloader aria-hidden="true" className="preloader">
      <span data-zoom-frame className="np-zoom-frame" aria-hidden="true" />
      <div className="preloader-stage">
        <div data-paper className="preloader-paper">
          <span data-shadow className="preloader-shadow" />
          {SHEETS.map(([front, back], i) => (
            <div key={i} data-sheet className="sheet" style={{ zIndex: SHEETS.length - i }}>
              <div className={front === "window" ? "sheet-face sheet-face-window" : "sheet-face"}>
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
