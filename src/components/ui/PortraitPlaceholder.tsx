import { cn, initials } from "@/lib/utils";

interface PortraitPlaceholderProps {
  name: string;
  title: string;
  className?: string;
}

/**
 * Editorial stand-in used until a real portrait is supplied. It is a
 * typographic composition (monogram, rules, halftone) and deliberately does
 * not depict a person.
 */
export function PortraitPlaceholder({ name, title, className }: PortraitPlaceholderProps) {
  const mono = initials(name) || "—";

  return (
    <div
      role="img"
      aria-label="Portrait placeholder. Replace with a photograph in the portfolio data file."
      className={cn(
        "relative flex h-full w-full flex-col justify-between overflow-hidden bg-[#1a1a1a] p-5 text-[#f4f3f0] sm:p-7",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="halftone pointer-events-none absolute inset-0 text-white/35 opacity-50 [mask-image:linear-gradient(to_bottom,transparent_20%,black_100%)]"
      />
      <span aria-hidden="true" className="pointer-events-none absolute inset-4 border border-white/15 sm:inset-6" />

      <div className="relative flex items-start justify-between font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/60">
        <span>Fig. 01</span>
        <span>Portrait</span>
      </div>

      <div className="relative">
        <span
          aria-hidden="true"
          className="font-display block text-[clamp(6rem,24vw,13rem)] leading-[0.8] font-black tracking-[-0.04em] text-white/90"
        >
          {mono}
        </span>
        <span aria-hidden="true" className="mt-4 block h-1 w-16 bg-accent" />
      </div>

      <div className="relative flex items-end justify-between font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/60">
        <span className="max-w-[55%] leading-relaxed">{title}</span>
        <span>B&amp;W / 4:5</span>
      </div>
    </div>
  );
}
