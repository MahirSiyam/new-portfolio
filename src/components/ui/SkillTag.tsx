import { getSkillIcon } from "@/data/skillIcons";
import { cn } from "@/lib/utils";

interface SkillTagProps {
  children: string;
  className?: string;
  tone?: "default" | "inverse";
}

/** Printed-label chip with a shared monochrome brand mark for every stack. */
export function SkillTag({ children, className, tone = "default" }: SkillTagProps) {
  const icon = getSkillIcon(children);

  return (
    <li
      className={cn(
        "group/tag relative inline-flex items-center gap-2 border px-2.5 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] transition-colors duration-300 ease-editorial",
        tone === "default" &&
          "border-border bg-surface text-foreground hover:border-accent hover:text-accent",
        tone === "inverse" &&
          "border-white/20 bg-transparent text-white/85 hover:border-accent hover:text-white",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="inline-flex size-3.5 shrink-0 items-center justify-center"
      >
        {icon ? (
          <svg viewBox="0 0 24 24" className="size-3.5 fill-current opacity-80 transition-opacity duration-300 group-hover/tag:opacity-100">
            <path d={icon.path} />
          </svg>
        ) : (
          <span className="block size-1 bg-border transition-colors duration-300 group-hover/tag:bg-accent" />
        )}
      </span>
      {children}
    </li>
  );
}
