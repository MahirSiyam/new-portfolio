import { cn } from "@/lib/utils";

interface SkillTagProps {
  children: string;
  className?: string;
  tone?: "default" | "inverse";
}

/** Minimal printed-label chip used for skills and project technologies. */
export function SkillTag({ children, className, tone = "default" }: SkillTagProps) {
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
        className="block size-1 bg-border transition-colors duration-300 group-hover/tag:bg-accent"
      />
      {children}
    </li>
  );
}
