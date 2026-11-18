import { clamp, easings } from '../motion/interpolate.js'

/**
 * Handcrafted paper & ink transition styles (replacing stiff slide/wipe presets).
 * Supports both modern transitionIn/transitionOut and legacy transition objects.
 */
export function getTransitionStyle(shot, time) {
  if (!shot) return {}

  const style = {}
  const transforms = []
  const filters = []

  const legacyTrans = shot.transition ? (typeof shot.transition === 'string' ? { type: shot.transition } : shot.transition) : null
  const tIn = shot.transitionIn ? (typeof shot.transitionIn === 'string' ? { type: shot.transitionIn } : shot.transitionIn) : legacyTrans
  const tOut = shot.transitionOut ? (typeof shot.transitionOut === 'string' ? { type: shot.transitionOut } : shot.transitionOut) : legacyTrans

  const inDur = tIn?.duration ?? shot.fadeIn ?? (shot.id === 's01' ? 0.8 : 0.85)
  const outDur = tOut?.duration ?? shot.fadeOut ?? 0.85

  const elapsed = time - shot.start
  const remaining = shot.end - time

  if (tIn && elapsed >= 0 && elapsed < inDur) {
    const p = easings.easeOutCubic(clamp(elapsed / inDur))
    const inv = 1 - p

    switch (tIn.type) {
      case 'ink-burst':
      case 'ink-wash':
      case 'watercolor':
      case 'radial-bloom': {
        const inner = (p * 115).toFixed(1)
        const outer = (p * 115 + 28).toFixed(1)
        const mask = `radial-gradient(ellipse at 50% 50%, rgba(0,0,0,1) ${inner}%, rgba(0,0,0,0) ${outer}%)`
        style.maskImage = mask
        style.WebkitMaskImage = mask
        filters.push(`blur(${(inv * 2.4).toFixed(2)}px) sepia(${(inv * 0.18).toFixed(2)})`)
        transforms.push(`scale(${(1 + inv * 0.022).toFixed(4)})`)
        break
      }
      case 'smoke-dissolve':
      case 'mist-veil':
      case 'soft-focus': {
        filters.push(`blur(${(inv * 5.5).toFixed(2)}px) brightness(${(1 + inv * 0.06).toFixed(3)})`)
        transforms.push(`scale(${(1 + inv * 0.018).toFixed(4)})`)
        break
      }
      case 'parchment-drift':
      case 'drift': {
        transforms.push(`translate3d(0px, ${(inv * 14).toFixed(2)}px, 0) scale(${(1 + inv * 0.015).toFixed(4)})`)
        filters.push(`blur(${(inv * 1.8).toFixed(2)}px)`)
        break
      }
      case 'taal-cut':
      case 'cut': {
        // Crisp rhythmic accent settle
        const settle = easings.easeOutQuint(clamp(elapsed / Math.min(0.24, inDur)))
        transforms.push(`scale(${(1 + (1 - settle) * 0.014).toFixed(4)})`)
        break
      }
      case 'fade':
      case 'fade-in':
      default:
        filters.push(`blur(${(inv * 1.5).toFixed(2)}px)`)
        break
    }
  }

  if (tOut && remaining >= 0 && remaining < outDur) {
    const p = easings.easeInOutSine(clamp(remaining / outDur)) // 1 -> 0
    const outProgress = 1 - p

    switch (tOut.type) {
      case 'smoke-evaporate':
      case 'ink-evaporate':
      case 'mist-veil': {
        filters.push(`blur(${(outProgress * 4.5).toFixed(2)}px) sepia(${(outProgress * 0.15).toFixed(2)})`)
        transforms.push(`translate3d(0px, ${(-outProgress * 10).toFixed(2)}px, 0)`)
        break
      }
      case 'soft-focus':
      case 'smoke-dissolve': {
        filters.push(`blur(${(outProgress * 3.5).toFixed(2)}px)`)
        break
      }
      case 'cut':
      case 'taal-cut': {
        break
      }
      default:
        filters.push(`blur(${(outProgress * 1.5).toFixed(2)}px)`)
        break
    }
  }

  if (transforms.length > 0) style.transform = transforms.join(' ')
  if (filters.length > 0) style.filter = filters.join(' ')

  return style
}
