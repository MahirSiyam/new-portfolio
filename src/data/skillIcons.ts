import type { SimpleIcon } from "simple-icons";
import {
  siAuth0,
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
  siJest,
  siJsonwebtokens,
  siLighthouse,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siOpenapiinitiative,
  siPostgresql,
  siPostman,
  siPrisma,
  siRailway,
  siReact,
  siRedis,
  siSocketdotio,
  siStorybook,
  siStripe,
  siTailwindcss,
  siTypescript,
  siVercel,
  siVscodium,
} from "simple-icons";

export type SkillIcon = Pick<SimpleIcon, "title" | "path">;

/** VS Code mark (kept local — removed from Simple Icons for trademark). */
const vscode: SkillIcon = {
  title: "Visual Studio Code",
  path: "M23.15 2.587 18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.51 1.51 0 0 0 24 20.82V3.18a1.51 1.51 0 0 0-.85-.593z",
};

/** Standard accessibility figure, drawn to the same 24×24 fill pattern. */
const accessibility: SkillIcon = {
  title: "Accessibility",
  path: "M12 2a2.25 2.25 0 1 1 0 4.5A2.25 2.25 0 0 1 12 2zm-1.1 5.5h2.2c1.3 0 2.2.7 2.55 1.75l1.7 5.1-1.85.6-1.35-4.05H13v9.6h-2v-5.7h-.3v5.7h-2v-9.6H7.75L6.4 14.95l-1.85-.6 1.7-5.1C6.6 8.2 7.5 7.5 8.8 7.5h2.1z",
};

/**
 * Maps display labels used in `portfolio.ts` to brand marks.
 * Every entry is a filled 24×24 path so SkillTag can render one shared pattern.
 */
const SKILL_ICONS: Record<string, SkillIcon> = {
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
  "REST APIs": siOpenapiinitiative,
  Authentication: siAuth0,
  WebSockets: siSocketdotio,
  PostgreSQL: siPostgresql,
  MongoDB: siMongodb,
  Prisma: siPrisma,
  Redis: siRedis,
  Git: siGit,
  GitHub: siGithub,
  "VS Code": vscode,
  Cursor: siCursor,
  Figma: siFigma,
  Postman: siPostman,
  Vercel: siVercel,
  Railway: siRailway,
  Cloudflare: siCloudflare,
  Docker: siDocker,
  "GitHub Actions": siGithubactions,
  Accessibility: accessibility,
  Performance: siLighthouse,
  Testing: siJest,
  "System Design": siStorybook,
  "Design Systems": siStorybook,
  // Project / experience extras that reuse SkillTag
  Stripe: siStripe,
  Storybook: siStorybook,
  "CSS Variables": siCss,
  JWT: siJsonwebtokens,
  // Fallback aliases
  VSCode: vscode,
  "Visual Studio Code": vscode,
  VSCodium: siVscodium,
};

const BY_KEY = new Map(
  Object.entries(SKILL_ICONS).map(([label, icon]) => [normalizeSkillKey(label), icon]),
);

export function normalizeSkillKey(label: string) {
  return label.trim().toLowerCase().replace(/[./\s_-]+/g, "");
}

export function getSkillIcon(label: string): SkillIcon | null {
  return BY_KEY.get(normalizeSkillKey(label)) ?? null;
}
