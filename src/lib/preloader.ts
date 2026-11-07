/**
 * Hand-off between the site-entry preloader and entrance animations.
 *
 * The preloader calls `markPreloaderDone()` once its right-hand page has
 * zoomed onto the screen; hero/header timelines then play underneath the
 * dissolving paper. State is module-level so the intro never replays.
 */

let done = false;
const waiters = new Set<() => void>();

export function isPreloaderDone() {
  return done;
}

export function markPreloaderDone() {
  if (done) return;
  done = true;
  waiters.forEach((cb) => cb());
  waiters.clear();
}

/**
 * Runs `cb` once the preloader has finished. Fires immediately when no
 * preloader is mounted on the page, and falls back to a timeout so content
 * can never stay hidden.
 */
export function whenPreloaderDone(cb: () => void, timeoutMs = 8000): () => void {
  if (done || typeof document === "undefined" || !document.querySelector("[data-preloader]")) {
    cb();
    return () => {};
  }

  let fired = false;
  let timer = 0;
  const run = () => {
    if (fired) return;
    fired = true;
    window.clearTimeout(timer);
    waiters.delete(run);
    cb();
  };

  waiters.add(run);
  timer = window.setTimeout(run, timeoutMs);

  return () => {
    fired = true;
    window.clearTimeout(timer);
    waiters.delete(run);
  };
}
