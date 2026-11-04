import { ArrowUpRight, Lightbulb, PenTool, Target } from "lucide-react";
import { navigation, personalInfo, socialLinks } from "@/data/portfolio";
import { BackToTop } from "@/components/layout/BackToTop";
import { CopyrightYear } from "@/components/layout/CopyrightYear";
import { FooterNewsletter } from "@/components/layout/FooterNewsletter";
import { mailto } from "@/lib/utils";

function brandLabel(name: string, shortName: string) {
  const placeholder = /name/i.test(shortName) || shortName.trim().length < 2;
  if (!placeholder) return shortName;
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length < 2) return parts[0] ?? name;
  return `${parts[0]} ${parts[parts.length - 1][0]}.`;
}

const cellLink =
  "group flex items-center justify-between gap-3 px-4 py-3.5 text-sm font-medium transition-colors hover:bg-foreground hover:text-background";

export function Footer() {
  const email = personalInfo.email;
  const emailHref = mailto(email, "Project inquiry");
  const projectHref = emailHref ?? "#contact";
  const socials = socialLinks.filter((s) => s.href);
  const brand = brandLabel(personalInfo.name, personalInfo.shortName);
  const footerNavIds = ["projects", "about", "experience", "contact"] as const;
  const footerNav = footerNavIds
    .map((id) => navigation.find((item) => item.id === id))
    .filter((item): item is (typeof navigation)[number] => Boolean(item));

  return (
    <footer className="border-t border-foreground bg-background text-foreground pb-[env(safe-area-inset-bottom)]">
      <div className="container-editorial py-10 sm:py-12 lg:py-14">
        {/* Start a project */}
        <a
          href={projectHref}
          className="group mb-6 flex items-center justify-between gap-4 sm:mb-8"
        >
          <span className="font-display text-[clamp(1.75rem,6vw,4.5rem)] leading-none font-black uppercase tracking-tight">
            Start a project
          </span>
          <span
            aria-hidden="true"
            className="inline-flex size-12 shrink-0 items-center justify-center bg-accent text-accent-foreground transition-transform duration-300 ease-editorial group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:size-14 lg:size-16"
          >
            <ArrowUpRight className="size-6 sm:size-7" strokeWidth={2.25} />
          </span>
        </a>

        {/* Reference-style grid */}
        <div className="border border-foreground">
          <div className="grid lg:grid-cols-12">
            {/* Brand column */}
            <div className="flex min-h-56 flex-col justify-between gap-10 border-b border-foreground bg-accent p-5 text-accent-foreground sm:p-6 lg:col-span-3 lg:row-span-2 lg:min-h-0 lg:border-r lg:border-b-0">
              <p className="font-display text-[clamp(2.35rem,4.5vw,3.5rem)] leading-[0.9] font-black tracking-tight text-accent-foreground uppercase">
                {brand}
              </p>
              <ul className="flex items-center gap-3" aria-label="Focus areas">
                {[
                  { Icon: PenTool, label: "Design craft" },
                  { Icon: Lightbulb, label: "Ideas" },
                  { Icon: Target, label: "Outcomes" },
                ].map(({ Icon, label }) => (
                  <li key={label}>
                    <span
                      title={label}
                      className="inline-flex size-12 items-center justify-center text-accent-foreground sm:size-14"
                    >
                      <Icon aria-hidden="true" className="size-6 sm:size-7" strokeWidth={1.6} />
                      <span className="sr-only">{label}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nav + socials + stay connected */}
            <div className="grid border-b border-foreground sm:grid-cols-2 lg:col-span-9 lg:grid-cols-3">
              <nav aria-label="Footer" className="flex h-full border-b border-foreground sm:border-r sm:border-b-0">
                <ul className="flex h-full w-full flex-col">
                  {footerNav.map((item, index) => (
                    <li
                      key={item.id}
                      className={`flex flex-1${index < footerNav.length - 1 ? " border-b border-foreground" : ""}`}
                    >
                      <a href={item.href} className={`${cellLink} h-full w-full`}>
                        <span>{item.label}</span>
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-3.5 shrink-0 opacity-70 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="flex h-full border-b border-foreground sm:border-b-0 lg:border-r">
                {socials.length ? (
                  <ul className="flex h-full w-full flex-col">
                    {socials.map((s) => (
                      <li key={s.id} className="flex flex-1">
                        <a
                          href={s.href as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${cellLink} h-full w-full`}
                        >
                          <span>{s.label}</span>
                          <ArrowUpRight
                            aria-hidden="true"
                            className="size-3.5 shrink-0 text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="px-4 py-3.5 text-sm text-muted-foreground">Links coming soon.</p>
                )}
              </div>

              <div className="flex flex-col sm:col-span-2 lg:col-span-1">
                <div className="border-b border-foreground px-4 py-4">
                  <p className="font-display text-[clamp(1.15rem,2.4vw,1.65rem)] leading-none font-black uppercase tracking-tight text-accent">
                    Stay connected
                  </p>
                </div>
                <div className="flex flex-1 flex-col justify-center px-4 py-4">
                  <p className="font-mono text-sm font-bold">Newsletter</p>
                  <p className="mt-1.5 max-w-[18rem] text-sm leading-relaxed text-muted-foreground">
                    Subscribe to get more insights and project updates.
                  </p>
                </div>
                {email ? <FooterNewsletter email={email} /> : null}
              </div>
            </div>

            {/* Reach out */}
            <div className="px-4 py-6 sm:px-5 sm:py-7 lg:col-span-9 lg:col-start-4">
              <p className="font-mono text-sm font-bold">Reach Out</p>
              {emailHref ? (
                <a
                  href={emailHref}
                  className="mt-3 block break-all font-mono text-[clamp(1rem,2.8vw,1.65rem)] leading-snug tracking-tight transition-colors hover:text-accent"
                >
                  {email}
                </a>
              ) : (
                <a
                  href="#contact"
                  className="mt-3 inline-block font-mono text-[clamp(1rem,2.8vw,1.65rem)] leading-snug tracking-tight transition-colors hover:text-accent"
                >
                  Contact
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground sm:mt-8 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> {personalInfo.name}. All rights reserved.
          </p>
          <BackToTop className="group inline-flex items-center gap-2 self-start text-muted-foreground transition-colors duration-300 hover:text-foreground sm:self-auto" />
        </div>
      </div>
    </footer>
  );
}
