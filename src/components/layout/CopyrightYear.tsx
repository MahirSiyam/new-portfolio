"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getYear = () => String(new Date().getFullYear());
// Server render emits nothing so the static shell stays deterministic.
const getServerYear = () => "";

export function CopyrightYear() {
  const year = useSyncExternalStore(subscribe, getYear, getServerYear);
  return <span suppressHydrationWarning>{year}</span>;
}
