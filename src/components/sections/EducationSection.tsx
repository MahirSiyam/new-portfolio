import { education } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EditorialDivider } from "@/components/ui/EditorialDivider";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { pad } from "@/lib/utils";

export function EducationSection() {
  const latest = education[0];

  return (
    <section id="education" aria-labelledby="education-heading" className="py-24 sm:py-28 lg:py-36">
      <div className="container-editorial">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Left: heading + archive marker */}
          <div className="lg:col-span-5">
            <SectionHeading
              number={6}
              eyebrow="The academic archive"
              lines={["The", "foundation."]}
              id="education-heading"
              lede="Formal study, the coursework that still shapes how I think and the records behind the résumé."
              headingClassName="lg:text-[length:clamp(2.5rem,0.5rem_+_5.2vw,5.5rem)]"
            />

            {latest ? (
              <div className="relative mt-12 hidden lg:block">
                <p className="eyebrow text-muted-foreground">Most recent record</p>
                <ScrollReveal y={48} duration={1}>
                  <p className="text-metric mt-2 text-foreground">{latest.endDate}</p>
                </ScrollReveal>
                <ScrollReveal className="mt-4 flex items-center gap-3" delay={0.2}>
                  <span className="eyebrow text-muted-foreground">{latest.degree}</span>
                  <span aria-hidden="true" className="block h-px flex-1 bg-border" />
                  <span className="eyebrow text-accent">{latest.status}</span>
                </ScrollReveal>

                {/* Archive stamp */}
                <ScrollReveal className="absolute top-2 right-0" delay={0.5} y={0}>
                  <span
                    aria-hidden="true"
                    className="inline-flex -rotate-6 items-center gap-2 border-2 border-accent px-3 py-2 font-mono text-[0.6rem] uppercase tracking-[0.24em] text-accent"
                  >
                    Archive · {pad(6)}
                  </span>
                </ScrollReveal>
              </div>
            ) : null}
          </div>

          {/* Right: records */}
          <div className="lg:col-span-7">
            <EditorialDivider strong className="lg:hidden" />
            <ol className="flex flex-col" aria-label="Academic records">
              {education.map((record, index) => (
                <li key={record.id}>
                  {index > 0 ? <EditorialDivider /> : null}
                  <article
                    aria-labelledby={`${record.id}-title`}
                    className="grid gap-6 py-9 sm:grid-cols-[8rem_1fr] sm:gap-10 lg:py-12"
                  >
                    {/* Year column */}
                    <ScrollReveal className="flex flex-col gap-2">
                      <span className="eyebrow text-accent">Rec. {pad(index + 1)}</span>
                      <span className="font-display text-5xl leading-none font-black sm:text-6xl">
                        {record.endDate}
                      </span>
                      <span className="eyebrow text-muted-foreground">
                        {record.startDate} — {record.endDate}
                      </span>
                    </ScrollReveal>

                    {/* Record column */}
                    <ScrollReveal className="flex flex-col gap-5" stagger={0.09} delay={0.1}>
                      <div>
                        <h3 id={`${record.id}-title`} className="text-display-md text-balance">
                          {record.degree}
                          <span className="block text-muted-foreground">{record.major}</span>
                        </h3>
                        <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                          <span className="font-medium">{record.institution}</span>
                          {record.location ? (
                            <>
                              <span aria-hidden="true" className="block size-1 bg-border" />
                              <span className="text-muted-foreground">{record.location}</span>
                            </>
                          ) : null}
                        </p>
                      </div>

                      <dl className="grid grid-cols-2 gap-4 border-t border-border pt-4 font-mono text-[0.66rem] uppercase tracking-[0.16em] sm:grid-cols-3">
                        <div>
                          <dt className="text-muted-foreground">Status</dt>
                          <dd className="mt-1 text-accent">{record.status}</dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">Field</dt>
                          <dd className="mt-1">{record.major}</dd>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <dt className="text-muted-foreground">Period</dt>
                          <dd className="mt-1">
                            {record.startDate} — {record.endDate}
                          </dd>
                        </div>
                      </dl>

                      {record.coursework?.length ? (
                        <div>
                          <p className="eyebrow text-muted-foreground">Relevant coursework</p>
                          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                            {record.coursework.map((course) => (
                              <li key={course} className="flex items-center gap-2">
                                <span aria-hidden="true" className="block size-1 bg-accent" />
                                {course}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}

                      {record.highlights?.length ? (
                        <div>
                          <p className="eyebrow text-muted-foreground">Highlights</p>
                          <ul className="mt-3 flex flex-col gap-2 text-sm leading-relaxed text-foreground/85">
                            {record.highlights.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      ) : null}

                      {record.awards?.length ? (
                        <div>
                          <p className="eyebrow text-muted-foreground">Awards</p>
                          <ul className="mt-3 flex flex-col gap-2 text-sm">
                            {record.awards.map((award) => (
                              <li key={award}>{award}</li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </ScrollReveal>
                  </article>
                </li>
              ))}
            </ol>
            <EditorialDivider />
          </div>
        </div>
      </div>
    </section>
  );
}
