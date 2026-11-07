/**
 * Synthesised newspaper page-turn, built from layers the way a real one
 * sounds: a soft rustle as the page lifts, a bright "flick" as it passes
 * vertical, a dull flop with a low thud as it lands, and a scatter of tiny
 * fibre crackles. Randomised per turn so no two pages sound the same.
 *
 * Browsers only let audio start after a user gesture; `unlockAudio()` is
 * called from the preloader's first pointer/key event.
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

/** Two seconds of white noise; bursts start from random offsets inside it. */
function getNoise(ac: AudioContext): AudioBuffer {
  if (noise && noise.sampleRate === ac.sampleRate) return noise;
  const length = Math.floor(ac.sampleRate * 2);
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

interface Burst {
  at: number;
  length: number;
  type: BiquadFilterType;
  freq: number;
  q?: number;
  peak: number;
  attack: number;
  /** Optional frequency path: [time offset, value] pairs after the start. */
  sweep?: [number, number][];
}

/** Play one page turn lasting roughly `duration` seconds. */
export function playPageFlip(duration = 0.7, volume = 0.9) {
  const ac = getContext();
  if (!ac) return;
  if (ac.state !== "running") {
    unlockAudio();
    return;
  }

  const buffer = getNoise(ac);
  const t0 = ac.currentTime + 0.005;
  const rnd = (min: number, max: number) => min + Math.random() * (max - min);

  // Master: paper is mid-heavy, so lift the presence band a little.
  const master = ac.createGain();
  master.gain.value = volume;
  const tone = ac.createBiquadFilter();
  tone.type = "peaking";
  tone.frequency.value = 1900;
  tone.Q.value = 0.8;
  tone.gain.value = 3;
  master.connect(tone).connect(ac.destination);

  const burst = ({ at, length, type, freq, q = 0.7, peak, attack, sweep }: Burst) => {
    const src = ac.createBufferSource();
    src.buffer = buffer;
    src.playbackRate.value = rnd(0.9, 1.1);

    const filter = ac.createBiquadFilter();
    filter.type = type;
    filter.Q.value = q;
    filter.frequency.setValueAtTime(freq, at);
    sweep?.forEach(([dt, value]) => filter.frequency.exponentialRampToValueAtTime(value, at + dt));

    const env = ac.createGain();
    env.gain.setValueAtTime(0.0001, at);
    env.gain.exponentialRampToValueAtTime(peak, at + attack);
    env.gain.exponentialRampToValueAtTime(0.0001, at + length);

    src.connect(filter).connect(env).connect(master);
    src.start(at, rnd(0, buffer.duration - length - 0.1));
    src.stop(at + length + 0.02);
  };

  // 1. Lift: the page slides off the stack — dull, swelling rustle.
  burst({
    at: t0,
    length: duration * 0.5,
    type: "lowpass",
    freq: 1400,
    q: 0.5,
    peak: 0.22,
    attack: duration * 0.32,
    sweep: [[duration * 0.45, 2600]],
  });

  // 2. Flick: the page whips past vertical — short and bright.
  const flickAt = t0 + duration * rnd(0.3, 0.36);
  burst({
    at: flickAt,
    length: 0.17,
    type: "bandpass",
    freq: 2200,
    q: 0.6,
    peak: 0.7,
    attack: 0.014,
    sweep: [
      [0.07, 4600],
      [0.17, 1500],
    ],
  });

  // 3. Landing: the page flops onto the stack — soft, low, quick.
  const landAt = t0 + duration * 0.72;
  burst({
    at: landAt,
    length: 0.24,
    type: "lowpass",
    freq: 1300,
    q: 0.8,
    peak: 0.6,
    attack: 0.008,
    sweep: [[0.2, 500]],
  });

  // 4. Fibre crackles scattered through the turn.
  const grains = Math.floor(rnd(6, 11));
  for (let i = 0; i < grains; i++) {
    burst({
      at: t0 + duration * rnd(0.22, 0.85),
      length: rnd(0.008, 0.028),
      type: "highpass",
      freq: rnd(2500, 6000),
      q: 0.7,
      peak: rnd(0.08, 0.26),
      attack: 0.002,
    });
  }

  // 5. Sub thud under the landing.
  const thud = ac.createOscillator();
  thud.type = "sine";
  thud.frequency.setValueAtTime(120, landAt);
  thud.frequency.exponentialRampToValueAtTime(50, landAt + 0.16);
  const thudEnv = ac.createGain();
  thudEnv.gain.setValueAtTime(0.0001, landAt);
  thudEnv.gain.exponentialRampToValueAtTime(0.28, landAt + 0.012);
  thudEnv.gain.exponentialRampToValueAtTime(0.0001, landAt + 0.16);
  thud.connect(thudEnv).connect(master);
  thud.start(landAt);
  thud.stop(landAt + 0.2);
}
