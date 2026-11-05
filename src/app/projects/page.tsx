import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { navigation, personalInfo, projects } from "@/data/portfolio";
import { pad } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Projects",
  description: "The full index of products, systems, and digital experiences.",
};

export default function ProjectsPage() {
  const featured = projects.filter((project) => project.featured).length;
  const latest = projects.reduce((max, project) => (project.year > max ? project.year : max), "");

  return (
    <>
      <a
        href="#projects-index"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.18em] focus:text-accent-foreground"
      >
        Skip to content
      </a>
      <Header
        name={personalInfo.name}
        shortName={personalInfo.shortName}
        items={navigation}
        email={personalInfo.email}
      />
      <main id="main" className="flex-1">
        <section
          id="projects-index"
          aria-labelledby="projects-index-heading"
          className="border-t border-border bg-surface py-24 sm:py-28 lg:py-36"
        >
          <div className="container-editorial">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
              <div className="lg:col-span-8">
                <SectionHeading
                  number={5}
                  eyebrow="The full index"
                  lines={["All", "projects."]}
                  id="projects-index-heading"
                  lede="Every selected product, system, and experiment, from the featured editions to the rest of the archive."
                />
              </div>
              <ScrollReveal className="lg:col-span-4 lg:pb-2" delay={0.3}>
                <dl className="grid grid-cols-3 gap-4 border-t border-border pt-4 font-mono text-[0.66rem] uppercase tracking-[0.16em] lg:border-t-0 lg:pt-0">
                  <div>
                    <dt className="text-muted-foreground">Projects</dt>
                    <dd className="font-display mt-1 text-3xl font-black">{pad(projects.length)}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Featured</dt>
                    <dd className="font-display mt-1 text-3xl font-black text-accent">{pad(featured)}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Latest</dt>
                    <dd className="font-display mt-1 text-3xl font-black">{latest}</dd>
                  </div>
                </dl>
              </ScrollReveal>
            </div>

            <div className="mt-14 lg:mt-20">
              <ProjectsGrid projects={projects} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
