"use client";

import { useEffect, useRef, type RefObject } from "react";
import { X } from "lucide-react";
import type { NavItem, SectionId } from "@/types/portfolio";
import { gsap, useGSAP, EASE, MEDIA } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  id: string;
  open: boolean;
  onClose: () => void;
  items: NavItem[];
  activeId: SectionId;
  /** The button that opened the menu; focus returns to it on close. */
  returnFocusRef: RefObject<HTMLButtonElement | null>;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileMenu({
  id,
  open,
  onClose,
  items,
  activeId,
  returnFocusRef,
}: MobileMenuProps) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  const prevOpenForAnim = useRef(false);

  // Scroll lock, Escape and focus management.
  useEffect(() => {
    if (!open) {
      if (wasOpen.current) {
        returnFocusRef.current?.focus();
      }
      wasOpen.current = false;
      return;
    }
    wasOpen.current = true;

    const { body, documentElement } = document;
    const prevOverflow = body.style.overflow;
    const scrollbar = window.innerWidth - documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 60);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !ref.current) return;
      const nodes = Array.from(ref.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKey);
      body.style.overflow = prevOverflow;
      body.style.paddingRight = "";
    };
  }, [open, onClose, returnFocusRef]);

  // Open / close animation.
  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const reduce = window.matchMedia(MEDIA.reduce).matches;
      const links = gsap.utils.toArray<HTMLElement>("[data-menu-item]", root);
      const rules = gsap.utils.toArray<HTMLElement>("[data-menu-rule]", root);
      const previouslyOpen = prevOpenForAnim.current;
      prevOpenForAnim.current = open;

      if (reduce) {
        gsap.set(root, { autoAlpha: open ? 1 : 0 });
        gsap.set([links, rules], { clearProps: "all" });
        return;
      }

      if (open) {
        const tl = gsap.timeline({ defaults: { ease: EASE.expo } });
        tl.set(root, { visibility: "visible" })
          .fromTo(
            root,
            { clipPath: "inset(0 0 100% 0)", opacity: 1 },
            { clipPath: "inset(0 0 0% 0)", duration: 0.7 },
          )
          .fromTo(
            links,
            { yPercent: 110 },
            { yPercent: 0, duration: 0.8, stagger: 0.06 },
            "-=0.35",
          )
          .fromTo(
            rules,
            { scaleX: 0, transformOrigin: "left center" },
            { scaleX: 1, duration: 0.6, stagger: 0.05 },
            "<0.1",
          );
      } else if (previouslyOpen) {
        gsap.timeline({ defaults: { ease: EASE.inOut } })
          .to(links, { yPercent: -110, duration: 0.35, stagger: 0.03 })
          .to(root, { clipPath: "inset(0 0 100% 0)", duration: 0.5 }, "-=0.2")
          .set(root, { visibility: "hidden" });
      } else {
        gsap.set(root, { autoAlpha: 0 });
      }
    },
    { scope: ref, dependencies: [open] },
  );

  return (
    <div
      ref={ref}
      id={id}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      inert={!open}
      className="fixed inset-0 z-[60] bg-background text-foreground [padding-bottom:env(safe-area-inset-bottom)] [padding-top:env(safe-area-inset-top)]"
      style={{ visibility: "hidden" }}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close menu"
        className="absolute top-[max(0.75rem,env(safe-area-inset-top))] right-[max(1rem,env(safe-area-inset-right))] z-10 inline-flex size-10 items-center justify-center border border-border bg-background transition-colors hover:border-foreground"
      >
        <X aria-hidden="true" className="size-5" />
      </button>

      <nav aria-label="Mobile" className="container-editorial h-full overflow-y-auto pt-[calc(var(--header-height)+0.5rem)] pb-6">
        <ul className="flex flex-col">
          {items.map((item) => {
            const active = item.id === activeId;
            return (
              <li key={item.id} className="relative">
                <span data-menu-rule className="ink-rule block" aria-hidden="true" />
                <a
                  href={item.href}
                  onClick={onClose}
                  aria-current={active ? "location" : undefined}
                  className="group flex items-baseline justify-between gap-6 py-4 sm:py-5"
                >
                  <span className="reveal-line">
                    <span
                      data-menu-item
                      className={cn(
                        "font-display text-[clamp(2.5rem,10vw,4.5rem)] leading-[0.9] font-black uppercase tracking-tight transition-colors duration-300",
                        active ? "text-accent" : "group-hover:text-accent",
                      )}
                    >
                      {item.label}
                    </span>
                  </span>
                  <span className="eyebrow flex items-center gap-2 text-muted-foreground">
                    {item.number}
                    <span
                      aria-hidden="true"
                      className={cn("block size-1.5", active ? "bg-accent" : "bg-border")}
                    />
                  </span>
                </a>
              </li>
            );
          })}
          <li>
            <span data-menu-rule className="ink-rule block" aria-hidden="true" />
          </li>
        </ul>
      </nav>
    </div>
  );
}
