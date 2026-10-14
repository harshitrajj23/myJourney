export interface ParticleForms {
  sphere: Float32Array;
  helix: Float32Array;
  wave: Float32Array;
}

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const TWO_PI = Math.PI * 2;
const MAX_PARTICLES = 1_000_000;

/** Build immutable-by-convention targets once; use a separate output buffer. */
export function createParticleForms(count: number): ParticleForms {
  if (!Number.isInteger(count) || count < 1 || count > MAX_PARTICLES) {
    throw new RangeError(
      `Particle count must be a finite positive integer up to ${MAX_PARTICLES}.`,
    );
  }

  const sphere = new Float32Array(count * 3);
  const helix = new Float32Array(count * 3);
  const wave = new Float32Array(count * 3);
  const strandSamples = Math.ceil(count / 2);
  const columns = Math.min(count, Math.ceil(Math.sqrt(count * (3.8 / 3))));
  const rows = Math.ceil(count / columns);

  for (let i = 0; i < count; i += 1) {
    const offset = i * 3;
    const latitude = 1 - (2 * (i + 0.5)) / count;
    const ring = Math.sqrt(1 - latitude * latitude);
    const longitude = i * GOLDEN_ANGLE;
    const shellRadius = 1.65 - (i % 3) * 0.09;
    sphere[offset] = Math.cos(longitude) * ring * shellRadius;
    sphere[offset + 1] = latitude * shellRadius;
    sphere[offset + 2] = Math.sin(longitude) * ring * shellRadius;

    // Adjacent particles occupy opposite strands at the same height.
    const strandProgress = strandSamples > 1
      ? Math.floor(i / 2) / (strandSamples - 1)
      : 0.5;
    const twist = strandProgress * TWO_PI * 2 + (i % 2) * Math.PI;
    const strandRadius = 1.06 + 0.04 * Math.cos(longitude);
    helix[offset] = Math.cos(twist) * strandRadius;
    helix[offset + 1] = (strandProgress - 0.5) * 3.6;
    helix[offset + 2] = Math.sin(twist) * strandRadius;

    const x = columns > 1 ? ((i % columns) / (columns - 1) - 0.5) * 3.8 : 0;
    const z = rows > 1 ? (Math.floor(i / columns) / (rows - 1) - 0.5) * 3 : 0;
    wave[offset] = x;
    wave[offset + 1] = 0.22 * Math.sin(x * 2.1) + 0.12 * Math.cos(z * 2.4 + x);
    wave[offset + 2] = z;
  }

  return { sphere, helix, wave };
}

/**
 * Allocation-free updates: sphere -> helix -> wave -> sphere, six seconds per
 * leg. Scroll advances up to two legs; pointer inputs use normalized -1..1 axes.
 * Non-finite controls fall back to zero. Generated targets plus all deformation
 * remain inside radius 2.9 (comfortably below the camera's 3.3 radius budget).
 */
export function updateParticlePositions(
  output: Float32Array,
  forms: ParticleForms,
  timeSeconds: number,
  scrollProgress: number,
  pointerX: number,
  pointerY: number,
): void {
  const length = output.length;
  if (
    length === 0 || length % 3 !== 0 ||
    forms.sphere.length !== length ||
    forms.helix.length !== length ||
    forms.wave.length !== length
  ) {
    throw new RangeError(
      "Particle output and all form buffers must have matching nonzero count * 3 lengths.",
    );
  }

  const time = Number.isFinite(timeSeconds) ? timeSeconds : 0;
  const scroll = Number.isFinite(scrollProgress)
    ? Math.max(0, Math.min(1, scrollProgress))
    : 0;
  const px = Number.isFinite(pointerX) ? Math.max(-1, Math.min(1, pointerX)) : 0;
  const py = Number.isFinite(pointerY) ? Math.max(-1, Math.min(1, pointerY)) : 0;
  const phase = (((time % 18) / 6 + scroll * 2) % 3 + 3) % 3;
  const leg = Math.floor(phase);
  const progress = phase - leg;
  const blend = progress * progress * (3 - 2 * progress);
  const from = leg === 0 ? forms.sphere : leg === 1 ? forms.helix : forms.wave;
  const to = leg === 0 ? forms.helix : leg === 1 ? forms.wave : forms.sphere;
  const waveWeight = leg === 1 ? blend : leg === 2 ? 1 - blend : 0;

  // All displacement frequencies share this period, including across wraparound.
  const motionTime = time % (TWO_PI * 60);
  const pointerLength = Math.hypot(px, py);
  const pointerScale = 1 / Math.max(1, pointerLength);
  const pointerDepth = Math.min(1, pointerLength) * 0.1;

  for (let offset = 0; offset < length; offset += 3) {
    let x = from[offset] + (to[offset] - from[offset]) * blend;
    let y = from[offset + 1] + (to[offset + 1] - from[offset + 1]) * blend;
    let z = from[offset + 2] + (to[offset + 2] - from[offset + 2]) * blend;

    x += 0.025 * Math.sin(y * 2.2 + motionTime * 0.7);
    y += (0.035 + 0.105 * waveWeight) * Math.sin(x * 2.4 + z * 1.7 - motionTime * 1.2);
    z += 0.025 * Math.cos(x * 1.8 + motionTime * 0.9);

    // Local pointer-directed displacement and depth lift, <= sqrt(.2² + .1²).
    // Zero pointer input is neutral, so pointer leave can ease back to the origin.
    const dx = x - px * 1.7;
    const dy = y - py * 1.7;
    const influence = Math.exp(-(dx * dx + dy * dy) / 0.72);
    x += px * pointerScale * 0.2 * influence;
    y += py * pointerScale * 0.2 * influence;
    z += pointerDepth * influence;

    output[offset] = x;
    output[offset + 1] = y;
    output[offset + 2] = z;
  }
}
