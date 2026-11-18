import { clamp, computeKeyframesMotion, computeLinearMotion } from '../motion/interpolate.js'
import { evaluateLivingMotion } from '../motion/livingPresets.js'
import { getLineEnterStyle, getLineExitStyle } from '../registries/lineAnimations.js'
import { resolvePosition } from '../systems/positionResolver.js'

function CreditItem({ credit, time, reduceMotion, rhythm }) {
  const duration = Math.max(0.1, credit.end - credit.start)
  const p = clamp((time - credit.start) / duration)
  const timeFromStart = time - credit.start
  const timeFromEnd = credit.end - time

  const posStyle = resolvePosition(credit.position, credit.anchor || 'center')

  const enterConfig = credit.enter || { type: 'ink-reveal', duration: 0.75 }
  const exitConfig = credit.exit || { type: 'ink-dry', duration: 0.65 }
  const enterDur = enterConfig.duration ?? 0.75
  const exitDur = exitConfig.duration ?? 0.65

  let enterStyle = {}
  if (enterDur > 0 && timeFromStart < enterDur) {
    enterStyle = getLineEnterStyle(enterConfig, clamp(timeFromStart / enterDur))
  }

  let exitStyle = {}
  if (exitDur > 0 && timeFromEnd < exitDur) {
    exitStyle = getLineExitStyle(exitConfig, clamp(timeFromEnd / exitDur))
  }

  const transforms = []
  if (!reduceMotion) {
    if (credit.keyframes) {
      const kf = computeKeyframesMotion(credit.keyframes, p)
      if (kf) {
        if (kf.x !== 0 || kf.y !== 0) transforms.push(`translate3d(${kf.x.toFixed(2)}px, ${kf.y.toFixed(2)}px, 0)`)
        if (kf.scale !== 1.0) transforms.push(`scale(${kf.scale.toFixed(4)})`)
        if (kf.rotation !== 0) transforms.push(`rotate(${kf.rotation.toFixed(2)}deg)`)
      }
    } else if (credit.motion) {
      const lm = computeLinearMotion(credit.motion, p)
      if (lm.x !== 0 || lm.y !== 0) transforms.push(`translate3d(${lm.x.toFixed(2)}px, ${lm.y.toFixed(2)}px, 0)`)
      if (lm.scale !== 1.0) transforms.push(`scale(${lm.scale.toFixed(4)})`)
      if (lm.rotation !== 0) transforms.push(`rotate(${lm.rotation.toFixed(2)}deg)`)
    }

    const livingCfg = credit.living || { type: 'float', intensity: 0.18, id: credit.id }
    const living = evaluateLivingMotion(timeFromStart, livingCfg, rhythm)
    if (living.transforms.length > 0) transforms.push(...living.transforms)
  }

  const style = credit.style || {}
  const opacity = (enterStyle.opacity ?? 1) * (exitStyle.opacity ?? 1) * (style.opacity ?? 1)

  let creditTypeClass = 'credit-presentation'
  if (credit.isTitle || credit.type === 'title') creditTypeClass = 'credit-title'
  else if (credit.isSubtitle || credit.type === 'subtitle') creditTypeClass = 'credit-subtitle'
  else if (credit.isPoet || credit.type === 'poet') creditTypeClass = 'credit-poet'
  else if (credit.isDoha || credit.type === 'doha') creditTypeClass = 'credit-doha'
  else if (credit.isShloka || credit.type === 'shloka') creditTypeClass = 'credit-shloka'

  return (
    <div
      className={`credit-item ${creditTypeClass} ${credit.className || ''}`}
      style={{
        ...posStyle,
        opacity,
        transform: [posStyle.transform, enterStyle.transform, exitStyle.transform, ...transforms]
          .filter(Boolean)
          .join(' '),
        fontFamily: style.fontFamily,
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        lineHeight: style.lineHeight,
        color: style.color,
        letterSpacing: style.letterSpacing,
        textShadow: style.textShadow,
        whiteSpace: 'pre-line',
        textAlign: posStyle.textAlign || 'center',
        background: style.background,
        WebkitBackgroundClip: style.WebkitBackgroundClip,
        backgroundClip: style.backgroundClip || style.WebkitBackgroundClip,
        WebkitTextFillColor: style.WebkitTextFillColor,
        filter: [enterStyle.filter, exitStyle.filter, style.filter].filter(Boolean).join(' ') || undefined,
      }}
    >
      {credit.isPoet ? (
        <>
          <span>रचना</span>
          {credit.text}
        </>
      ) : credit.isDoha ? (
        <>
          <div className="doha-text">
            {credit.text.split('\n').map((line, idx) => (
              <span key={idx} className="doha-line">
                {line}
              </span>
            ))}
          </div>
          {credit.subtext && <div className="doha-subtext">{credit.subtext}</div>}
        </>
      ) : credit.isShloka ? (
        <>
          <div className="shloka-text">
            {credit.text.split('\n').map((line, idx) => (
              <span key={idx} className="shloka-line">
                {line}
              </span>
            ))}
          </div>
          {credit.subtext && <div className="shloka-subtext">{credit.subtext}</div>}
        </>
      ) : (
        credit.text.split('\n').map((line, idx) => (
          <span key={idx} style={{ display: 'block' }}>
            {line}
          </span>
        ))
      )}
    </div>
  )
}

export default function CreditRenderer({ activeCredits = [], time = 0, reduceMotion = false, rhythm = null }) {
  if (!activeCredits || activeCredits.length === 0) return null

  return (
    <div className="credits-container-layer">
      {activeCredits.map((credit) => (
        <CreditItem key={credit.id} credit={credit} time={time} reduceMotion={reduceMotion} rhythm={rhythm} />
      ))}
    </div>
  )
}
