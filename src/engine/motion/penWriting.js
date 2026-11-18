/**
 * penWriting.js
 * Physics-based calligraphic handwriting kinematics for Devanagari lyrics.
 * Synchronizes the pen tip's position, letter-by-letter (Akshara) stroke curves,
 * and the exact oblique ink-flow reveal mask so ink physically flows from the nib.
 */

// Devanagari syllable / grapheme segmenter
const hindiSegmenter =
  typeof Intl !== 'undefined' && Intl.Segmenter
    ? new Intl.Segmenter('hi', { granularity: 'grapheme' })
    : null

export function getAksharas(text = '') {
  if (!text) return ['']
  if (!hindiSegmenter) {
    return Array.from(text)
  }
  return Array.from(hindiSegmenter.segment(text)).map((s) => s.segment)
}

export function computePenWritingState(progress = 0, wordText = '') {
  const p = Math.max(0, Math.min(1, progress))
  const aksharas = getAksharas(wordText)
  const n = Math.max(1, aksharas.length)

  // Determine current active akshara
  const rawIndex = p * n
  const akIdx = Math.min(n - 1, Math.floor(rawIndex))
  const akProgress = Math.min(1, Math.max(0, (p - akIdx / n) / (1 / n)))

  // Percentage bounds of current akshara in the word
  const akStartPercent = (akIdx / n) * 100
  const akWidthPercent = (1 / n) * 100
  const akEndPercent = ((akIdx + 1) / n) * 100

  let localX = 0
  let localY = 0
  let lift = 0
  let isTouching = true
  let inkRevealedPercent = 0

  // Akshara Writing Lifecycle:
  // Phase 1 (0.00 -> 0.55): Character body curves, vertical stems, loops
  // Phase 2 (0.55 -> 0.82): Shirorekha (top headline) sweeps left-to-right
  // Phase 3 (0.82 -> 1.00): Pen lifts off paper and transitions to next akshara
  if (akProgress < 0.55) {
    const subP = akProgress / 0.55
    // Touchdown descent at the start of letter
    if (subP < 0.15) {
      lift = (1 - subP / 0.15) * -10
      isTouching = subP >= 0.1
    }
    // Tracing character body curves and vertical stems
    localX = subP * 0.70
    localY = Math.sin(subP * Math.PI) * 7
    inkRevealedPercent = akStartPercent + localX * akWidthPercent
  } else if (akProgress < 0.82) {
    const subP = (akProgress - 0.55) / 0.27
    // Shirorekha (top bar) sweep
    localX = 0.70 + subP * 0.30
    localY = -8 // on the top bar
    isTouching = true
    inkRevealedPercent = akStartPercent + localX * akWidthPercent
  } else {
    // Transit lift: pen rises off paper, stops dispensing ink, glides to next letter
    const subP = (akProgress - 0.82) / 0.18
    lift = Math.sin(subP * Math.PI) * -12
    isTouching = false
    inkRevealedPercent = akEndPercent
    localX = 1.0 + subP * 0.05
    localY = -8 + subP * 6
  }

  // End of word lift
  if (p >= 0.95) {
    const endP = (p - 0.95) / 0.05
    lift = endP * -16
    isTouching = false
    inkRevealedPercent = 100
  }

  const penX = Math.min(100, Math.max(0, akStartPercent + localX * akWidthPercent))

  // Natural right-handed pen angle: tilted +40deg to top-right
  // Subtle wrist oscillation as letters are drawn
  const wristOsc = Math.sin(p * n * Math.PI * 2) * 2.5
  const angle = 40 + wristOsc

  return {
    penX,
    yOffset: localY + lift,
    lift,
    angle,
    isTouching,
    inkRevealedPercent: Math.min(100, Math.max(0, inkRevealedPercent)),
    aksharas,
    akIdx,
  }
}
