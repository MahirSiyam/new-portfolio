import Link from "next/link";
import { ArrowUpRight, ArrowRight, ArrowDown } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "accent" | "ghost";
type Arrow = "right" | "up-right" | "down" | "none";

interface BaseProps {
  variant?: Variant;
  arrow?: Arrow;
  size?: "md" | "lg";
  className?: string;
  children: ReactNode;
}

type AnchorProps = BaseProps &
  Omit<ComponentPropsWithoutRef<"a">, "className" | "children"> & { href: string };

type ButtonProps = BaseProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children"> & { href?: undefined };

const base =
  "group/btn inline-flex items-center justify-center gap-3 border font-mono text-[0.72rem] uppercase tracking-[0.18em] transition-[background-color,color,border-color,transform] duration-300 ease-editorial select-none";

const variants: Record<Variant, string> = {
  primary:
    "border-foreground bg-foreground text-background hover:bg-accent hover:border-accent hover:text-accent-foreground",
  secondary:
    "border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background",
  accent:
    "border-accent bg-accent text-accent-foreground hover:bg-foreground hover:border-foreground hover:text-background",
  ghost:
    "border-transparent bg-transparent text-foreground hover:text-accent px-0",
};

const sizes = {
  md: "px-5 py-3",
  lg: "px-7 py-4 text-[0.78rem]",
};

function ArrowIcon({ arrow }: { arrow: Arrow }) {
  const cls =
    "size-4 shrink-0 transition-transform duration-300 ease-editorial";
  switch (arrow) {
    case "right":
      return <ArrowRight aria-hidden="true" className={cn(cls, "group-hover/btn:translate-x-1")} />;
    case "up-right":
      return (
        <ArrowUpRight
          aria-hidden="true"
          className={cn(cls, "group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5")}
        />
      );
    case "down":
      return <ArrowDown aria-hidden="true" className={cn(cls, "group-hover/btn:translate-y-1")} />;
    default:
      return null;
  }
}

/**
 * Printed-label style button/link. Renders a `<Link>` for internal hrefs, an
 * `<a>` for external/mailto hrefs and a `<button>` otherwise.
 */
export function EditorialButton(props: AnchorProps | ButtonProps) {
  const {
    variant = "primary",
    arrow = "right",
    size = "md",
    className,
    children,
    ...rest
  } = props;

  const classes = cn(base, variants[variant], variant !== "ghost" && sizes[size], className);

  if ("href" in rest && typeof rest.href === "string") {
    const { href, ...anchorRest } = rest as AnchorProps;
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return (
        <Link href={href} className={classes} {...anchorRest}>
          <span>{children}</span>
          <ArrowIcon arrow={arrow} />
        </Link>
      );
    }
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith("mailto:") ? undefined : "_blank"}
        rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
        {...anchorRest}
      >
        <span>{children}</span>
        <ArrowIcon arrow={arrow} />
      </a>
    );
  }

  const buttonRest = rest as Omit<ButtonProps, keyof BaseProps>;
  return (
    <button type="button" className={classes} {...buttonRest}>
      <span>{children}</span>
      <ArrowIcon arrow={arrow} />
    </button>
  );
}
