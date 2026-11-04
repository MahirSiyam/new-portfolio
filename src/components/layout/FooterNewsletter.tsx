"use client";

import { useState, type FormEvent } from "react";
import { mailto } from "@/lib/utils";

export function FooterNewsletter({ email }: { email: string }) {
  const [value, setValue] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const href = mailto(
      email,
      value.trim() ? `Newsletter subscribe — ${value.trim()}` : "Newsletter subscribe",
    );
    if (href) window.location.href = href;
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-0 border-t border-foreground sm:flex-row sm:items-stretch"
    >
      <label className="sr-only" htmlFor="footer-newsletter-email">
        Your email
      </label>
      <input
        id="footer-newsletter-email"
        type="email"
        name="email"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Your Email"
        autoComplete="email"
        className="min-w-0 flex-1 bg-transparent px-4 py-3.5 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
      />
      <button
        type="submit"
        className="shrink-0 bg-foreground px-5 py-3.5 font-mono text-[0.68rem] font-bold uppercase tracking-[0.18em] text-background transition-opacity hover:opacity-85"
      >
        Subscribe
      </button>
    </form>
  );
}
