/**
 * Hand-off between the site-entry preloader and entrance animations.
 *
 * When the newspaper window opens onto the real site, `markPreloaderDone()`
 * fires with a settle hand-off so hero/header jump to their final state and
 * show through the page. Without a preloader, callbacks get `"play"`.
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
 * when no preloader is on the page.
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
