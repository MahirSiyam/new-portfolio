import { skills } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillTag } from "@/components/ui/SkillTag";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { EditorialDivider } from "@/components/ui/EditorialDivider";
import { pad } from "@/lib/utils";

export function SkillsSection() {
  const total = skills.reduce((sum, category) => sum + category.skills.length, 0);

  return (
    <section id="skills" aria-labelledby="skills-heading" className="py-24 sm:py-28 lg:py-36">
      <div className="container-editorial">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Left: heading */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(var(--header-height)+2rem)]">
              <SectionHeading
                number={4}
                eyebrow="The technical directory"
                lines={["Tools that", "ship", "products."]}
                id="skills-heading"
                lede="A working toolkit rather than a wishlist: the languages, frameworks and services I reach for to take an idea from prototype to production."
                headingClassName="lg:text-[length:clamp(2.5rem,0.5rem_+_5.2vw,5.5rem)]"
              />
              <ScrollReveal className="mt-10 grid max-w-sm grid-cols-2 gap-6 border-t border-border pt-6" delay={0.2}>
                <div>
                  <p className="eyebrow text-muted-foreground">Categories</p>
                  <p className="font-display mt-2 text-4xl font-black">{pad(skills.length)}</p>
                </div>
                <div>
                  <p className="eyebrow text-muted-foreground">Listed skills</p>
                  <p className="font-display mt-2 text-4xl font-black">{pad(total)}</p>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Right: directory */}
          <div className="lg:col-span-7">
            <EditorialDivider strong className="lg:hidden" />
            <ol className="flex flex-col">
              {skills.map((category, index) => (
                <li key={category.id} className="group/cat">
                  {index > 0 ? <EditorialDivider /> : null}
                  <div className="grid gap-5 py-8 sm:grid-cols-[10rem_1fr] sm:gap-8 lg:py-10">
                    <ScrollReveal className="flex flex-col gap-2" stagger={0.06}>
                      <span className="eyebrow text-accent">{pad(index + 1)}</span>
                      <h3 className="text-display-sm">{category.label}</h3>
                      {category.description ? (
                        <p className="text-xs leading-relaxed text-muted-foreground">
                          {category.description}
                        </p>
                      ) : null}
                    </ScrollReveal>
                    <ScrollReveal
                      as="ul"
                      className="flex flex-wrap content-start gap-2"
                      stagger={0.04}
                      y={14}
                      delay={0.1}
                      aria-label={`${category.label} skills`}
                    >
                      {category.skills.map((skill) => (
                        <SkillTag key={skill}>{skill}</SkillTag>
                      ))}
                    </ScrollReveal>
                  </div>
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
