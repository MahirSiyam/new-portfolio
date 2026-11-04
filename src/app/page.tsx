import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HomeSection } from "@/components/sections/HomeSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { navigation, personalInfo, socialLinks } from "@/data/portfolio";

export default function Page() {
  const sameAs = socialLinks.map((s) => s.href).filter((href): href is string => Boolean(href));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personalInfo.name,
    jobTitle: personalInfo.title,
    description: personalInfo.tagline,
    ...(personalInfo.email ? { email: `mailto:${personalInfo.email}` } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };

  return (
    <>
      <a
        href="#home"
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
        <HomeSection info={personalInfo} />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
