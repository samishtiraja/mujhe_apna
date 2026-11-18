import { clamp, easings } from '../motion/interpolate.js'

/**
 * Wet-ink calligraphy word reveals onto handmade Khadi paper.
 * Uses soft feathered CSS mask gradients instead of harsh clip-path polygons or glowing laser bars.
 */
export function getWordRevealStyle(type = 'ink-draw', progress = 0, isCurrent = false, isSung = false) {
  const p = clamp(progress)

  // Unsung words stay completely invisible on clean paper unless explicitly using karaoke-highlight
  if (!isCurrent && !isSung && type !== 'karaoke-highlight') {
    return {
      opacity: 0,
      hideFaint: true,
      showNib: false,
    }
  }

  switch (type) {
    case 'single-word': {
      const enter = easings.easeOutCubic(clamp(p * 3.2))
      const gentleHold = 1 + Math.sin(p * Math.PI) * 0.025
      return {
        opacity: enter,
        transform: `translate3d(0px, ${((1 - enter) * 7).toFixed(2)}px, 0) scale(${gentleHold.toFixed(4)})`,
        filter: enter < 0.98 ? `blur(${((1 - enter) * 2.2).toFixed(2)}px)` : undefined,
        hideFaint: true,
        showNib: false,
        activeHighlight: true,
      }
    }

    case 'karaoke-highlight': {
      const opacity = isSung ? 0.94 : isCurrent ? 0.65 + p * 0.35 : 0.24
      const lift = isCurrent ? -1.5 * Math.sin(p * Math.PI) : 0
      return {
        opacity,
        transform: `translate3d(0px, ${lift.toFixed(2)}px, 0)`,
        hideFaint: true,
        showNib: false,
        activeHighlight: isCurrent,
      }
    }

    case 'smoke-fade':
    case 'whisper': {
      const fadeP = isSung ? 1 : easings.easeOutCubic(clamp(p * 1.65))
      return {
        opacity: fadeP,
        transform: `translate3d(0px, ${((1 - fadeP) * 5).toFixed(2)}px, 0)`,
        filter: fadeP < 0.98 ? `blur(${((1 - fadeP) * 3.2).toFixed(2)}px)` : undefined,
        hideFaint: true,
        showNib: false,
      }
    }

    case 'pop-bounce':
    case 'pop':
    case 'stamp': {
      const s = isSung ? 1 : easings.vocalSpring(clamp(p * 2.2))
      return {
        opacity: clamp(p * 3.5 || (isSung ? 1 : 0)),
        transform: `scale(${(0.92 + 0.08 * s).toFixed(4)})`,
        hideFaint: true,
        showNib: false,
        activeHighlight: isCurrent,
      }
    }

    case 'paint-brush':
    case 'ink-draw':
    default: {
      if (isSung) {
        return {
          opacity: 1,
          hideFaint: true,
          showNib: false,
        }
      }

      // Soft feathered wet-ink flow trailing right behind the calligraphy pen nib
      const eased = easings.easeOutQuad(clamp(p * 1.15))
      const solidStop = Math.max(0, eased * 106 - 10).toFixed(1)
      const featherMid = Math.max(0, eased * 106 - 2).toFixed(1)
      const featherTip = Math.min(100, eased * 106 + 6).toFixed(1)
      const mask = `linear-gradient(90deg, #000 ${solidStop}%, rgba(0,0,0,0.68) ${featherMid}%, rgba(0,0,0,0) ${featherTip}%)`

      // Subtle vocal-onset breath that settles into the paper
      const onsetLift = Math.sin(clamp(p * 1.4) * Math.PI) * -1.1
      const wetBlur = p < 0.25 ? ((0.25 - p) * 1.4).toFixed(2) : 0

      return {
        opacity: 1,
        inkMask: mask,
        transform: `translate3d(0px, ${onsetLift.toFixed(2)}px, 0)`,
        filter: wetBlur > 0 ? `blur(${wetBlur}px)` : undefined,
        hideFaint: true,
        showNib: true,
        activeHighlight: true,
      }
    }
  }
}
