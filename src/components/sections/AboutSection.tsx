import Image from "next/image";
import { about, personalInfo } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EditorialButton } from "@/components/ui/EditorialButton";
import { EditorialDivider } from "@/components/ui/EditorialDivider";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { ImageReveal } from "@/components/animations/ImageReveal";

export function AboutSection() {
  const metric = about.metrics?.[0];
  const asideImage = about.image;

  return (
    <section id="about" aria-label="About" className="py-24 sm:py-28 lg:py-36">
      <div className="container-editorial">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Image + facts — left on desktop */}
          <aside
            className="order-1 flex flex-col lg:col-span-6 lg:border-r lg:border-border lg:pr-10"
            aria-label="At a glance"
          >
            {metric ? (
              <div>
                <p className="eyebrow text-muted-foreground">{metric.label}</p>
                <ScrollReveal y={48} duration={1}>
                  <p className="text-metric mt-2 text-accent">{metric.value}</p>
                </ScrollReveal>
                {metric.note ? (
                  <ScrollReveal className="mt-3">
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      {metric.note}
                    </p>
                  </ScrollReveal>
                ) : null}
              </div>
            ) : asideImage ? (
              <figure className="relative">
                <div className="relative">
                  <ImageReveal
                    className="relative aspect-[4/3] w-full bg-muted"
                    innerClassName="relative h-full w-full"
                  >
                    <Image
                      src={asideImage.src}
                      alt={asideImage.alt}
                      fill
                      quality={95}
                      sizes="(min-width: 1024px) 48vw, 100vw"
                      className="object-cover object-[center_40%]"
                    />
                  </ImageReveal>

                  {/* Mobile/tablet: heading at the bottom of the image */}
                  <div className="absolute inset-x-0 bottom-0 z-10 w-full bg-linear-to-t from-black via-black/75 to-transparent px-3 pt-16 pb-3 xs:px-4 xs:pt-20 xs:pb-4 sm:px-5 sm:pt-24 sm:pb-5 md:px-6 md:pt-28 md:pb-6 lg:hidden">
                    <p className="w-full font-mono text-[length:clamp(0.58rem,0.5rem+0.35vw,0.72rem)] font-medium uppercase tracking-[0.16em] text-white/70">
                      About · {about.eyebrow}
                    </p>
                    <h2
                      id="about-heading"
                      className="mt-2 w-full max-w-none font-body text-[length:clamp(1.25rem,0.7rem+3.8vw,2.5rem)] leading-[1.2] font-bold tracking-[-0.02em] text-white xs:mt-2.5 sm:mt-3 md:mt-3.5"
                    >
                      {about.headline.slice(0, -1).join(" ")}{" "}
                      <span className="text-white/55">
                        {about.headline[about.headline.length - 1]}
                      </span>
                    </h2>
                    <p className="mt-3 w-full font-mono text-[length:clamp(0.52rem,0.45rem+0.3vw,0.66rem)] uppercase tracking-[0.14em] text-white/40 xs:mt-3.5 sm:mt-4">
                      Photo — at the desk
                    </p>
                  </div>
                </div>
                <figcaption className="eyebrow mt-4 hidden items-center gap-3 text-muted-foreground lg:flex">
                  <span aria-hidden="true" className="block h-px w-8 bg-accent" />
                  At the desk
                </figcaption>
              </figure>
            ) : (
              <figure className="relative">
                <span
                  aria-hidden="true"
                  className="font-display absolute -top-6 -left-2 text-[6rem] leading-none font-black text-accent/90 select-none lg:-left-3"
                >
                  &ldquo;
                </span>
                <TextReveal
                  as="blockquote"
                  lines={splitQuote(about.pullQuote)}
                  className="text-display-md relative pt-8 text-balance"
                  stagger={0.07}
                />
                <figcaption className="eyebrow mt-6 flex items-center gap-3 text-muted-foreground">
                  <span aria-hidden="true" className="block h-px w-8 bg-accent" />
                  {personalInfo.name}
                </figcaption>
              </figure>
            )}

            <EditorialDivider strong className="mt-12" />

            <ScrollReveal as="dl" className="divide-y divide-border" stagger={0.08}>
              {about.facts.map((fact) => (
                <div key={fact.label} className="grid grid-cols-[7rem_1fr] gap-4 py-4 sm:grid-cols-[9rem_1fr]">
                  <dt className="eyebrow pt-0.5 text-muted-foreground">{fact.label}</dt>
                  <dd className="text-sm font-medium sm:text-base">{fact.value}</dd>
                </div>
              ))}
            </ScrollReveal>
          </aside>

          {/* Story — right on desktop */}
          <div className="order-2 flex flex-col lg:col-span-6">
            <div className="hidden lg:block">
              <SectionHeading
                number={2}
                eyebrow={about.eyebrow}
                lines={about.headline}
                id="about-heading-desktop"
                headingClassName="text-hero-quote w-full max-w-full"
              />
            </div>

            <ScrollReveal className="mt-2 flex flex-col gap-6 lg:mt-14" stagger={0.12}>
              {about.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={
                    index === 0
                      ? "text-lg leading-relaxed text-foreground sm:text-xl first-letter:font-display first-letter:float-left first-letter:mr-3 first-letter:text-[4.2em] first-letter:leading-[0.8] first-letter:font-black first-letter:text-accent"
                      : "text-base leading-relaxed text-muted-foreground sm:text-lg"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </ScrollReveal>

            <ScrollReveal className="mt-10 flex flex-wrap items-center gap-4" delay={0.1}>
              {personalInfo.resumeUrl ? (
                <EditorialButton href={personalInfo.resumeUrl} variant="primary" arrow="up-right">
                  Download resume
                </EditorialButton>
              ) : null}
              <EditorialButton href="#contact" variant={personalInfo.resumeUrl ? "secondary" : "primary"}>
                Get in touch
              </EditorialButton>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Breaks a sentence into balanced visual lines for the masked reveal. */
function splitQuote(quote: string, maxChars = 26): string[] {
  const words = quote.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
}
