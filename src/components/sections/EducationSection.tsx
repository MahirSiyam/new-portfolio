import { education } from "@/data/portfolio";
import type { EducationItem } from "@/types/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EditorialDivider } from "@/components/ui/EditorialDivider";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { pad } from "@/lib/utils";

function isOpenEnded(endDate: string) {
  return /^(ongoing|present)$/i.test(endDate.trim());
}

/** Short mark for oversized year display; keep full dates in the period line. */
function archiveMark(record: EducationItem) {
  return isOpenEnded(record.endDate) ? record.startDate : record.endDate;
}

function periodLabel(record: EducationItem) {
  return `${record.startDate} — ${record.endDate}`;
}

export function EducationSection() {
  const latest = education[0];

  return (
    <section id="education" aria-labelledby="education-heading" className="py-20 sm:py-28 lg:py-36">
      <div className="container-editorial">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-10 lg:gap-y-14">
          {/* Left: heading + archive marker */}
          <div className="min-w-0 lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(var(--header-height)+2rem)]">
              <SectionHeading
                number={6}
                eyebrow="The academic archive"
                lines={["The", "foundation."]}
                id="education-heading"
                lede="Formal study, the coursework that still shapes how I think and the records behind the résumé."
                headingClassName="text-[length:clamp(2.25rem,1rem+4.5vw,5.5rem)]"
              />

              {latest ? (
                <div className="relative mt-10 hidden max-w-full lg:mt-12 lg:block">
                  <ScrollReveal
                    className="pointer-events-none absolute -top-1 right-0 z-10"
                    delay={0.5}
                    y={0}
                  >
                    <span
                      aria-hidden="true"
                      className="inline-flex -rotate-6 items-center gap-2 border-2 border-accent bg-background px-3.5 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.24em] text-accent shadow-[0_0_0_1px_var(--background)]"
                    >
                      Archive · {pad(6)}
                    </span>
                  </ScrollReveal>

                  <p className="eyebrow text-muted-foreground">Most recent record</p>
                  <ScrollReveal y={48} duration={1}>
                    <p className="font-display mt-2 max-w-full pr-28 text-[clamp(4.5rem,3rem+8vw,9rem)] leading-[0.88] font-black tracking-[-0.03em] text-foreground uppercase">
                      {archiveMark(latest)}
                    </p>
                  </ScrollReveal>
                  <ScrollReveal className="mt-4 flex min-w-0 items-center gap-3" delay={0.2}>
                    <span className="eyebrow shrink-0 text-muted-foreground">{latest.degree}</span>
                    <span aria-hidden="true" className="block h-px min-w-4 flex-1 bg-border" />
                    <span className="eyebrow shrink-0 text-accent">{latest.status}</span>
                  </ScrollReveal>
                </div>
              ) : null}
            </div>
          </div>

          {/* Right: records */}
          <div className="min-w-0 lg:col-span-7">
            <EditorialDivider strong className="lg:hidden" />
            <ol className="flex flex-col" aria-label="Academic records">
              {education.map((record, index) => (
                <li key={record.id} className="min-w-0">
                  {index > 0 ? <EditorialDivider /> : null}
                  <article
                    aria-labelledby={`${record.id}-title`}
                    className="grid gap-5 py-8 min-[480px]:grid-cols-[minmax(5.5rem,7.5rem)_minmax(0,1fr)] min-[480px]:gap-6 sm:gap-8 sm:py-9 lg:py-12"
                  >
                    {/* Year column */}
                    <ScrollReveal className="flex min-w-0 flex-col gap-2">
                      <span className="eyebrow text-accent">Rec. {pad(index + 1)}</span>
                      <span className="font-display text-[clamp(2.25rem,1.4rem+3.5vw,3.75rem)] leading-none font-black">
                        {archiveMark(record)}
                      </span>
                      <span className="eyebrow text-muted-foreground">{periodLabel(record)}</span>
                    </ScrollReveal>

                    {/* Record column */}
                    <ScrollReveal
                      className="flex min-w-0 flex-col gap-5"
                      stagger={0.09}
                      delay={0.1}
                    >
                      <div className="min-w-0">
                        <h3
                          id={`${record.id}-title`}
                          className="text-display-md max-w-full text-balance break-words"
                        >
                          {record.degree}
                          <span className="mt-1 block text-muted-foreground">{record.major}</span>
                        </h3>
                        <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                          <span className="font-medium break-words">{record.institution}</span>
                          {record.location ? (
                            <>
                              <span aria-hidden="true" className="block size-1 shrink-0 bg-border" />
                              <span className="text-muted-foreground">{record.location}</span>
                            </>
                          ) : null}
                        </p>
                      </div>

                      <dl className="grid grid-cols-1 gap-4 border-t border-border pt-4 font-mono text-[0.66rem] uppercase tracking-[0.14em] xs:grid-cols-2 sm:grid-cols-3">
                        <div className="min-w-0">
                          <dt className="text-muted-foreground">Status</dt>
                          <dd className="mt-1 text-accent">{record.status}</dd>
                        </div>
                        <div className="min-w-0">
                          <dt className="text-muted-foreground">Field</dt>
                          <dd className="mt-1 break-words normal-case tracking-normal">
                            {record.major}
                          </dd>
                        </div>
                        <div className="min-w-0 xs:col-span-2 sm:col-span-1">
                          <dt className="text-muted-foreground">Period</dt>
                          <dd className="mt-1 break-words">{periodLabel(record)}</dd>
                        </div>
                      </dl>

                      {record.coursework?.length ? (
                        <div className="min-w-0">
                          <p className="eyebrow text-muted-foreground">Relevant coursework</p>
                          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                            {record.coursework.map((course) => (
                              <li key={course} className="flex min-w-0 items-center gap-2">
                                <span aria-hidden="true" className="block size-1 shrink-0 bg-accent" />
                                <span className="break-words">{course}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}

                      {record.highlights?.length ? (
                        <div className="min-w-0">
                          <p className="eyebrow text-muted-foreground">Highlights</p>
                          <ul className="mt-3 flex flex-col gap-2 text-sm leading-relaxed text-foreground/85">
                            {record.highlights.map((item) => (
                              <li key={item} className="break-words">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}

                      {record.awards?.length ? (
                        <div className="min-w-0">
                          <p className="eyebrow text-muted-foreground">Awards</p>
                          <ul className="mt-3 flex flex-col gap-2 text-sm">
                            {record.awards.map((award) => (
                              <li key={award} className="break-words">
                                {award}
                              </li>
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
