export const clamp = (val, min = 0, max = 1) => Math.max(min, Math.min(max, val))
export const lerp = (a, b, t) => a + (b - a) * t

export const easings = {
  linear: (t) => t,
  easeInSine: (t) => 1 - Math.cos((t * Math.PI) / 2),
  easeOutSine: (t) => Math.sin((t * Math.PI) / 2),
  easeInOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
  easeInQuad: (t) => t * t,
  easeOutQuad: (t) => 1 - (1 - t) * (1 - t),
  easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2),
  easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
  easeInCubic: (t) => t * t * t,
  easeInOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  easeOutQuart: (t) => 1 - Math.pow(1 - t, 4),
  easeInOutQuart: (t) => (t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2),
  easeOutQuint: (t) => 1 - Math.pow(1 - t, 5),
  // Soft vocal-onset spring without cartoonish overshoot
  vocalSpring: (t) => {
    const c = clamp(t)
    return 1 - Math.exp(-6.5 * c) * Math.cos(3.2 * c)
  },
  smoothstep: (t) => {
    const c = clamp(t)
    return c * c * (3 - 2 * c)
  },
  smootherstep: (t) => {
    const c = clamp(t)
    return c * c * c * (c * (c * 6 - 15) + 10)
  },
}

export function easeByName(name = 'easeInOutSine', t = 0) {
  const fn = easings[name] || easings.easeInOutSine
  return fn(clamp(t))
}

export function computeLinearMotion(motion = {}, progress = 0) {
  const easeName = motion.ease || motion.easing || 'easeInOutSine'
  const p = easeByName(easeName, progress)

  const x0 = motion.xStart ?? motion.fromX ?? 0
  const x1 = motion.xEnd ?? motion.toX ?? motion.x ?? 0
  const y0 = motion.yStart ?? motion.fromY ?? 0
  const y1 = motion.yEnd ?? motion.toY ?? motion.y ?? 0
  const s0 = motion.scaleStart ?? motion.fromScale ?? 1.0
  const s1 = motion.scaleEnd ?? motion.toScale ?? motion.scale ?? 1.0
  const r0 = motion.rotateStart ?? motion.fromRotation ?? 0
  const r1 = motion.rotateEnd ?? motion.toRotation ?? motion.rotation ?? 0

  const opacity =
    motion.opacityStart != null || motion.opacityEnd != null
      ? lerp(motion.opacityStart ?? 1, motion.opacityEnd ?? 1, p)
      : null

  return {
    x: lerp(x0, x1, p),
    y: lerp(y0, y1, p),
    scale: lerp(s0, s1, p),
    rotation: lerp(r0, r1, p),
    opacity,
  }
}

export function computeKeyframesMotion(keyframes = [], progress = 0) {
  if (!Array.isArray(keyframes) || keyframes.length === 0) return null
  const p = clamp(progress)

  const sorted =
    keyframes.length > 1 && keyframes[0].p !== undefined
      ? [...keyframes].sort((a, b) => (a.p ?? a.offset ?? 0) - (b.p ?? b.offset ?? 0))
      : keyframes

  const getOffset = (kf, idx) =>
    kf.p ?? kf.offset ?? kf.at ?? (sorted.length > 1 ? idx / (sorted.length - 1) : 0)

  let prev = sorted[0]
  let next = sorted[sorted.length - 1]
  let prevOffset = getOffset(prev, 0)
  let nextOffset = getOffset(next, sorted.length - 1)

  for (let i = 0; i < sorted.length - 1; i++) {
    const oA = getOffset(sorted[i], i)
    const oB = getOffset(sorted[i + 1], i + 1)
    if (p >= oA && p <= oB) {
      prev = sorted[i]
      next = sorted[i + 1]
      prevOffset = oA
      nextOffset = oB
      break
    }
  }

  const span = Math.max(0.0001, nextOffset - prevOffset)
  const localRaw = p <= prevOffset ? 0 : p >= nextOffset ? 1 : (p - prevOffset) / span
  const localP = easeByName(next.ease || next.easing || 'easeInOutSine', localRaw)

  return {
    x: lerp(prev.x ?? 0, next.x ?? 0, localP),
    y: lerp(prev.y ?? 0, next.y ?? 0, localP),
    scale: lerp(prev.scale ?? 1, next.scale ?? 1, localP),
    rotation: lerp(prev.rotation ?? prev.rotate ?? 0, next.rotation ?? next.rotate ?? 0, localP),
    opacity:
      prev.opacity != null || next.opacity != null
        ? lerp(prev.opacity ?? 1, next.opacity ?? 1, localP)
        : null,
  }
}
