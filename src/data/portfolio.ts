import type { PortfolioContent } from "@/types/portfolio";

/**
 * ---------------------------------------------------------------------------
 * PORTFOLIO CONTENT
 * ---------------------------------------------------------------------------
 * Every piece of copy, metadata and link on the site is sourced from this
 * file. Values marked `TODO` are placeholders: replace them with your own
 * details. Nothing here is a real person's data.
 *
 * Images
 *  - Portrait: drop a transparent PNG/WebP in `public/images/portrait/` and
 *    set `personalInfo.profileImage` (see commented example).
 *  - Projects: drop screenshots in `public/images/projects/` and set
 *    `projects[n].image`. Cards fall back to a CSS interface placeholder.
 *  - Resume: place a PDF in `public/resume/` and set `personalInfo.resumeUrl`.
 *
 * Links set to `null` are hidden across the site rather than rendered as
 * dead links.
 * ---------------------------------------------------------------------------
 */

export const portfolio: PortfolioContent = {
  personalInfo: {
    name: "Mahir Mubtasim Siyam", // TODO: replace
    shortName: "Y. Name", // TODO: replace
    title: "Software Developer",
    tagline: "Building thoughtful digital products.",
    headline: [
      "Good software is quiet.",
      "It does the job and",
      "keeps working long",
      "after launch day.",
    ],
    intro:
      "I design and build web products end to end: resilient interfaces, dependable APIs and the systems that keep them running in production.", // TODO: replace
    location: "Sylhet, Bangladesh", // TODO: replace
    email: "hello@example.com", // TODO: replace (example.com is a reserved placeholder domain)
    profileImage: {
      src: "/images/portrait/IMG_3812.JPG.jpeg",
      alt: "Portrait of Your Name",
      width: 1200,
      height: 1500,
    },
    resumeUrl: null, // e.g. "/resume/your-name-resume.pdf"
    availability: "Open to new opportunities", // TODO: adjust
    edition: {
      volume: "Vol. 01",
      label: "Portfolio Edition",
    },
    ticker: [
      "Software engineer",
      "Open to new opportunities",
      "Frontend to infrastructure",
      "Design-minded, systems-first",
      "Remote friendly",
    ],
  },

  navigation: [
    { id: "home", label: "Home", href: "#home", number: "01" },
    { id: "about", label: "About", href: "#about", number: "02" },
    { id: "experience", label: "Experience", href: "#experience", number: "03" },
    { id: "skills", label: "Skills", href: "#skills", number: "04" },
    { id: "projects", label: "Projects", href: "#projects", number: "05" },
    { id: "education", label: "Education", href: "#education", number: "06" },
    { id: "contact", label: "Contact", href: "#contact", number: "07" },
  ],

  about: {
    eyebrow: "The feature story",
    headline: ["I build systems", "that work in", "the real world."],
    paragraphs: [
      "I am a software engineer who cares about the whole product: the interface a person touches, the API behind it and the deployment pipeline that ships it on a Friday afternoon without drama.", // TODO: replace
      "My work sits at the intersection of design and engineering. I prototype quickly, measure honestly and refine until the result feels inevitable rather than merely finished.", // TODO: replace
      "Outside of client and product work I write small tools for myself, read about typography and keep a running list of interfaces worth studying.", // TODO: replace
    ],
    pullQuote:
      "Good software is quiet. It does the job and keeps working long after launch day.",
    image: {
      src: "/images/portrait/horizontally_flipped_image.jpg",
      alt: "Focused developer working at a modern desk with dual monitors",
      width: 2048,
      height: 1152,
    },
    /**
     * Provide real figures to render the oversized metric block, e.g.
     * metrics: [{ value: "3.9", label: "CGPA", note: "out of 4.0" }]
     * When omitted the section renders the aside image (or pull quote).
     */
    facts: [
      { label: "Based in", value: "Your City, Country" }, // TODO: replace
      { label: "Focus", value: "Full-stack web, design systems" },
      { label: "Currently", value: "Open to new opportunities" },
      { label: "Working style", value: "Remote, async-first" },
    ],
  },

  // TODO: replace every entry with your real positions.
  experience: [
    {
      id: "exp-01",
      role: "Software Engineer",
      company: "Company Name",
      companyUrl: null,
      startDate: "2024",
      endDate: "Present",
      employmentType: "Full-time",
      location: "Remote",
      description:
        "Describe the product you work on and the scope you own, from feature delivery to reliability and developer experience.",
      highlights: [
        "Add a measurable outcome, e.g. reduced page load time by a verified percentage.",
        "Add a responsibility you led, e.g. introduced a component library used by multiple teams.",
        "Add a collaboration detail, e.g. partnered with design on an accessibility audit.",
      ],
      technologies: ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL"],
    },
    {
      id: "exp-02",
      role: "Frontend Developer",
      company: "Previous Company",
      companyUrl: null,
      startDate: "2022",
      endDate: "2024",
      employmentType: "Full-time",
      location: "Hybrid",
      description:
        "Summarise the interfaces you built, the users they served and the engineering practices you helped establish.",
      highlights: [
        "Add a shipped feature and its impact.",
        "Add a technical improvement, e.g. migration, tooling or performance work.",
      ],
      technologies: ["JavaScript", "React", "Tailwind CSS", "REST APIs"],
    },
    {
      id: "exp-03",
      role: "Web Development Intern",
      company: "Studio Name",
      companyUrl: null,
      startDate: "2021",
      endDate: "2022",
      employmentType: "Internship",
      location: "On-site",
      description:
        "Describe what you learned, the projects you contributed to and the responsibilities you grew into.",
      highlights: ["Add one or two concrete contributions."],
      technologies: ["HTML", "CSS", "JavaScript", "Git"],
    },
  ],

  skills: [
    {
      id: "frontend",
      label: "Frontend",
      description: "Interfaces that stay fast and legible.",
      skills: [
        "HTML",
        "CSS",
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Tailwind CSS",
        "GSAP",
      ],
    },
    {
      id: "backend",
      label: "Backend",
      description: "APIs and services with clear contracts.",
      skills: ["Node.js", "Express.js", "REST APIs", "Authentication", "WebSockets"],
    },
    {
      id: "databases",
      label: "Databases",
      description: "Data modelling and query performance.",
      skills: ["PostgreSQL", "MongoDB", "Prisma", "Redis"],
    },
    {
      id: "tools",
      label: "Tools & Workflow",
      description: "The daily toolkit.",
      skills: ["Git", "GitHub", "VS Code", "Cursor", "Figma", "Postman"],
    },
    {
      id: "cloud",
      label: "Cloud & Deployment",
      description: "Shipping and keeping things online.",
      skills: ["Vercel", "Railway", "Cloudflare", "Docker", "GitHub Actions"],
    },
    {
      id: "other",
      label: "Other Technologies",
      description: "Adjacent skills that shape the work.",
      skills: ["Accessibility", "Performance", "Testing", "Design Systems"],
    },
  ],

  // TODO: replace with real projects, screenshots and links.
  projects: [
    {
      id: "proj-01",
      title: "Commerce Platform",
      slug: "commerce-platform",
      description:
        "A storefront and admin console with catalogue management, checkout and order tracking. Replace with a real project summary.",
      category: "Full-Stack",
      image: null,
      placeholderTone: "ink",
      technologies: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
      year: "2025",
      role: "Lead developer",
      featured: true,
      liveUrl: null,
      githubUrl: null,
    },
    {
      id: "proj-02",
      title: "Analytics Dashboard",
      slug: "analytics-dashboard",
      description:
        "Real-time charts, saved views and role-based access for an operations team. Replace with a real project summary.",
      category: "Web Application",
      image: null,
      placeholderTone: "accent",
      technologies: ["React", "Node.js", "WebSockets", "Tailwind CSS"],
      year: "2025",
      role: "Full-stack engineer",
      featured: true,
      liveUrl: null,
      githubUrl: null,
    },
    {
      id: "proj-03",
      title: "Design System",
      slug: "design-system",
      description:
        "A documented component library with tokens, theming and accessibility baked in. Replace with a real project summary.",
      category: "Frontend",
      image: null,
      placeholderTone: "paper",
      technologies: ["React", "TypeScript", "Storybook", "CSS Variables"],
      year: "2024",
      role: "Frontend engineer",
      featured: true,
      liveUrl: null,
      githubUrl: null,
    },
    {
      id: "proj-04",
      title: "Realtime Collaboration",
      slug: "realtime-collaboration",
      description:
        "Shared documents with presence, cursors and conflict-free edits. Replace with a real project summary.",
      category: "Experimental",
      image: null,
      placeholderTone: "ink",
      technologies: ["Next.js", "WebSockets", "Redis"],
      year: "2024",
      role: "Engineer",
      featured: false,
      liveUrl: null,
      githubUrl: null,
    },
    {
      id: "proj-05",
      title: "Booking Service",
      slug: "booking-service",
      description:
        "Scheduling, reminders and payments for a small service business. Replace with a real project summary.",
      category: "Full-Stack",
      image: null,
      placeholderTone: "paper",
      technologies: ["Node.js", "Express.js", "MongoDB", "React"],
      year: "2023",
      role: "Full-stack engineer",
      featured: false,
      liveUrl: null,
      githubUrl: null,
    },
    {
      id: "proj-06",
      title: "Editorial Portfolio",
      slug: "editorial-portfolio",
      description:
        "This site: a newspaper-inspired portfolio built with Next.js, Tailwind CSS and GSAP.",
      category: "Frontend",
      image: null,
      placeholderTone: "accent",
      technologies: ["Next.js", "Tailwind CSS", "GSAP", "TypeScript"],
      year: "2026",
      role: "Design and development",
      featured: true,
      liveUrl: null,
      githubUrl: null,
    },
  ],

  // TODO: replace with your real academic record. Do not invent grades.
  education: [
    {
      id: "edu-01",
      institution: "University Name",
      degree: "Bachelor of Science",
      major: "Computer Science",
      startDate: "2020",
      endDate: "2024",
      status: "Completed",
      location: "City, Country",
      coursework: [
        "Data Structures & Algorithms",
        "Database Systems",
        "Software Engineering",
        "Computer Networks",
        "Human-Computer Interaction",
      ],
      highlights: [
        "Add a verified highlight, e.g. final-year project topic or a teaching assistant role.",
      ],
    },
    {
      id: "edu-02",
      institution: "College Name",
      degree: "Higher Secondary Certificate",
      major: "Science",
      startDate: "2018",
      endDate: "2020",
      status: "Completed",
      location: "City, Country",
    },
  ],

  // Platform root URLs are placeholders. Replace with your profile URLs or set
  // `href` to null to hide a link.
  socialLinks: [
    { id: "github", label: "GitHub", href: "https://github.com", handle: "@your-handle" },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com",
      handle: "/in/your-handle",
    },
    { id: "x", label: "X / Twitter", href: null, handle: "@your-handle" },
  ],

  contact: {
    eyebrow: "The back cover",
    headline: ["Let's build", "something", "extraordinary."],
    highlightWord: "extraordinary.",
    invitation:
      "I am currently open to full-time roles and selected freelance projects. If you are building something worth building, I would like to hear about it.",
    ctaLabel: "Send an email",
  },
};

export const {
  personalInfo,
  navigation,
  about,
  experience,
  skills,
  projects,
  education,
  socialLinks,
  contact,
} = portfolio;

export const TOTAL_SECTIONS = navigation.length;
