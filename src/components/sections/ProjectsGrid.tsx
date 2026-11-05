"use client";

import { useRef } from "react";
import type { Project } from "@/types/portfolio";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { gsap, useGSAP, EASE, MEDIA, enterTrigger } from "@/lib/animations";

interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const featured = projects.filter((project) => project.featured);
  const archive = projects.filter((project) => !project.featured);
  const lead = featured[0] ?? archive[0];
  const companions = featured[0] ? featured.slice(1) : archive.slice(1);
  const further = featured[0] ? archive : [];

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-project-card]", root);
      if (!cards.length) return;
      if (window.matchMedia(MEDIA.reduce).matches) {
        gsap.set(cards, { clearProps: "all" });
        return;
      }
      const thumbs = cards
        .map((card) => card.querySelector<HTMLElement>("[data-thumb]"))
        .filter((thumb): thumb is HTMLElement => Boolean(thumb));

      gsap
        .timeline({
          defaults: { ease: EASE.out },
          scrollTrigger: enterTrigger(root, "top 78%"),
        })
        .fromTo(
          cards,
          { y: 36, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.08, clearProps: "transform" },
        )
        .fromTo(
          thumbs,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 0.9,
            ease: EASE.expo,
            stagger: 0.08,
            clearProps: "clipPath",
          },
          "<0.1",
        );
    },
    { scope: rootRef },
  );

  if (!lead) return null;

  const showcase = [lead, ...companions, ...further];
  const displayIndex = (project: Project) => showcase.findIndex((item) => item.id === project.id);

  return (
    <div ref={rootRef} className="flex flex-col gap-14 lg:gap-20">
      <ProjectCard
        project={lead}
        index={displayIndex(lead)}
        layout="feature"
      />

      {companions.length > 0 ? (
        <div className="grid gap-x-8 gap-y-14 border-t border-border pt-10 md:grid-cols-2 lg:gap-x-10 lg:pt-14">
          {companions.map((project, index) => {
            const spansRow = companions.length % 2 === 1 && index === companions.length - 1;
            return (
              <ProjectCard
                key={project.id}
                project={project}
                index={displayIndex(project)}
                layout={spansRow ? "wide" : "card"}
                className={spansRow ? "md:col-span-2" : undefined}
              />
            );
          })}
        </div>
      ) : null}

      {further.length > 0 ? (
        <div>
          <p className="eyebrow border-t border-foreground pt-4 text-muted-foreground">Further work</p>
          <div className="mt-2">
            {further.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={displayIndex(project)}
                layout="row"
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
