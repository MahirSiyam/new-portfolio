import { ArrowUpRight } from "lucide-react";
import { navigation, personalInfo, socialLinks } from "@/data/portfolio";
import { BackToTop } from "@/components/layout/BackToTop";
import { CopyrightYear } from "@/components/layout/CopyrightYear";
import { mailto } from "@/lib/utils";

const linkClass =
  "link-underline inline-flex items-center gap-1.5 text-sm text-white/75 transition-colors duration-300 hover:text-white";

export function Footer() {
  const email = personalInfo.email;
  const emailHref = mailto(email);
  const socials = socialLinks.filter((s) => s.href);

  return (
    <footer className="bg-[#0d0d0d] text-[#f5f5f3] [padding-bottom:env(safe-area-inset-bottom)]">
      <div className="container-editorial">
        <div className="grid gap-12 border-b border-white/10 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:py-20">
          {/* Column 1 */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="block size-2.5 bg-accent" />
              <span className="eyebrow text-white/55">
                {personalInfo.edition.volume} · {personalInfo.edition.label}
              </span>
            </div>
            <p className="font-display mt-6 text-[clamp(2.5rem,5vw,4rem)] leading-[0.9] font-black uppercase">
              {personalInfo.name}
            </p>
            <p className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent">
              {personalInfo.title}
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/65">
              {personalInfo.tagline} {personalInfo.availability}.
            </p>
          </div>

          {/* Column 2 */}
          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className="eyebrow text-white/55">Contents</h2>
            <ul className="mt-5 flex flex-col gap-2.5">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a href={item.href} className={linkClass}>
                    <span className="font-mono text-[0.6rem] text-white/40">{item.number}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3 */}
          <div className="lg:col-span-2">
            <h2 className="eyebrow text-white/55">Elsewhere</h2>
            {socials.length ? (
              <ul className="mt-5 flex flex-col gap-2.5">
                {socials.map((s) => (
                  <li key={s.id}>
                    <a
                      href={s.href as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      {s.label}
                      <ArrowUpRight aria-hidden="true" className="size-3.5" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 text-sm text-white/55">Links coming soon.</p>
            )}
          </div>

          {/* Column 4 */}
          <div className="lg:col-span-3">
            <h2 className="eyebrow text-white/55">Contact</h2>
            <ul className="mt-5 flex flex-col gap-2.5">
              {emailHref ? (
                <li>
                  <a href={emailHref} className={`${linkClass} break-all`}>
                    {email}
                  </a>
                </li>
              ) : null}
              <li className="text-sm text-white/65">{personalInfo.location}</li>
              <li className="flex items-center gap-2 text-sm text-white/65">
                <span aria-hidden="true" className="block size-1.5 bg-accent" />
                {personalInfo.availability}
              </li>
              {personalInfo.resumeUrl ? (
                <li>
                  <a
                    href={personalInfo.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    Resume <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col gap-4 py-6 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> {personalInfo.name}. All rights reserved.
          </p>
          <p className="hidden md:block">Designed &amp; developed with intention.</p>
          <BackToTop className="group inline-flex items-center gap-2 self-start text-white/70 transition-colors duration-300 hover:text-white sm:self-auto" />
        </div>
      </div>
    </footer>
  );
}
