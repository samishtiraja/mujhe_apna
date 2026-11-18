import { useEffect, useState } from 'react'
import { clamp, computeKeyframesMotion, computeLinearMotion, easings } from '../motion/interpolate.js'
import { evaluateLivingMotion } from '../motion/livingPresets.js'
import { getLineEnterStyle, getLineExitStyle } from '../registries/lineAnimations.js'
import { resolvePosition } from '../systems/positionResolver.js'
import { resolveAssetUrl } from '../systems/assetUrl.js'

const chromaKeyCache = new Map()

function useChromaKeyedImage(src, enabled = false) {
  const [keyedSrc, setKeyedSrc] = useState(() => (enabled && src ? chromaKeyCache.get(src) || null : src))

  useEffect(() => {
    if (!src || !enabled) {
      setKeyedSrc(src)
      return
    }

    if (chromaKeyCache.has(src)) {
      setKeyedSrc(chromaKeyCache.get(src))
      return
    }

    let isCancelled = false
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = src

    img.onload = () => {
      if (isCancelled) return
      try {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        ctx.drawImage(img, 0, 0)
        const imgData = ctx.getImageData(0, 0, img.width, img.height)
        const data = imgData.data

        // Smooth spill-suppressed chroma key
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]
          const greenExcess = g - Math.max(r, b)
          if (greenExcess > 45) {
            const alphaScale = clamp(1 - (greenExcess - 45) / 65)
            data[i + 3] = Math.round(data[i + 3] * alphaScale)
            data[i + 1] = Math.min(g, Math.round((r + b) * 0.55))
          }
        }
        ctx.putImageData(imgData, 0, 0)
        const dataUrl = canvas.toDataURL('image/png')
        chromaKeyCache.set(src, dataUrl)
        if (!isCancelled) setKeyedSrc(dataUrl)
      } catch {
        if (!isCancelled) setKeyedSrc(src)
      }
    }

    return () => {
      isCancelled = true
    }
  }, [src, enabled])

  return keyedSrc
}

function OverlayTrackItem({ track, time, reduceMotion }) {
  const keyedSrc = useChromaKeyedImage(resolveAssetUrl(track.src), track.chromaKey === true)
  const duration = Math.max(0.1, track.end - track.start)
  const p = clamp((time - track.start) / duration)

  const fadeIn = track.fadeIn ?? 0.65
  const fadeOut = track.fadeOut ?? 0.65
  const timeFromStart = time - track.start
  const timeFromEnd = track.end - time

  let opacity = 1
  if (fadeIn > 0 && timeFromStart < fadeIn) {
    opacity *= easings.easeOutSine(clamp(timeFromStart / fadeIn))
  }
  if (fadeOut > 0 && timeFromEnd < fadeOut) {
    opacity *= easings.easeInOutSine(clamp(timeFromEnd / fadeOut))
  }

  const peak = track.opacity?.peak ?? (typeof track.opacity === 'number' ? track.opacity : 1.0)
  opacity *= peak

  const transforms = []
  if (!reduceMotion) {
    if (track.keyframes) {
      const kf = computeKeyframesMotion(track.keyframes, p)
      if (kf) {
        if (kf.x !== 0 || kf.y !== 0) transforms.push(`translate3d(${kf.x.toFixed(2)}px, ${kf.y.toFixed(2)}px, 0)`)
        if (kf.scale !== 1.0) transforms.push(`scale(${kf.scale.toFixed(4)})`)
      }
    } else if (track.motion) {
      const lm = computeLinearMotion(track.motion, p)
      if (lm.x !== 0 || lm.y !== 0) transforms.push(`translate3d(${lm.x.toFixed(2)}px, ${lm.y.toFixed(2)}px, 0)`)
      if (lm.scale !== 1.0) transforms.push(`scale(${lm.scale.toFixed(4)})`)
    }
  }

  if (!keyedSrc || opacity <= 0.005) return null

  return (
    <img
      src={keyedSrc}
      alt={track.id}
      className={`track-overlay ${track.className || ''}`}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: track.fit || 'cover',
        opacity: clamp(opacity),
        mixBlendMode: track.blend || 'multiply',
        transform: transforms.length > 0 ? transforms.join(' ') : undefined,
        pointerEvents: 'none',
        zIndex: track.zIndex ?? 3,
      }}
    />
  )
}

function TextTrackItem({ track, time, reduceMotion, rhythm }) {
  const duration = Math.max(0.1, track.end - track.start)
  const p = clamp((time - track.start) / duration)
  const timeFromStart = time - track.start
  const timeFromEnd = track.end - time

  const posStyle = resolvePosition(track.position, 'center')

  const enterConfig = track.enter || { type: 'ink-reveal', duration: 0.55 }
  const exitConfig = track.exit || { type: 'ink-dry', duration: 0.45 }
  const enterDur = enterConfig.duration ?? 0.55
  const exitDur = exitConfig.duration ?? 0.45

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
    if (track.keyframes) {
      const kf = computeKeyframesMotion(track.keyframes, p)
      if (kf) {
        if (kf.x !== 0 || kf.y !== 0) transforms.push(`translate3d(${kf.x.toFixed(2)}px, ${kf.y.toFixed(2)}px, 0)`)
        if (kf.scale !== 1.0) transforms.push(`scale(${kf.scale.toFixed(4)})`)
        if (kf.rotation !== 0) transforms.push(`rotate(${kf.rotation.toFixed(2)}deg)`)
      }
    } else if (track.motion) {
      const lm = computeLinearMotion(track.motion, p)
      if (lm.x !== 0 || lm.y !== 0) transforms.push(`translate3d(${lm.x.toFixed(2)}px, ${lm.y.toFixed(2)}px, 0)`)
      if (lm.scale !== 1.0) transforms.push(`scale(${lm.scale.toFixed(4)})`)
      if (lm.rotation !== 0) transforms.push(`rotate(${lm.rotation.toFixed(2)}deg)`)
    }

    if (track.living) {
      const living = evaluateLivingMotion(timeFromStart, track.living, rhythm)
      if (living.transforms.length > 0) transforms.push(...living.transforms)
    }
  }

  const style = track.style || {}
  const opacity = (enterStyle.opacity ?? 1) * (exitStyle.opacity ?? 1) * (style.opacity ?? 1)

  return (
    <div
      className={`track-text-element ${track.className || ''}`}
      style={{
        ...posStyle,
        opacity,
        filter: [enterStyle.filter, exitStyle.filter].filter(Boolean).join(' ') || undefined,
        transform: [posStyle.transform, enterStyle.transform, exitStyle.transform, ...transforms]
          .filter(Boolean)
          .join(' '),
        zIndex: track.zIndex ?? 15,
        fontSize: style.fontSize,
        color: style.color,
        fontWeight: style.fontWeight,
        letterSpacing: style.letterSpacing,
        textShadow: style.textShadow,
        pointerEvents: 'none',
      }}
    >
      {track.text}
    </div>
  )
}

export default function TrackRenderer({ tracks = [], time = 0, reduceMotion = false, rhythm = null }) {
  if (!tracks || tracks.length === 0) return null

  return (
    <div className="tracks-container-layer">
      {tracks.map((track) => {
        if (track.type === 'overlay') {
          return <OverlayTrackItem key={track.id} track={track} time={time} reduceMotion={reduceMotion} />
        }
        if (track.type === 'text') {
          return <TextTrackItem key={track.id} track={track} time={time} reduceMotion={reduceMotion} rhythm={rhythm} />
        }
        return null
      })}
    </div>
  )
}
