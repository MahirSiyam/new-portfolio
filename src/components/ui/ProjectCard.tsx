import Image from "next/image";
import { ArrowUpRight, GitBranch } from "lucide-react";
import type { Project } from "@/types/portfolio";
import { ProjectPlaceholder } from "@/components/ui/ProjectPlaceholder";
import { cn, pad } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index: number;
  className?: string;
}

export function ProjectCard({ project, index, className }: ProjectCardProps) {
  const primaryHref = project.liveUrl ?? project.githubUrl;
  const hasLinks = Boolean(project.liveUrl || project.githubUrl);
  const titleId = `project-${project.slug}-title`;

  return (
    <article
      data-project-card
      data-category={project.category}
      aria-labelledby={titleId}
      className={cn("group/card relative flex flex-col", className)}
    >
      {/* Meta row */}
      <div className="eyebrow mb-3 flex items-center justify-between text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="text-accent">{pad(index + 1)}</span>
          <span aria-hidden="true">/</span>
          <span>{project.category}</span>
        </span>
        <span>{project.year}</span>
      </div>

      {/* Thumbnail */}
      <div data-thumb className="relative aspect-[4/3] w-full overflow-hidden border border-border bg-muted">
        <div className="h-full w-full transition-transform duration-700 ease-editorial group-hover/card:scale-[1.04] group-focus-within/card:scale-[1.04]">
          {project.image ? (
            <Image
              src={project.image.src}
              alt={project.image.alt}
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
              className="object-cover grayscale-[0.35] contrast-[1.05] transition-[filter] duration-700 group-hover/card:grayscale-0"
            />
          ) : (
            <ProjectPlaceholder
              tone={project.placeholderTone}
              variant={(index % 3) as 0 | 1 | 2}
              title={project.title}
            />
          )}
        </div>

        {/* Hover overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-end justify-between bg-linear-to-t from-black/70 via-black/10 to-transparent p-4 opacity-0 transition-opacity duration-500 ease-editorial group-hover/card:opacity-100 group-focus-within/card:opacity-100"
        >
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white">
            {project.role}
          </span>
          {hasLinks ? (
            <span className="flex size-10 items-center justify-center bg-accent text-accent-foreground translate-y-2 transition-transform duration-500 ease-editorial group-hover/card:translate-y-0">
              <ArrowUpRight className="size-4" />
            </span>
          ) : null}
        </div>

        {project.featured ? (
          <span className="absolute top-3 left-3 bg-foreground px-2 py-1 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-background">
            Featured
          </span>
        ) : null}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col pt-5">
        <h3 id={titleId} className="text-display-sm">
          {primaryHref ? (
            <a
              href={primaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline after:absolute after:inset-0 after:content-[''] group-hover/card:text-accent transition-colors duration-300"
            >
              {project.title}
            </a>
          ) : (
            <span className="transition-colors duration-300 group-hover/card:text-accent">
              {project.title}
            </span>
          )}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground">
          {project.technologies.map((tech) => (
            <li key={tech} className="flex items-center gap-1.5">
              <span aria-hidden="true" className="block size-1 bg-accent/80" />
              {tech}
            </li>
          ))}
        </ul>

        {hasLinks ? (
          <div className="relative z-10 mt-5 flex items-center gap-5 border-t border-border pt-4 font-mono text-[0.68rem] uppercase tracking-[0.18em]">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex items-center gap-1.5 hover:text-accent"
              >
                Live site <ArrowUpRight aria-hidden="true" className="size-3.5" />
              </a>
            ) : null}
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex items-center gap-1.5 hover:text-accent"
              >
                <GitBranch aria-hidden="true" className="size-3.5" /> Source
              </a>
            ) : null}
          </div>
        ) : (
          <div className="mt-5 border-t border-border pt-4 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
            {project.role}
          </div>
        )}
      </div>
    </article>
  );
}
