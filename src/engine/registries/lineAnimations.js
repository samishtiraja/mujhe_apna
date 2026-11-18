import { clamp, easings } from '../motion/interpolate.js'

export function getLineEnterStyle(config = {}, rawProgress = 1) {
  const type = typeof config === 'string' ? config : config.type || 'ink-reveal'
  const p = easings.easeOutCubic(clamp(rawProgress))
  const inv = 1 - p

  switch (type) {
    case 'none':
      return {}
    case 'float-up':
    case 'rise':
      return {
        opacity: p,
        transform: `translate3d(0px, ${(inv * 12).toFixed(2)}px, 0)`,
        filter: inv > 0.02 ? `blur(${(inv * 1.6).toFixed(2)}px)` : undefined,
      }
    case 'mist':
    case 'smoke':
      return {
        opacity: p,
        transform: `translate3d(0px, ${(inv * 8).toFixed(2)}px, 0) scale(${(0.985 + p * 0.015).toFixed(4)})`,
        filter: inv > 0.02 ? `blur(${(inv * 4.2).toFixed(2)}px)` : undefined,
      }
    case 'ink-reveal':
    case 'fade-in':
    default:
      return {
        opacity: easings.easeOutSine(clamp(rawProgress)),
        transform: `translate3d(0px, ${(inv * 5).toFixed(2)}px, 0)`,
        filter: inv > 0.03 ? `blur(${(inv * 1.1).toFixed(2)}px)` : undefined,
      }
  }
}

export function getLineExitStyle(config = {}, rawRemainingProgress = 1) {
  const type = typeof config === 'string' ? config : config.type || 'ink-dry'
  // rawRemainingProgress goes 1 -> 0 as line approaches its end
  const p = easings.easeInOutSine(clamp(rawRemainingProgress))
  const out = 1 - p

  switch (type) {
    case 'none':
      return {}
    case 'smoke-out':
    case 'evaporate':
      return {
        opacity: p,
        transform: `translate3d(0px, ${(-out * 10).toFixed(2)}px, 0)`,
        filter: out > 0.03 ? `blur(${(out * 2.8).toFixed(2)}px)` : undefined,
      }
    case 'ink-dry':
    case 'fade-out':
    default:
      return {
        opacity: p,
        transform: `translate3d(0px, ${(-out * 5).toFixed(2)}px, 0)`,
        filter: out > 0.04 ? `blur(${(out * 1.2).toFixed(2)}px)` : undefined,
      }
  }
}
