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
    shortName: "Mahir S.",
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
    email: "mahirmubtasimsiyam@gmail.com",
    profileImage: {
      src: "/images/portrait/me.jpg",
      alt: "Portrait of Your Name",
      width: 1000,
      height: 1000,
    },
    resumeUrl: null, // e.g. "/resume/your-name-resume.pdf"
    availability: "Open to new opportunities", // TODO: adjust
    edition: {
      volume: "Vol. 01",
      label: "Portfolio Edition",
    },
    ticker: [
      "Software Developer",
      "Available for new roles",
      "Full-stack product engineering",
      "Reliable systems, clear interfaces",
      "Open to remote collaboration",
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
      role: "Software Developer",
      company: "Kode By Kraft",
      companyUrl: "https://kodebykraft.com/",
      companyLogo: {
        src: "/images/companies/kode-by-kraft.png",
        alt: "Kode By Kraft logo",
        width: 160,
        height: 160,
      },
      startDate: "2026",
      endDate: "Present",
      employmentType: "Full-time",
      location: "Onsite",
      description:
        "Describe the product you work on and the scope you own, from feature delivery to reliability and developer experience.",
      highlights: [
        "Add a measurable outcome, e.g. reduced page load time by a verified percentage.",
        "Add a responsibility you led, e.g. introduced a component library used by multiple teams.",
        "Add a collaboration detail, e.g. partnered with design on an accessibility audit.",
      ],
      technologies: ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL"],
    },
  ],

  skills: [
    {
      id: "frontend",
      label: "Frontend",
      description: "Interfaces that stay fast and legible.",
      skills: [
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
      skills: ["Accessibility", "Performance", "Testing", "System Design"],
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

  education: [
    {
      id: "edu-01",
      institution: "Sylhet Engineering College",
      degree: "Bachelor of Science",
      major: "Computer Science and Engineering",
      startDate: "2022",
      endDate: "Ongoing",
      status: "Ongoing",
      location: "Sylhet, Bangladesh",
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
      institution: "Jalalabad Cantonment Public School & College",
      degree: "Higher Secondary Certificate",
      major: "Science",
      startDate: "2020",
      endDate: "2021",
      status: "Completed",
      location: "Sylhet, Bangladesh",
    },
  ],

  socialLinks: [
    {
      id: "facebook",
      label: "Facebook",
      href: "https://www.facebook.com/mahir.siyam.2024/",
      handle: "mahir.siyam.2024",
    },
    {
      id: "github",
      label: "GitHub",
      href: "https://github.com/MahirSiyam",
      handle: "@MahirSiyam",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/mahir-siyam/",
      handle: "/in/mahir-siyam",
    },
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
