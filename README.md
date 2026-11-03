# Editorial Portfolio

A single-page developer portfolio with a retro-newspaper / Swiss editorial direction, built with Next.js (App Router), TypeScript, Tailwind CSS v4 and GSAP.

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Edit content

Everything on the page is driven by one typed file: `src/data/portfolio.ts` (types in `src/types/portfolio.ts`). Values marked `TODO` are placeholders.

- `personalInfo` – name, title, headline lines, intro, email, location, availability, ticker phrases.
- `about` – headline, paragraphs, pull quote, facts. Add `metrics: [{ value, label, note }]` to render the oversized number block instead of the quote.
- `experience`, `skills`, `projects`, `education`, `socialLinks`, `contact`.

Links set to `null` (resume, project live/GitHub URLs, social profiles) are hidden rather than rendered as dead links.

## Images

- Portrait: put a transparent PNG/WebP in `public/images/portrait/` and set `personalInfo.profileImage`.
- Projects: put screenshots in `public/images/projects/` and set `projects[n].image`; cards fall back to a CSS interface placeholder.
- Resume: put a PDF in `public/resume/` and set `personalInfo.resumeUrl`.

## Structure

```
src/
  app/            layout, page, global styles and theme tokens
  components/
    layout/       Header, MobileMenu, ThemeToggle, Footer
    sections/     Home, About, Experience, Skills, Projects, Education, Contact
    ui/           editorial primitives (SectionHeading, EditorialButton, ProjectCard, ...)
    animations/   TextReveal, ScrollReveal, ImageReveal
  data/           portfolio content
  lib/            GSAP setup and utilities
```
