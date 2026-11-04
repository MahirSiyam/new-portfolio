"use client";

import { useId, useMemo, useRef, useState } from "react";
import type { Project, ProjectCategory } from "@/types/portfolio";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { gsap, useGSAP, EASE, MEDIA, enterTrigger } from "@/lib/animations";
import { cn, pad } from "@/lib/utils";

type Filter = "All" | ProjectCategory;

interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<Filter>("All");
  const [pending, setPending] = useState(false);
  const interacted = useRef(false);
  const listId = useId();

  const categories = useMemo<Filter[]>(() => {
    const seen = new Set<ProjectCategory>();
    for (const project of projects) seen.add(project.category);
    return ["All", ...Array.from(seen)];
  }, [projects]);

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [projects, filter],
  );

  // Entrance for the current set of cards: scroll-triggered the first time,
  // immediate after a filter change.
  useGSAP(
    () => {
      const grid = gridRef.current;
      if (!grid) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-project-card]", grid);
      if (!cards.length) return;
      if (window.matchMedia(MEDIA.reduce).matches) {
        gsap.set(cards, { clearProps: "all" });
        return;
      }
      const thumbs = cards.map((card) => card.querySelector<HTMLElement>("[data-thumb]"));

      const tl = gsap.timeline({
        defaults: { ease: EASE.out },
        scrollTrigger: interacted.current ? undefined : enterTrigger(grid, "top 78%"),
      });
      // fromTo (not from): after a filter change the surviving cards still
      // carry the inline "hidden" styles from the exit tween.
      tl.fromTo(
        cards,
        { y: 36, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, clearProps: "transform" },
      ).fromTo(
        thumbs.filter(Boolean),
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 0.9,
          ease: EASE.expo,
          stagger: 0.1,
          clearProps: "clipPath",
        },
        "<0.1",
      );
    },
    { scope: gridRef, dependencies: [visible] },
  );

  function changeFilter(next: Filter) {
    if (next === filter || pending) return;
    interacted.current = true;
    const grid = gridRef.current;
    const cards = grid ? gsap.utils.toArray<HTMLElement>("[data-project-card]", grid) : [];
    if (!cards.length || window.matchMedia(MEDIA.reduce).matches) {
      setFilter(next);
      return;
    }
    setPending(true);
    gsap.to(cards, {
      y: -14,
      autoAlpha: 0,
      duration: 0.25,
      ease: EASE.inOut,
      stagger: 0.03,
      onComplete: () => {
        setFilter(next);
        setPending(false);
      },
    });
  }

  return (
    <div>
      {/* Filters */}
      <div
        role="group"
        aria-label="Filter projects by category"
        className="flex flex-wrap items-center gap-2 border-y border-border py-4"
      >
        <span className="eyebrow mr-2 text-muted-foreground">Filter</span>
        {categories.map((category) => {
          const selected = category === filter;
          const count =
            category === "All" ? projects.length : projects.filter((p) => p.category === category).length;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={selected}
              aria-controls={listId}
              onClick={() => changeFilter(category)}
              className={cn(
                "inline-flex items-center gap-2 border px-3 py-2 font-mono text-[0.66rem] uppercase tracking-[0.16em] transition-colors duration-300 ease-editorial",
                selected
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-transparent text-muted-foreground hover:border-foreground hover:text-foreground",
              )}
            >
              {category}
              <span className={cn("text-[0.58rem]", selected ? "text-accent" : "text-muted-foreground/70")}>
                {pad(count)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div
        id={listId}
        ref={gridRef}
        aria-live="polite"
        aria-busy={pending}
        className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3"
      >
        {visible.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={projects.findIndex((p) => p.id === project.id)}
          />
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="mt-10 text-sm text-muted-foreground">No projects in this category yet.</p>
      ) : null}
    </div>
  );
}
