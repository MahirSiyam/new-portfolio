import type { PlaceholderTone } from "@/types/portfolio";
import { cn } from "@/lib/utils";

interface ProjectPlaceholderProps {
  tone: PlaceholderTone;
  /** Varies the mock interface layout so a grid of placeholders is not uniform. */
  variant?: 0 | 1 | 2;
  title: string;
  className?: string;
}

const palette: Record<
  PlaceholderTone,
  { bg: string; chrome: string; line: string; block: string; strong: string; text: string }
> = {
  ink: {
    bg: "bg-[#161616]",
    chrome: "border-white/15",
    line: "bg-white/20",
    block: "bg-white/8",
    strong: "bg-accent",
    text: "text-white/60",
  },
  paper: {
    bg: "bg-[#e6e5e1] dark:bg-[#2a2a2a]",
    chrome: "border-black/15 dark:border-white/15",
    line: "bg-black/25 dark:bg-white/25",
    block: "bg-black/6 dark:bg-white/8",
    strong: "bg-accent",
    text: "text-black/55 dark:text-white/60",
  },
  accent: {
    bg: "bg-accent",
    chrome: "border-white/35",
    line: "bg-white/70",
    block: "bg-white/18",
    strong: "bg-[#111111]",
    text: "text-white/85",
  },
};

/**
 * Pure-CSS software interface preview used when a project has no screenshot.
 * Decorative; hidden from assistive technology by the card.
 */
export function ProjectPlaceholder({
  tone,
  variant = 0,
  title,
  className,
}: ProjectPlaceholderProps) {
  const p = palette[tone];

  return (
    <div
      aria-hidden="true"
      className={cn("relative flex h-full w-full flex-col overflow-hidden p-[7%]", p.bg, className)}
    >
      {/* Window chrome */}
      <div className={cn("flex items-center gap-1.5 border-b pb-[3%]", p.chrome)}>
        <span className={cn("size-1.5 rounded-full", p.line)} />
        <span className={cn("size-1.5 rounded-full", p.line)} />
        <span className={cn("size-1.5 rounded-full", p.line)} />
        <span className={cn("ml-3 h-1 w-1/3", p.block)} />
        <span
          className={cn(
            "ml-auto max-w-[55%] truncate font-mono text-[0.55rem] uppercase tracking-[0.2em]",
            p.text,
          )}
        >
          {title}
        </span>
      </div>

      {variant === 0 && (
        <div className="mt-[5%] grid flex-1 grid-cols-[28%_1fr] gap-[5%]">
          <div className="flex flex-col gap-[8%]">
            <span className={cn("h-1.5 w-3/4", p.strong)} />
            <span className={cn("h-1 w-full", p.line)} />
            <span className={cn("h-1 w-5/6", p.line)} />
            <span className={cn("h-1 w-2/3", p.line)} />
            <span className={cn("h-1 w-4/5", p.line)} />
          </div>
          <div className="flex flex-col gap-[6%]">
            <div className="grid grid-cols-3 gap-[4%]">
              <span className={cn("aspect-[4/3]", p.block)} />
              <span className={cn("aspect-[4/3]", p.block)} />
              <span className={cn("aspect-[4/3]", p.strong)} />
            </div>
            <div className={cn("flex flex-1 items-end gap-[3%] border-t pt-[6%]", p.chrome)}>
              {[40, 65, 50, 85, 60, 95, 70, 55].map((h, i) => (
                <span
                  key={i}
                  className={cn("flex-1", i === 5 ? p.strong : p.line)}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {variant === 1 && (
        <div className="mt-[5%] flex flex-1 flex-col gap-[4%]">
          <span className={cn("h-3 w-2/3", p.block)} />
          <span className={cn("h-1.5 w-1/4", p.strong)} />
          <div className="mt-[2%] grid flex-1 grid-cols-2 gap-[4%]">
            <div className={cn("flex flex-col gap-[6%] p-[6%]", p.block)}>
              <span className={cn("h-1 w-1/2", p.line)} />
              <span className={cn("h-1 w-5/6", p.line)} />
              <span className={cn("h-1 w-2/3", p.line)} />
            </div>
            <div className={cn("flex flex-col gap-[6%] p-[6%]", p.block)}>
              <span className={cn("h-1 w-2/3", p.line)} />
              <span className={cn("h-1 w-1/2", p.line)} />
              <span className={cn("mt-auto h-4 w-1/2", p.strong)} />
            </div>
          </div>
        </div>
      )}

      {variant === 2 && (
        <div className="mt-[5%] flex flex-1 flex-col">
          {[1, 2, 3, 4, 5].map((row) => (
            <div
              key={row}
              className={cn("grid grid-cols-[8%_1fr_18%_12%] items-center gap-[3%] border-b py-[3.5%]", p.chrome)}
            >
              <span className={cn("font-mono text-[0.5rem]", p.text)}>0{row}</span>
              <span className={cn("h-1", row === 2 ? p.strong : p.line)} style={{ width: `${90 - row * 9}%` }} />
              <span className={cn("h-1", p.block)} />
              <span className={cn("h-1.5 w-full", row === 2 ? p.strong : p.block)} />
            </div>
          ))}
        </div>
      )}

      <span className="halftone pointer-events-none absolute -right-6 -bottom-6 size-32 text-black/20 opacity-40 mix-blend-multiply dark:text-white/40 dark:mix-blend-screen" />
    </div>
  );
}
