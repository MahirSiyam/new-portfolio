"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";
import type { NavItem, SectionId } from "@/types/portfolio";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { gsap, useGSAP, EASE, MEDIA } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface HeaderProps {
  name: string;
  shortName: string;
  items: NavItem[];
  email: string;
}

export function Header({ name, shortName, items, email }: HeaderProps) {
  const ref = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState<SectionId>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Active-section tracking.
  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let best: { id: string; ratio: number } | null = null;
        for (const [id, ratio] of visible) {
          if (ratio > 0 && (!best || ratio > best.ratio)) best = { id, ratio };
        }
        if (best) setActive(best.id as SectionId);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  // Compact header after scrolling.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Entrance.
  useGSAP(
    () => {
      if (!ref.current || window.matchMedia(MEDIA.reduce).matches) return;
      gsap.from(ref.current, { y: -16, autoAlpha: 0, duration: 0.7, ease: EASE.out, delay: 0.1 });
    },
    { scope: ref },
  );

  return (
    <>
      <header
        ref={ref}
        className={cn(
          "sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md transition-[background-color,border-color] duration-300 [padding-top:env(safe-area-inset-top)]",
          scrolled && "bg-background/[0.97]",
        )}
      >
        <div className="container-editorial flex h-(--header-height) items-center justify-between gap-4">
          {/* Brand */}
          <a
            href="#home"
            className="group flex min-w-0 items-center gap-3"
            aria-label={`${name}, back to top`}
          >
            <span aria-hidden="true" className="block size-2.5 shrink-0 bg-accent transition-transform duration-300 group-hover:rotate-45" />
            <span className="font-display truncate text-xl font-black tracking-tight uppercase sm:text-2xl">
              {shortName}
            </span>
          </a>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1 xl:gap-2">
              {items
                .filter((item) => item.id !== "contact")
                .map((item) => {
                  const isActive = item.id === active;
                  return (
                    <li key={item.id}>
                      <a
                        href={item.href}
                        aria-current={isActive ? "location" : undefined}
                        className={cn(
                          "group/nav relative flex items-center px-2.5 py-2 font-mono text-[0.66rem] uppercase tracking-[0.16em] transition-colors duration-300 xl:px-3",
                          isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        <span>{item.label}</span>
                        <span
                          aria-hidden="true"
                          className={cn(
                            "absolute right-2.5 bottom-0.5 left-2.5 h-px origin-left bg-accent transition-transform duration-300 ease-editorial xl:right-3 xl:left-3",
                            isActive ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-100",
                          )}
                        />
                      </a>
                    </li>
                  );
                })}
            </ul>
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            {email ? (
              <a
                href="#contact"
                className="hidden items-center border border-foreground bg-foreground px-4 py-2.5 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-background transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-accent-foreground xl:inline-flex"
              >
                Contact
              </a>
            ) : null}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="inline-flex size-10 items-center justify-center border border-border bg-surface transition-colors duration-300 hover:border-foreground lg:hidden"
            >
              <Menu aria-hidden="true" className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        id="mobile-menu"
        open={menuOpen}
        onClose={closeMenu}
        items={items}
        activeId={active}
        returnFocusRef={menuButtonRef}
      />
    </>
  );
}
