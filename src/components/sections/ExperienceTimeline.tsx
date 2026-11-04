"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import type { ExperienceItem } from "@/types/portfolio";
import { SkillTag } from "@/components/ui/SkillTag";
import { gsap, useGSAP, EASE, enterTrigger, withMotion } from "@/lib/animations";
import { cn, pad } from "@/lib/utils";

interface ExperienceTimelineProps {
  items: ExperienceItem[];
}

export function ExperienceTimeline({ items }: ExperienceTimelineProps) {
  const ref = useRef<HTMLOListElement>(null);
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const baseId = useId();

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const rows = gsap.utils.toArray<HTMLElement>("[data-row]", root);
      const progress = root.querySelector<HTMLElement>("[data-progress]");

      return withMotion(() => {
        gsap.from(rows, {
          y: 32,
          autoAlpha: 0,
          duration: 0.8,
          ease: EASE.out,
          stagger: 0.12,
          scrollTrigger: enterTrigger(root, "top 80%"),
        });
        gsap.from(gsap.utils.toArray<HTMLElement>("[data-row-rule]", root), {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1,
          ease: EASE.expo,
          stagger: 0.12,
          scrollTrigger: enterTrigger(root, "top 80%"),
        });
        if (progress) {
          gsap.fromTo(
            progress,
            { scaleY: 0, transformOrigin: "top center" },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: { trigger: root, start: "top 70%", end: "bottom 60%", scrub: 0.5 },
            },
          );
        }
      });
    },
    { scope: ref },
  );

  return (
    <ol ref={ref} className="relative" aria-label="Positions held">
      {/* Scroll-linked progress rail (desktop) */}
      <span
        aria-hidden="true"
        className="absolute top-0 bottom-0 -left-6 hidden w-px bg-border xl:block"
      >
        <span data-progress className="block h-full w-full bg-accent" />
      </span>

      {items.map((item, index) => {
        const open = openId === item.id;
        const panelId = `${baseId}-panel-${item.id}`;
        const buttonId = `${baseId}-button-${item.id}`;
        const hasDetails = item.highlights.length > 0;

        return (
          <li key={item.id} data-row className="group/row relative">
            <span data-row-rule aria-hidden="true" className="ink-rule block" />

            <div
              className={cn(
                "relative grid gap-x-8 gap-y-4 py-7 transition-colors duration-300 sm:py-8 lg:grid-cols-12 lg:items-start lg:gap-y-0",
                "lg:-mx-4 lg:px-4 lg:hover:bg-muted/60 lg:focus-within:bg-muted/60",
              )}
            >
              {/* Date column */}
              <div className="flex items-center justify-between lg:col-span-2 lg:block">
                <div className="flex items-center gap-3">
                  <span className="eyebrow text-accent">{pad(index + 1)}</span>
                  <span className="font-mono text-xs tracking-[0.12em] uppercase">
                    {item.startDate} — {item.endDate}
                  </span>
                </div>
                <span className="eyebrow mt-2 block text-muted-foreground">{item.employmentType}</span>
              </div>

              {/* Role column */}
              <div className="lg:col-span-4">
                <h3 className="text-display-sm transition-colors duration-300 group-hover/row:text-accent">
                  {item.role}
                </h3>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2.5">
                    {item.companyLogo ? (
                      <Image
                        src={item.companyLogo.src}
                        alt=""
                        width={item.companyLogo.width ?? 40}
                        height={item.companyLogo.height ?? 40}
                        className="size-9 shrink-0 border border-border bg-[#0a0a0a] object-contain p-1"
                        aria-hidden="true"
                      />
                    ) : null}
                    {item.companyUrl ? (
                      <a
                        href={item.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline inline-flex items-center gap-1 font-medium text-foreground"
                      >
                        {item.company}
                        <ArrowUpRight aria-hidden="true" className="size-3.5" />
                      </a>
                    ) : (
                      <span className="font-medium text-foreground">{item.company}</span>
                    )}
                  </span>
                  {item.location ? (
                    <>
                      <span aria-hidden="true" className="block size-1 bg-border" />
                      <span>{item.location}</span>
                    </>
                  ) : null}
                </div>
              </div>

              {/* Description column */}
              <div className="lg:col-span-6">
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {item.description}
                </p>

                {hasDetails ? (
                  <>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenId(open ? null : item.id)}
                      className="mt-4 inline-flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-foreground transition-colors duration-300 hover:text-accent"
                    >
                      <span className="link-underline">{open ? "Hide highlights" : "Show highlights"}</span>
                      <ChevronDown
                        aria-hidden="true"
                        className={cn(
                          "size-3.5 transition-transform duration-300 ease-editorial",
                          open && "rotate-180",
                        )}
                      />
                    </button>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="expandable"
                      data-open={open}
                    >
                      <div inert={!open}>
                        <ul className="mt-4 flex flex-col gap-2 border-l-2 border-accent pl-4">
                          {item.highlights.map((highlight) => (
                            <li key={highlight} className="text-sm leading-relaxed text-foreground/85">
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </>
                ) : null}

                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
                  {item.technologies.map((tech) => (
                    <SkillTag key={tech}>{tech}</SkillTag>
                  ))}
                </ul>
              </div>

            </div>
          </li>
        );
      })}
      <li aria-hidden="true">
        <span data-row-rule className="ink-rule block" />
      </li>
    </ol>
  );
}
