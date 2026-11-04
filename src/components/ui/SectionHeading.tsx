import type { ReactNode } from "react";
import { TextReveal } from "@/components/animations/TextReveal";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { EditorialDivider } from "@/components/ui/EditorialDivider";
import { TOTAL_SECTIONS } from "@/data/portfolio";
import { cn, pad } from "@/lib/utils";

interface SectionHeadingProps {
  number: number;
  eyebrow: string;
  lines: ReactNode[];
  id: string;
  className?: string;
  headingClassName?: string;
  /** Short supporting copy rendered beneath the headline. */
  lede?: string;
  align?: "left" | "right";
  /** Set when the parent renders its own full-width numbered rule. */
  hideRule?: boolean;
}

export function SectionRule({ number, className }: { number: number; className?: string }) {
  return (
    <EditorialDivider
      strong
      label={`${pad(number)} / ${pad(TOTAL_SECTIONS)}`}
      className={cn("mb-8 sm:mb-10", className)}
    />
  );
}

/**
 * Editorial section opener: top rule with numbering, eyebrow, masked headline
 * and optional lede.
 */
export function SectionHeading({
  number,
  eyebrow,
  lines,
  id,
  className,
  headingClassName,
  lede,
  align = "left",
  hideRule = true,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col", align === "right" && "ml-auto w-full max-w-5xl", className)}>
      {hideRule ? null : <SectionRule number={number} />}
      <ScrollReveal className="flex items-center gap-3">
        <span aria-hidden="true" className="block size-2 bg-accent" />
        <p className="eyebrow text-muted-foreground">{eyebrow}</p>
      </ScrollReveal>
      <TextReveal
        as="h2"
        id={id}
        lines={lines}
        className={cn(
          "mt-4 text-left text-balance",
          headingClassName?.includes("text-hero-quote") ||
            headingClassName?.includes("text-hero") ||
            headingClassName?.includes("text-cover")
            ? null
            : "text-section",
          headingClassName,
        )}
      />
      {lede ? (
        <ScrollReveal delay={0.25} className="mt-6 max-w-xl">
          <p className="text-left text-base leading-relaxed text-muted-foreground sm:text-lg">
            {lede}
          </p>
        </ScrollReveal>
      ) : null}
    </div>
  );
}
