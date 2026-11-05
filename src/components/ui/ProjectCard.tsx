import Image from "next/image";
import { ArrowUpRight, GitBranch } from "lucide-react";
import type { Project } from "@/types/portfolio";
import { ProjectPlaceholder } from "@/components/ui/ProjectPlaceholder";
import { SkillTag } from "@/components/ui/SkillTag";
import { cn, pad } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index: number;
  /** Lead spread, companion card, full-width companion, or compact archive row. */
  layout?: "feature" | "wide" | "card" | "row";
  className?: string;
}

export function ProjectCard({ project, index, layout = "card", className }: ProjectCardProps) {
  const primaryHref = project.liveUrl ?? project.githubUrl;
  const titleId = `project-${project.slug}-title`;

  return (
    <article
      data-project-card
      data-category={project.category}
      aria-labelledby={titleId}
      className={cn(
        "group/card relative",
        layout === "feature" && "grid items-stretch gap-6 lg:grid-cols-12 lg:gap-10",
        layout === "wide" && "grid items-stretch gap-6 md:grid-cols-2 md:gap-10",
        layout === "card" && "flex flex-col",
        layout === "row" &&
          "grid grid-cols-[5.5rem_minmax(0,1fr)] items-start gap-4 border-b border-border py-5 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-6 sm:py-6",
        className,
      )}
    >
      <ProjectThumb
        project={project}
        index={index}
        layout={layout}
        showFeatured={layout !== "row" && project.featured}
      />

      <div
        className={cn(
          "flex min-w-0 flex-col",
          layout === "feature" && "h-full lg:col-span-5 lg:py-2",
          layout === "wide" && "h-full md:py-1",
          layout === "card" && "flex-1 pt-5",
        )}
      >
        {layout === "row" ? (
          <div className="min-w-0">
            <p className="eyebrow text-muted-foreground">
              <span className="text-accent">{pad(index + 1)}</span>
              <span aria-hidden="true"> / </span>
              {project.category}
              <span aria-hidden="true"> · </span>
              {project.year}
            </p>
            <ProjectTitle id={titleId} href={primaryHref} layout={layout}>
              {project.title}
            </ProjectTitle>
            <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>
          </div>
        ) : (
          <>
            <div className="eyebrow mb-3 flex items-center justify-between gap-3 text-muted-foreground">
              <span className="flex min-w-0 items-center gap-2">
                <span className="text-accent">{pad(index + 1)}</span>
                <span aria-hidden="true">/</span>
                <span className="truncate">{project.category}</span>
              </span>
              <span className="shrink-0">{project.year}</span>
            </div>
            <ProjectTitle id={titleId} href={primaryHref} layout={layout}>
              {project.title}
            </ProjectTitle>
            <p
              className={cn(
                "leading-relaxed text-muted-foreground",
                layout === "feature" ? "mt-4 text-base sm:text-lg" : "mt-3 text-sm sm:text-base",
              )}
            >
              {project.description}
            </p>
          </>
        )}

        <ul
          className={cn(
            "flex flex-wrap gap-2",
            layout === "row" ? "mt-3" : layout === "feature" ? "mt-6" : "mt-4",
          )}
        >
          {project.technologies.map((tech) => (
            <SkillTag key={tech} className="text-[0.62rem]">
              {tech}
            </SkillTag>
          ))}
        </ul>

        <ProjectLinks project={project} layout={layout} />
      </div>
    </article>
  );
}

function ProjectTitle({
  id,
  href,
  layout,
  children,
}: {
  id: string;
  href: string | null;
  layout: "feature" | "wide" | "card" | "row";
  children: string;
}) {
  const className = cn(
    layout === "feature" && "text-display-md",
    (layout === "card" || layout === "wide") && "text-display-sm",
    layout === "row" && "font-display mt-1 text-xl font-extrabold uppercase tracking-tight sm:text-2xl",
  );

  if (!href) {
    return (
      <h3 id={id} className={className}>
        <span className="transition-colors duration-300 group-hover/card:text-accent">{children}</span>
      </h3>
    );
  }

  return (
    <h3 id={id} className={className}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="link-underline transition-colors duration-300 after:absolute after:inset-0 after:content-[''] group-hover/card:text-accent"
      >
        {children}
      </a>
    </h3>
  );
}

function ProjectThumb({
  project,
  index,
  layout,
  showFeatured,
}: {
  project: Project;
  index: number;
  layout: "feature" | "wide" | "card" | "row";
  showFeatured: boolean;
}) {
  return (
    <div
      data-thumb
      className={cn(
        "relative w-full overflow-hidden border border-border bg-muted",
        layout === "feature" && "aspect-16/10 lg:col-span-7",
        layout === "wide" && "aspect-16/10",
        layout === "card" && "aspect-4/3",
        layout === "row" && "aspect-4/3",
      )}
    >
      <div className="h-full w-full transition-transform duration-700 ease-editorial group-hover/card:scale-[1.04] group-focus-within/card:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover/card:scale-100">
        {project.image ? (
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes={
              layout === "feature" || layout === "wide"
                ? "(min-width: 1024px) 52vw, 92vw"
                : layout === "row"
                  ? "120px"
                  : "(min-width: 1024px) 42vw, (min-width: 640px) 46vw, 92vw"
            }
            className="object-cover grayscale-[0.35] contrast-[1.05] transition-[filter] duration-700 group-hover/card:grayscale-0 motion-reduce:transition-none"
          />
        ) : (
          <ProjectPlaceholder
            tone={project.placeholderTone}
            variant={(index % 3) as 0 | 1 | 2}
            title={project.title}
          />
        )}
      </div>

      {layout !== "row" ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-end justify-between bg-linear-to-t from-black/70 via-black/10 to-transparent p-4 opacity-0 transition-opacity duration-500 ease-editorial group-hover/card:opacity-100 group-focus-within/card:opacity-100 motion-reduce:transition-none"
        >
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white">
            {project.role}
          </span>
          {project.liveUrl || project.githubUrl ? (
            <span className="flex size-10 translate-y-2 items-center justify-center bg-accent text-accent-foreground transition-transform duration-500 ease-editorial group-hover/card:translate-y-0 motion-reduce:translate-y-0">
              <ArrowUpRight className="size-4" />
            </span>
          ) : null}
        </div>
      ) : null}

      {showFeatured ? (
        <span className="absolute top-3 left-3 bg-foreground px-2 py-1 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-background">
          Featured
        </span>
      ) : null}
    </div>
  );
}

function ProjectLinks({
  project,
  layout,
}: {
  project: Project;
  layout: "feature" | "wide" | "card" | "row";
}) {
  const hasLinks = Boolean(project.liveUrl || project.githubUrl);

  if (!hasLinks) {
    if (layout === "row") {
      return (
        <p className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground">
          {project.role}
        </p>
      );
    }
    return (
      <p
        className={cn(
          "border-t border-border font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground",
          (layout === "feature" || layout === "wide") ? "mt-8 pt-4 md:mt-auto" : "mt-5 pt-4",
        )}
      >
        {project.role}
      </p>
    );
  }

  return (
    <div
      className={cn(
        "relative z-10 flex items-center gap-5 font-mono text-[0.68rem] uppercase tracking-[0.18em]",
        layout === "row" ? "mt-3" : "border-t border-border pt-4",
        (layout === "feature" || layout === "wide") && "mt-8 md:mt-auto",
        layout === "card" && "mt-5",
      )}
    >
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
  );
}
