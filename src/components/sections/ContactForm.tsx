"use client";

import { useState, type FormEvent } from "react";
import { contact, personalInfo } from "@/data/portfolio";
import { EditorialButton } from "@/components/ui/EditorialButton";
import { cn, mailto } from "@/lib/utils";

const field =
  "relative border border-border bg-background focus-within:border-foreground";

const label =
  "absolute -top-2 left-3 bg-surface px-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground";

const control =
  "w-full bg-transparent px-3.5 pt-5 pb-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none";

export function ContactForm({ toEmail }: { toEmail: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const href = mailto(toEmail, `Project inquiry from ${name || "portfolio"}`);
    if (!href) return;
    const body = [`Name: ${name || "—"}`, `Email: ${email || "—"}`, "", message || "—"].join("\n");
    window.location.href = `${href}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-6" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className={field}>
          <span className={label}>Name</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={control}
            required
          />
        </label>
        <label className={field}>
          <span className={label}>Email</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={control}
            required
          />
        </label>
        <label className={cn(field, "sm:col-span-2")}>
          <span className={label}>Message</span>
          <textarea
            name="message"
            rows={4}
            placeholder="Tell me about the project"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className={cn(control, "min-h-28 resize-y")}
            required
          />
        </label>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <EditorialButton type="submit" variant="accent" arrow="up-right" size="lg" className="w-full sm:w-auto">
          {contact.ctaLabel}
        </EditorialButton>
        <span className="eyebrow flex items-center gap-2 text-muted-foreground">
          <span
            aria-hidden="true"
            className="block size-1.5 animate-pulse bg-accent motion-reduce:animate-none"
          />
          {personalInfo.availability}
        </span>
      </div>
    </form>
  );
}
