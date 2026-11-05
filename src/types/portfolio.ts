export type SectionId =
  | "home"
  | "about"
  | "experience"
  | "skills"
  | "projects"
  | "education"
  | "contact";

export interface NavItem {
  id: SectionId;
  label: string;
  href: `#${SectionId}` | `/#${SectionId}` | "/projects";
  number: string;
}

export interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface PersonalInfo {
  name: string;
  /** Short form used in the wordmark and vertical labels. */
  shortName: string;
  title: string;
  tagline: string;
  /** Hero headline, one entry per line. */
  headline: string[];
  intro: string;
  location: string;
  /** Leave empty to hide every email CTA. */
  email: string;
  /** `null` renders a placeholder composition instead of a photo. */
  profileImage: ImageAsset | null;
  /** `null` hides every resume CTA. */
  resumeUrl: string | null;
  availability: string;
  edition: {
    volume: string;
    label: string;
  };
  /** Short phrases for the editorial ticker. */
  ticker: string[];
}

export interface Metric {
  value: string;
  label: string;
  note?: string;
}

export interface AboutContent {
  eyebrow: string;
  headline: string[];
  paragraphs: string[];
  pullQuote: string;
  /** Optional aside image. When set, replaces the pull-quote block (unless metrics are provided). */
  image?: ImageAsset | null;
  /** Rendered as a large number only when provided with real data. */
  metrics?: Metric[];
  facts: { label: string; value: string }[];
}

export type EmploymentType =
  | "Full-time"
  | "Part-time"
  | "Contract"
  | "Freelance"
  | "Internship";

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string | null;
  /** Optional square/wordmark shown beside the company name. */
  companyLogo?: ImageAsset | null;
  startDate: string;
  endDate: string | "Present";
  employmentType: EmploymentType;
  location?: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface SkillCategory {
  id: string;
  label: string;
  description?: string;
  skills: string[];
}

export type ProjectCategory =
  | "Web Application"
  | "Full-Stack"
  | "Frontend"
  | "Experimental";

export type PlaceholderTone = "ink" | "paper" | "accent";

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: ProjectCategory;
  /** `null` renders a CSS interface placeholder in `placeholderTone`. */
  image: ImageAsset | null;
  placeholderTone: PlaceholderTone;
  technologies: string[];
  year: string;
  role: string;
  featured: boolean;
  liveUrl: string | null;
  githubUrl: string | null;
  caseStudy?: {
    problem: string;
    solution: string;
    outcome: string;
  };
}

export type EducationStatus = "Completed" | "In progress" | "Ongoing" | "Expected";

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  major: string;
  startDate: string;
  endDate: string;
  status: EducationStatus;
  location?: string;
  coursework?: string[];
  highlights?: string[];
  /** Only list awards that can be verified. */
  awards?: string[];
}

export interface SocialLink {
  id: "github" | "linkedin" | "facebook" | "x" | "dribbble" | "website" | "other";
  label: string;
  /** `null` hides the link everywhere. */
  href: string | null;
  handle?: string;
}

export interface ContactContent {
  eyebrow: string;
  headline: string[];
  /** The headline word rendered in accent red (must appear in `headline`). */
  highlightWord: string;
  invitation: string;
  ctaLabel: string;
}

export interface PortfolioContent {
  personalInfo: PersonalInfo;
  navigation: NavItem[];
  about: AboutContent;
  experience: ExperienceItem[];
  skills: SkillCategory[];
  projects: Project[];
  education: EducationItem[];
  socialLinks: SocialLink[];
  contact: ContactContent;
}
