import { contact, personalInfo } from "@/data/portfolio";
import { ContactForm } from "@/components/sections/ContactForm";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { ImageReveal } from "@/components/animations/ImageReveal";

export function ContactSection() {
  const lines = contact.headline.map((line) =>
    line.toLowerCase() === contact.highlightWord.toLowerCase() ? (
      <span key={line} className="text-accent">
        {line}
      </span>
    ) : (
      line
    ),
  );

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden border-t border-border bg-surface pt-24 pb-28 sm:pt-28 lg:pt-36 lg:pb-36"
    >
      <div className="container-editorial [container-type:inline-size]">
        <ScrollReveal className="flex items-center gap-3">
          <span aria-hidden="true" className="block size-2 bg-accent" />
          <p className="eyebrow text-muted-foreground">{contact.eyebrow}</p>
        </ScrollReveal>

        <TextReveal
          as="h2"
          id="contact-heading"
          lines={lines}
          className="text-cover mt-6 w-full max-w-full"
          stagger={0.12}
        />

        <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:items-center lg:gap-10">
          {/* Invitation */}
          <div className="lg:col-span-7">
            <ScrollReveal className="max-w-xl" delay={0.1} stagger={0.1}>
              <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
                {contact.invitation}
              </p>
              {personalInfo.email ? <ContactForm toEmail={personalInfo.email} /> : null}
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
                  Let&apos;s start a project
                </span>
              </div>
            </ImageReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
