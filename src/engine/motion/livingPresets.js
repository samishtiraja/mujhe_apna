import { createNoise2D } from 'simplex-noise'

// Deterministic PRNG so Simplex noise micro-motion is 100% reproducible on scrub & video export
function mulberry32(seed = 108) {
  let a = seed >>> 0
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const noise2D = createNoise2D(mulberry32(1947))

function hashSeed(str = '') {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return (h >>> 0) % 1000
}

/**
 * Organic, non-repeating paper-puppet & devotional atmosphere micro-motions.
 * Supports both modern (intensity, speed) and legacy (amp, period) config signatures.
 */
export function evaluateLivingMotion(elapsed = 0, rawConfig = null, rhythm = null) {
  if (!rawConfig) return { transforms: [], filters: [] }

  const cfg = typeof rawConfig === 'string' ? { type: rawConfig } : rawConfig
  const type = cfg.type || 'none'
  if (type === 'none') return { transforms: [], filters: [] }

  // Map legacy amp and period seamlessly
  let rawIntensity = cfg.intensity
  if (rawIntensity == null && cfg.amp != null) {
    rawIntensity = cfg.amp > 0.1 ? cfg.amp * 0.65 : cfg.amp * 28
  }
  const intensity = rawIntensity ?? 1.0

  let rawSpeed = cfg.speed
  if (rawSpeed == null && cfg.period != null && cfg.period > 0) {
    rawSpeed = 3.6 / cfg.period
  }
  const speed = rawSpeed ?? 1.0

  const seed = cfg.seed ?? hashSeed(cfg.id || type)
  const t = elapsed * speed
  const vocalLift = rhythm?.vocalEnergy ?? 0
  const beatPulse = rhythm?.beatPulse ?? 0

  const transforms = []
  const filters = []

  switch (type) {
    case 'pulse': {
      // Gentle rhythmic pulsation / emotional expansion
      const pWave = Math.sin(t * 1.5) * 0.7 + noise2D(t * 0.4, seed) * 0.3
      const scale = 1 + (0.012 * intensity * pWave) + (vocalLift * 0.004)
      transforms.push(`scale(${scale.toFixed(4)})`)
      break
    }

    case 'breathe':
    case 'prana': {
      // Gentle chest/posture rise with subtle Simplex variation
      const breathWave = Math.sin(t * 1.35) * 0.65 + noise2D(t * 0.35, seed) * 0.35
      const scaleY = 1 + (0.008 + vocalLift * 0.004) * intensity * breathWave
      const scaleX = 1 + 0.004 * intensity * breathWave
      const dy = -2.2 * intensity * breathWave
      transforms.push(`translate3d(0px, ${dy.toFixed(2)}px, 0) scale(${scaleX.toFixed(4)}, ${scaleY.toFixed(4)})`)
      break
    }

    case 'breeze':
    case 'sway':
    case 'pallu-sway': {
      // Wind passing softly through Vrindavan Kadamba groves / garment hem
      const nRot = noise2D(t * 0.42, seed + 11)
      const nX = noise2D(t * 0.3, seed + 29)
      const deg = (nRot * 1.35 + Math.sin(t * 1.1) * 0.45) * intensity
      const dx = nX * 3.5 * intensity
      transforms.push(`translate3d(${dx.toFixed(2)}px, 0px, 0) rotate(${deg.toFixed(3)}deg)`)
      break
    }

    case 'float':
    case 'drift': {
      const dx = noise2D(t * 0.28, seed + 3) * 6.0 * intensity
      const dy = noise2D(seed + 7, t * 0.32) * 5.0 * intensity
      const rot = noise2D(t * 0.2, seed + 19) * 0.8 * intensity
      transforms.push(`translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0) rotate(${rot.toFixed(3)}deg)`)
      break
    }

    case 'yearning':
    case 'viraha': {
      // Subtle emotional tremor on high vocal stress, calm stillness in pauses
      const slowDriftY = noise2D(t * 0.25, seed + 41) * 3.2 * intensity
      const microTremor = vocalLift * noise2D(t * 3.2, seed + 53) * 1.1 * intensity
      const scale = 1 + vocalLift * 0.009 * intensity
      transforms.push(`translate3d(${microTremor.toFixed(2)}px, ${slowDriftY.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`)
      break
    }

    case 'water-shimmer':
    case 'yamuna': {
      const dx = Math.sin(t * 1.8) * 2.2 * intensity + noise2D(t * 0.6, seed) * 1.8 * intensity
      const skew = noise2D(t * 0.75, seed + 67) * 0.9 * intensity
      transforms.push(`translate3d(${dx.toFixed(2)}px, 0px, 0) skewX(${skew.toFixed(3)}deg)`)
      break
    }

    case 'diya':
    case 'warm-flicker': {
      const flicker = 1 + noise2D(t * 2.8, seed + 83) * 0.06 * intensity
      filters.push(`brightness(${flicker.toFixed(3)})`)
      break
    }

    default: {
      // Fallback subtle parchment life
      const dx = noise2D(t * 0.22, seed) * 2.5 * intensity
      const dy = noise2D(seed, t * 0.25) * 2.5 * intensity
      transforms.push(`translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0)`)
      break
    }
  }

  return { transforms, filters }
}
