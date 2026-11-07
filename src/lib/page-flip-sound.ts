/**
 * Synthesised newspaper page-turn: a short burst of filtered noise that
 * sweeps upward ("fwip") and lands with a soft slap. No audio asset needed.
 *
 * Browsers only let audio start after a user gesture; `unlockAudio()` is
 * wired to the first pointer/key event so later turns become audible.
 */

let ctx: AudioContext | null = null;
let noise: AudioBuffer | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (ctx) return ctx;
  const Ctor =
    window.AudioContext ||
    (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  try {
    ctx = new Ctor();
  } catch {
    return null;
  }
  return ctx;
}

function getNoise(ac: AudioContext): AudioBuffer {
  if (noise && noise.sampleRate === ac.sampleRate) return noise;
  const length = Math.floor(ac.sampleRate * 1.2);
  const buffer = ac.createBuffer(1, length, ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
  noise = buffer;
  return buffer;
}

/** Resume the context; only effective inside a user-gesture handler. */
export function unlockAudio() {
  const ac = getContext();
  if (ac && ac.state === "suspended") ac.resume().catch(() => {});
}

/** Play one page turn lasting roughly `duration` seconds. */
export function playPageFlip(duration = 0.7, volume = 0.8) {
  const ac = getContext();
  if (!ac) return;
  if (ac.state === "suspended") {
    unlockAudio();
    return;
  }

  const t = ac.currentTime;
  const end = t + duration;

  // Paper rustle: noise through a sweeping band-pass.
  const src = ac.createBufferSource();
  src.buffer = getNoise(ac);
  src.playbackRate.value = 0.9 + Math.random() * 0.2;

  const hp = ac.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 500;

  const bp = ac.createBiquadFilter();
  bp.type = "bandpass";
  bp.Q.value = 0.9;
  bp.frequency.setValueAtTime(700, t);
  bp.frequency.exponentialRampToValueAtTime(3400, t + duration * 0.55);
  bp.frequency.exponentialRampToValueAtTime(1500, end);

  const env = ac.createGain();
  env.gain.setValueAtTime(0.0001, t);
  env.gain.exponentialRampToValueAtTime(0.5, t + 0.05);
  env.gain.exponentialRampToValueAtTime(0.18, t + duration * 0.5);
  env.gain.exponentialRampToValueAtTime(0.65, t + duration * 0.78); // page lands
  env.gain.exponentialRampToValueAtTime(0.0001, end);

  // Soft low thud as the page settles.
  const thud = ac.createOscillator();
  thud.type = "sine";
  thud.frequency.setValueAtTime(140, t + duration * 0.74);
  thud.frequency.exponentialRampToValueAtTime(60, end);
  const thudEnv = ac.createGain();
  thudEnv.gain.setValueAtTime(0.0001, t);
  thudEnv.gain.setValueAtTime(0.0001, t + duration * 0.74);
  thudEnv.gain.exponentialRampToValueAtTime(0.3, t + duration * 0.77);
  thudEnv.gain.exponentialRampToValueAtTime(0.0001, end);

  const master = ac.createGain();
  master.gain.value = volume;

  src.connect(hp).connect(bp).connect(env).connect(master);
  thud.connect(thudEnv).connect(master);
  master.connect(ac.destination);

  src.start(t);
  src.stop(end + 0.05);
  thud.start(t + duration * 0.74);
  thud.stop(end + 0.05);
}
