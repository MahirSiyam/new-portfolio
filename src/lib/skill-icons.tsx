import type { ReactNode } from "react";
import {
  Accessibility,
  Cable,
  Code2,
  FlaskConical,
  Gauge,
  KeyRound,
  Layers,
  type LucideIcon,
} from "lucide-react";
import {
  siCloudflare,
  siCss,
  siCursor,
  siDocker,
  siExpress,
  siFigma,
  siGit,
  siGithub,
  siGithubactions,
  siGreensock,
  siHtml5,
  siJavascript,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPostman,
  siPrisma,
  siRailway,
  siReact,
  siRedis,
  siSocketdotio,
  siStorybook,
  siStripe,
  siSwagger,
  siTailwindcss,
  siTypescript,
  siVercel,
  type SimpleIcon,
} from "simple-icons";

type BrandIcon = Pick<SimpleIcon, "title" | "path">;

const BRAND: Record<string, BrandIcon> = {
  HTML: siHtml5,
  CSS: siCss,
  JavaScript: siJavascript,
  TypeScript: siTypescript,
  React: siReact,
  "Next.js": siNextdotjs,
  "Tailwind CSS": siTailwindcss,
  GSAP: siGreensock,
  "Node.js": siNodedotjs,
  "Express.js": siExpress,
  WebSockets: siSocketdotio,
  PostgreSQL: siPostgresql,
  MongoDB: siMongodb,
  Prisma: siPrisma,
  Redis: siRedis,
  Git: siGit,
  GitHub: siGithub,
  Cursor: siCursor,
  Figma: siFigma,
  Postman: siPostman,
  Vercel: siVercel,
  Railway: siRailway,
  Cloudflare: siCloudflare,
  Docker: siDocker,
  "GitHub Actions": siGithubactions,
  Storybook: siStorybook,
  Stripe: siStripe,
  "REST APIs": siSwagger,
};

const LUCIDE: Record<string, LucideIcon> = {
  "VS Code": Code2,
  Authentication: KeyRound,
  Accessibility: Accessibility,
  Performance: Gauge,
  Testing: FlaskConical,
  "Design Systems": Layers,
  "CSS Variables": Cable,
};

function BrandSvg({ icon, title }: { icon: BrandIcon; title: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-3.5 shrink-0 fill-current"
    >
      <title>{title}</title>
      <path d={icon.path} />
    </svg>
  );
}

/** Brand or Lucide mark for a skill / stack label. */
export function SkillIcon({ name }: { name: string }): ReactNode {
  const brand = BRAND[name];
  if (brand) return <BrandSvg icon={brand} title={brand.title} />;

  const Lucide = LUCIDE[name];
  if (Lucide) return <Lucide aria-hidden="true" className="size-3.5 shrink-0" strokeWidth={1.75} />;

  return (
    <span
      aria-hidden="true"
      className="block size-1.5 shrink-0 bg-border transition-colors duration-300 group-hover/tag:bg-accent"
    />
  );
}
