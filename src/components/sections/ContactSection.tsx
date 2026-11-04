import { ArrowUpRight } from "lucide-react";
import { contact, personalInfo, socialLinks } from "@/data/portfolio";
import { EditorialButton } from "@/components/ui/EditorialButton";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { mailto } from "@/lib/utils";

export function ContactSection() {
  const emailHref = mailto(personalInfo.email, `Hello ${personalInfo.name}`);
  const socials = socialLinks.filter((s) => s.href);

  const lines = contact.headline.map((line) =>
    line.toLowerCase() === contact.highlightWord.toLowerCase() ? (
      <span key={line} className="text-accent">
        {line}
      </span>
    ) : (
      line
    ),
  );

  const rows: { label: string; value: string; href: string | null; external: boolean }[] = [
    { label: "Email", value: personalInfo.email, href: emailHref, external: false },
    ...socials.map((s) => ({
      label: s.label,
      value: s.handle ?? s.label,
      href: s.href,
      external: true,
    })),
    ...(personalInfo.resumeUrl
      ? [{ label: "Resume", value: "Download PDF", href: personalInfo.resumeUrl, external: true }]
      : []),
  ].filter((row) => row.value);

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden border-t border-border bg-surface pt-24 pb-28 sm:pt-28 lg:pt-36 lg:pb-36"
    >
      <div className="container-editorial">
        <ScrollReveal className="flex items-center gap-3">
          <span aria-hidden="true" className="block size-2 bg-accent" />
          <p className="eyebrow text-muted-foreground">{contact.eyebrow}</p>
        </ScrollReveal>

        <TextReveal
          as="h2"
          id="contact-heading"
          lines={lines}
          className="text-cover mt-6"
          stagger={0.12}
        />

        <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:items-center lg:gap-10">
          {/* Invitation */}
          <div className="lg:col-span-7">
            <ScrollReveal className="max-w-xl" delay={0.1} stagger={0.1}>
              <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
                {contact.invitation}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                {emailHref ? (
                  <EditorialButton href={emailHref} variant="accent" arrow="up-right" size="lg">
                    {contact.ctaLabel}
                  </EditorialButton>
                ) : null}
                <span className="eyebrow flex items-center gap-2 text-muted-foreground">
                  <span aria-hidden="true" className="block size-1.5 animate-pulse bg-accent motion-reduce:animate-none" />
                  {personalInfo.availability}
                </span>
              </div>
            </ScrollReveal>
          </div>

          {/* Red editorial shape */}
          <div className="relative lg:col-span-5" aria-hidden="true">
            <ImageReveal className="mx-auto aspect-square w-full max-w-xs sm:max-w-sm lg:ml-auto lg:max-w-md">
              <div className="relative h-full w-full">
                <svg viewBox="0 0 400 400" className="h-full w-full" role="presentation">
                  <defs>
                    <pattern id="contact-halftone" width="7" height="7" patternUnits="userSpaceOnUse">
                      <circle cx="3.5" cy="3.5" r="1.1" fill="#111111" opacity="0.28" />
                    </pattern>
                    <clipPath id="contact-clip">
                      <path d="M214 18c58-6 118 22 150 72 32 50 36 118 8 170-28 52-88 90-150 100-62 10-126-8-166-52C16 264 4 196 22 138 40 80 96 26 156 20c20-2 38-2 58-2z" />
                    </clipPath>
                  </defs>
                  <g clipPath="url(#contact-clip)">
                    <rect width="400" height="400" fill="var(--accent)" />
                    <rect
                      width="400"
                      height="400"
                      fill="url(#contact-halftone)"
                      transform="translate(130 160)"
                    />
                  </g>
                  <rect x="24" y="24" width="352" height="352" fill="none" stroke="var(--foreground)" strokeWidth="1" opacity="0.25" />
                  <rect x="300" y="300" width="72" height="72" fill="var(--foreground)" />
                </svg>
                <span className="writing-vertical eyebrow absolute top-6 right-0 rotate-180 text-muted-foreground">
                  The back cover · {personalInfo.edition.volume}
                </span>
              </div>
            </ImageReveal>
          </div>
        </div>

        {/* Contact directory */}
        <ScrollReveal as="ul" className="mt-20 border-t border-border lg:mt-28" stagger={0.08} aria-label="Contact details">
          {rows.map((row) => (
            <li key={row.label} className="border-b border-border">
              {row.href ? (
                <a
                  href={row.href}
                  target={row.external ? "_blank" : undefined}
                  rel={row.external ? "noopener noreferrer" : undefined}
                  className="group grid grid-cols-[6rem_1fr_auto] items-center gap-4 py-5 transition-colors duration-300 hover:text-accent sm:grid-cols-[10rem_1fr_auto]"
                >
                  <span className="eyebrow text-muted-foreground">{row.label}</span>
                  <span className="truncate font-mono text-sm sm:text-base">{row.value}</span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-5 transition-transform duration-300 ease-editorial group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </a>
              ) : (
                <div className="grid grid-cols-[6rem_1fr] items-center gap-4 py-5 sm:grid-cols-[10rem_1fr]">
                  <span className="eyebrow text-muted-foreground">{row.label}</span>
                  <span className="font-mono text-sm sm:text-base">{row.value}</span>
                </div>
              )}
            </li>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
