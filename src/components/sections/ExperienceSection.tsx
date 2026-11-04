import { experience } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="border-t border-border bg-surface py-24 sm:py-28 lg:py-36"
    >
      <div className="container-editorial">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <SectionHeading
              number={3}
              eyebrow="The career chronicle"
              lines={["The work", "so far."]}
              id="experience-heading"
            />
          </div>
          <ScrollReveal className="flex flex-col justify-end gap-4 lg:col-span-4 lg:pb-2" delay={0.3}>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              Roles, responsibilities and the stacks behind them, in reverse chronological
              order. Expand any entry for the details.
            </p>
            <dl className="grid grid-cols-2 gap-4 border-t border-border pt-4 font-mono text-[0.66rem] uppercase tracking-[0.16em]">
              <div>
                <dt className="text-muted-foreground">Entries</dt>
                <dd className="mt-1 text-foreground">{String(experience.length).padStart(2, "0")}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Latest</dt>
                <dd className="mt-1 text-foreground">{experience[0]?.endDate ?? "—"}</dd>
              </div>
            </dl>
          </ScrollReveal>
        </div>

        {/* Column headers (desktop) */}
        <div
          aria-hidden="true"
          className="eyebrow mt-16 hidden grid-cols-12 gap-x-8 pb-3 text-muted-foreground lg:grid lg:px-4 lg:-mx-4"
        >
          <span className="col-span-2">Period</span>
          <span className="col-span-4">Role / Company</span>
          <span className="col-span-6">Description / Technologies</span>
        </div>

        <div className="mt-6 lg:mt-0">
          <ExperienceTimeline items={experience} />
        </div>
      </div>
    </section>
  );
}
