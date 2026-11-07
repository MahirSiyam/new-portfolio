/**
 * Hand-off between the site-entry preloader and entrance animations.
 *
 * `markPreloaderDone()` runs once the newspaper has the real home page in
 * place (before the zoom). Subscribers settle to their final state so the
 * page can show through the sheet; after the zoom the paper just dissolves —
 * no second entrance. Without a preloader, callbacks get `"play"` and run
 * the normal reveal.
 */

export type PreloaderHandoff = "play" | "settle";

let done = false;
const waiters = new Set<(mode: PreloaderHandoff) => void>();

export function isPreloaderDone() {
  return done;
}

export function markPreloaderDone() {
  if (done) return;
  done = true;
  waiters.forEach((cb) => cb("settle"));
  waiters.clear();
}

/**
 * Runs `cb` once the preloader hands over. Fires immediately with `"play"`
 * when no preloader is on the page, and falls back to a timeout so content
 * can never stay hidden.
 */
export function whenPreloaderDone(
  cb: (mode: PreloaderHandoff) => void,
  timeoutMs = 8000,
): () => void {
  if (done || typeof document === "undefined" || !document.querySelector("[data-preloader]")) {
    cb("play");
    return () => {};
  }

  let fired = false;
  let timer = 0;
  const run = (mode: PreloaderHandoff = "settle") => {
    if (fired) return;
    fired = true;
    window.clearTimeout(timer);
    waiters.delete(run);
    cb(mode);
  };

  waiters.add(run);
  timer = window.setTimeout(() => run("play"), timeoutMs);

  return () => {
    fired = true;
    window.clearTimeout(timer);
    waiters.delete(run);
  };
}
