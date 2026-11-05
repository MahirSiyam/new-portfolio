"use client";

import { useState } from "react";
import { projects } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EditorialButton } from "@/components/ui/EditorialButton";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { pad } from "@/lib/utils";

const PREVIEW_COUNT = 4;

export function ProjectsSection() {
  const [showAll, setShowAll] = useState(false);
  const ordered = [
    ...projects.filter((project) => project.featured),
    ...projects.filter((project) => !project.featured),
  ];
  const visible = showAll ? ordered : ordered.slice(0, PREVIEW_COUNT);
  const remaining = ordered.length - Math.min(ordered.length, PREVIEW_COUNT);
  const featured = projects.filter((p) => p.featured).length;

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="border-t border-border bg-surface py-24 sm:py-28 lg:py-36"
    >
      <div className="container-editorial">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-8">
            <SectionHeading
              number={5}
              eyebrow="Featured editions"
              lines={["Selected", "projects."]}
              id="projects-heading"
              lede="A curated selection of products, systems, and digital experiences."
            />
          </div>
          <ScrollReveal className="lg:col-span-4 lg:pb-2" delay={0.3}>
            <dl className="grid grid-cols-3 gap-4 border-t border-border pt-4 font-mono text-[0.66rem] uppercase tracking-[0.16em] lg:border-t-0 lg:pt-0">
              <div>
                <dt className="text-muted-foreground">Projects</dt>
                <dd className="font-display mt-1 text-3xl font-black">{pad(projects.length)}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Featured</dt>
                <dd className="font-display mt-1 text-3xl font-black text-accent">{pad(featured)}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Latest</dt>
                <dd className="font-display mt-1 text-3xl font-black">
                  {projects.reduce((max, p) => (p.year > max ? p.year : max), "")}
                </dd>
              </div>
            </dl>
          </ScrollReveal>
        </div>

        <div className="mt-14 lg:mt-20">
          <ProjectsGrid projects={visible} />
          {!showAll && remaining > 0 ? (
            <div className="mt-12 flex flex-wrap items-center gap-5 border-t border-border pt-8 lg:mt-16">
              <EditorialButton
                type="button"
                variant="primary"
                arrow="right"
                size="lg"
                onClick={() => setShowAll(true)}
              >
                See all projects
              </EditorialButton>
              <span className="eyebrow text-muted-foreground">{pad(remaining)} more in the index</span>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
