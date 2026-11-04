import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Barlow_Condensed, Inter, Space_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { personalInfo } from "@/data/portfolio";
import "./globals.css";

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const siteTitle = `${personalInfo.name} — ${personalInfo.title}`;
const siteDescription = `${personalInfo.tagline} ${personalInfo.intro}`;

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: `%s — ${personalInfo.name}`,
  },
  description: siteDescription,
  applicationName: `${personalInfo.name} Portfolio`,
  authors: [{ name: personalInfo.name }],
  keywords: [
    personalInfo.title,
    "portfolio",
    "web developer",
    "frontend",
    "full-stack",
    "Next.js",
    "React",
    "TypeScript",
  ],
  openGraph: {
    type: "website",
    title: siteTitle,
    description: siteDescription,
    siteName: `${personalInfo.name} — ${personalInfo.edition.label}`,
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F3F0" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
};

/**
 * Adds `html.motion` before first paint when JS is available and the visitor
 * has not asked for reduced motion. CSS uses it to pre-hide hero elements so
 * the GSAP timeline can reveal them without a flash of fully-rendered content.
 */
const motionScript = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('motion')}}catch(e){}`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${barlow.variable} ${inter.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-background font-body text-foreground">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
