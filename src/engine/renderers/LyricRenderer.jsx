import { clamp, computeKeyframesMotion, computeLinearMotion, easings, lerp } from '../motion/interpolate.js'
import { evaluateLivingMotion } from '../motion/livingPresets.js'
import { computePenWritingState } from '../motion/penWriting.js'
import { getLineEnterStyle, getLineExitStyle } from '../registries/lineAnimations.js'
import { getWordRevealStyle } from '../registries/wordReveals.js'
import { resolvePosition } from '../systems/positionResolver.js'
import PenNib from './PenNib.jsx'

function LyricLineBlock({ line, time, reduceMotion, ghostTailProgress = null, rhythm = null }) {
  if (!line) return null

  const isGhost = ghostTailProgress !== null
  const evalTime = isGhost ? line.end : time
  const lDuration = Math.max(0.1, line.end - line.start)
  const lineProgress = clamp((evalTime - line.start) / lDuration)

  const lineStyle = line.style || {}
  const wordRevealType =
    typeof line.wordReveal === 'string'
      ? line.wordReveal
      : line.wordReveal?.type || line.reveal || 'ink-draw'

  // Single-word flashes shouldn't leave ghost couplet trails
  if (isGhost && wordRevealType === 'single-word') return null

  const currentWord =
    !isGhost && Array.isArray(line.words)
      ? line.words.find((w, idx) => {
          const nextWord = line.words[idx + 1]
          const wordStart = w.time
          const wordEnd = nextWord ? nextWord.time : line.end
          return time >= wordStart && time < wordEnd
        })
      : null

  const isSingleWordMode = wordRevealType === 'single-word'

  const effectivePos = isSingleWordMode && currentWord?.position ? currentWord.position : line.position
  const effectiveAnchor =
    isSingleWordMode && (currentWord?.anchor || currentWord?.position?.anchor)
      ? currentWord.anchor || currentWord.position.anchor
      : line.anchor || 'center'

  const posStyle = resolvePosition(effectivePos, effectiveAnchor)

  const enterConfig = line.enter || { type: 'ink-reveal', duration: 0.45 }
  const exitConfig = line.exit || { type: 'ink-dry', duration: 0.35 }
  const enterDur = enterConfig.duration ?? 0.45
  const exitDur = exitConfig.duration ?? 0.35

  const timeFromStart = evalTime - line.start
  const timeFromEnd = line.end - evalTime

  let enterStyle = {}
  if (!isGhost && enterDur > 0 && timeFromStart < enterDur) {
    enterStyle = getLineEnterStyle(enterConfig, clamp(timeFromStart / enterDur))
  }

  let exitStyle = {}
  if (isGhost) {
    // Organic wet-ink evaporation into parchment fibers
    const fade = 1 - easings.easeOutQuad(clamp(ghostTailProgress))
    const driftY = -12 * easings.easeOutSine(clamp(ghostTailProgress))
    exitStyle = {
      opacity: fade * 0.48,
      transform: `translate3d(0px, ${driftY.toFixed(2)}px, 0)`,
      filter: `blur(${(ghostTailProgress * 2.1).toFixed(2)}px)`,
    }
  } else if (exitDur > 0 && timeFromEnd < exitDur) {
    exitStyle = getLineExitStyle(exitConfig, clamp(timeFromEnd / exitDur))
  }

  const transforms = []
  if (!reduceMotion) {
    if (Array.isArray(line.keyframes) && line.keyframes.length > 0) {
      const kf = computeKeyframesMotion(line.keyframes, lineProgress)
      if (kf) {
        if (kf.x !== 0 || kf.y !== 0) transforms.push(`translate3d(${kf.x.toFixed(2)}px, ${kf.y.toFixed(2)}px, 0)`)
        if (kf.scale !== 1.0) transforms.push(`scale(${kf.scale.toFixed(4)})`)
        if (kf.rotation !== 0) transforms.push(`rotate(${kf.rotation.toFixed(2)}deg)`)
      }
    } else if (line.motion) {
      const lm = computeLinearMotion(line.motion, lineProgress)
      if (lm.x !== 0 || lm.y !== 0) transforms.push(`translate3d(${lm.x.toFixed(2)}px, ${lm.y.toFixed(2)}px, 0)`)
      if (lm.scale !== 1.0) transforms.push(`scale(${lm.scale.toFixed(4)})`)
      if (lm.rotation !== 0) transforms.push(`rotate(${lm.rotation.toFixed(2)}deg)`)
    }

    const livingCfg = line.living || { type: 'float', intensity: 0.22, id: line.id }
    const living = evaluateLivingMotion(timeFromStart, livingCfg, rhythm)
    if (living.transforms.length > 0) transforms.push(...living.transforms)
  }

  const wordFontSize = isSingleWordMode ? (currentWord?.fontSize || currentWord?.size || currentWord?.style?.fontSize) : undefined
  const wordColor = isSingleWordMode ? (currentWord?.color || currentWord?.style?.color) : undefined
  const wordFontWeight = isSingleWordMode ? (currentWord?.fontWeight || currentWord?.style?.fontWeight) : undefined
  const wordLetterSpacing = isSingleWordMode ? (currentWord?.letterSpacing || currentWord?.style?.letterSpacing) : undefined

  const combinedOpacity =
    (enterStyle.opacity ?? 1) * (exitStyle.opacity ?? 1) * (lineStyle.opacity ?? 1)

  const containerStyle = {
    ...posStyle,
    opacity: combinedOpacity,
    transform: [posStyle.transform, enterStyle.transform, exitStyle.transform, ...transforms]
      .filter(Boolean)
      .join(' '),
    filter: [enterStyle.filter, exitStyle.filter, lineStyle.filter].filter(Boolean).join(' ') || undefined,
    fontSize: isSingleWordMode ? (wordFontSize || lineStyle.fontSize || undefined) : (lineStyle.fontSize || 'clamp(1.8rem, 3.4vw, 3.0rem)'),
    color: isSingleWordMode ? (wordColor || lineStyle.color || undefined) : (lineStyle.color || undefined),
    fontWeight: isSingleWordMode ? (wordFontWeight || lineStyle.fontWeight || undefined) : (lineStyle.fontWeight || undefined),
    letterSpacing: isSingleWordMode ? (wordLetterSpacing || lineStyle.letterSpacing || undefined) : (lineStyle.letterSpacing || undefined),
    maxWidth: line.position?.maxWidth || lineStyle.maxWidth || undefined,
    textShadow: lineStyle.textShadow || undefined,
    ...(isSingleWordMode ? (currentWord?.style || {}) : {}),
  }

  return (
    <div
      className={`lyric-line-wrapper dynamic-lyric-line ${isGhost ? 'lyric-line-ghost' : ''}`}
      style={containerStyle}
    >
      {Array.isArray(line.words) &&
        line.words.map((w, idx) => {
          const nextWord = line.words[idx + 1]
          const wordStart = w.time
          const wordEnd = nextWord ? nextWord.time : line.end
          const wordDuration = Math.max(0.18, wordEnd - wordStart)

          const isCurrent = !isGhost && time >= wordStart && time < wordEnd
          const isSung = isGhost || time >= wordEnd

          if (wordRevealType === 'single-word' && !isCurrent) {
            return null
          }

          let drawProgress = 0
          if (isSung) drawProgress = 1
          else if (isCurrent) drawProgress = clamp((time - wordStart) / wordDuration)

          const revealStyle = getWordRevealStyle(wordRevealType, drawProgress, isCurrent, isSung)
          if (revealStyle.opacity === 0) return null

          // Sustained vocal alaap breath on long syllables (> 0.65s)
          let alaapTransform = ''
          if (!reduceMotion && isCurrent && wordDuration > 0.65) {
            const alaapSwell = Math.sin(drawProgress * Math.PI)
            const letterExpand = lerp(0, 0.028, alaapSwell)
            alaapTransform = `scale(${(1 + alaapSwell * 0.025).toFixed(4)})`
            w._alaapTracking = `${letterExpand.toFixed(3)}em`
          }

          const statusClass = isCurrent ? 'current' : isSung ? 'sung' : 'unsung'
          const wordItemFontSize = w.fontSize || w.size || w.style?.fontSize
          const wordItemColor = w.color || w.style?.color

          // Wet sindoor-crimson ink smoothly drying into deep sepia-charcoal ink
          const inkColor =
            wordItemColor ||
            (isCurrent
              ? lineStyle.activeColor || '#7d1e1d'
              : isSung
              ? lineStyle.sungColor || '#261c14'
              : lineStyle.unsungColor || '#6e5645')

          const isWritingMode =
            (wordRevealType === 'ink-draw' || wordRevealType === 'paint-brush') &&
            isCurrent &&
            !reduceMotion &&
            revealStyle.showNib !== false

          const penState = isWritingMode ? computePenWritingState(drawProgress, w.text) : null

          const activeInkMask = penState
            ? `linear-gradient(115deg, #000 ${penState.inkRevealedPercent.toFixed(1)}%, rgba(0,0,0,0.6) ${Math.min(100, penState.inkRevealedPercent + 1.2).toFixed(1)}%, transparent ${Math.min(100, penState.inkRevealedPercent + 2.6).toFixed(1)}%)`
            : revealStyle.inkMask

          const wordOffsetTransform = w.offset
            ? `translate3d(${w.offset.x || 0}px, ${w.offset.y || 0}px, 0)`
            : ''

          return (
            <span
              key={`${line.id}-${idx}-${w.text}`}
              className={`lyric-word-container ${statusClass} word-style-${wordRevealType}`}
              style={{
                fontSize: wordItemFontSize || undefined,
                opacity: revealStyle.opacity,
                transform: [wordOffsetTransform, revealStyle.transform, alaapTransform].filter(Boolean).join(' ') || undefined,
                filter: revealStyle.filter,
                letterSpacing: isCurrent && wordDuration > 0.65 ? w._alaapTracking : undefined,
                ...(w.style || {}),
              }}
            >
              {line.showGuide === true && !revealStyle.hideFaint && (
                <span className="lyric-word-faint" style={{ color: lineStyle.guideColor }}>
                  {w.text}
                </span>
              )}

              <span
                className="lyric-word-ink"
                style={{
                  color: inkColor,
                  maskImage: activeInkMask,
                  WebkitMaskImage: activeInkMask,
                }}
              >
                {w.text}
              </span>

              {penState && (
                <PenNib
                  penState={penState}
                  inkColor={inkColor}
                />
              )}
            </span>
          )
        })}
    </div>
  )
}

export default function LyricRenderer({
  activeLine,
  previousLyric = null,
  time = 0,
  reduceMotion = false,
  rhythm = null,
}) {
  if (!activeLine && !previousLyric) return null

  return (
    <>
      {previousLyric?.line && (
        <LyricLineBlock
          key={`ghost-${previousLyric.line.id}`}
          line={previousLyric.line}
          time={time}
          reduceMotion={reduceMotion}
          ghostTailProgress={previousLyric.tailProgress}
          rhythm={rhythm}
        />
      )}
      {activeLine && (
        <LyricLineBlock
          key={`active-${activeLine.id}`}
          line={activeLine}
          time={time}
          reduceMotion={reduceMotion}
          rhythm={rhythm}
        />
      )}
    </>
  )
}
