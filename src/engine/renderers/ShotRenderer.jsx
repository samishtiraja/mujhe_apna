import { useEffect, useState } from 'react'
import { createNoise2D } from 'simplex-noise'
import { clamp, computeKeyframesMotion, computeLinearMotion, easings, lerp } from '../motion/interpolate.js'
import { evaluateLivingMotion } from '../motion/livingPresets.js'
import { getTransitionStyle } from '../registries/transitions.js'
import { buildVignetteStyle, resolveEffectsStyle } from '../registries/effects.js'
import { resolveAssetUrl } from '../systems/assetUrl.js'

// Deterministic Simplex noise for subtle organic camera weave
const camNoise2D = createNoise2D(() => 0.4219)

// In-memory cache for softly feathered paper-isolated cutouts
const isolatedImageCache = new Map()

function useAutoIsolatedImage(src, isElementLayer = false) {
  const [isolatedSrc, setIsolatedSrc] = useState(() => (src ? isolatedImageCache.get(src) || src : null))

  useEffect(() => {
    if (!src || !isElementLayer) {
      setIsolatedSrc(src)
      return
    }

    if (isolatedImageCache.has(src)) {
      setIsolatedSrc(isolatedImageCache.get(src))
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

        // Sample corner pixels to detect paper backing tint
        const corners = [
          0,
          (img.width - 1) * 4,
          (img.height - 1) * img.width * 4,
          ((img.height - 1) * img.width + img.width - 1) * 4,
        ]
        let crSum = 0
        let cgSum = 0
        let cbSum = 0
        let cornerAlphaSum = 0
        corners.forEach((idx) => {
          crSum += data[idx]
          cgSum += data[idx + 1]
          cbSum += data[idx + 2]
          cornerAlphaSum += data[idx + 3]
        })

        // Skip processing if asset already has native alpha transparency
        if (cornerAlphaSum / 4 < 40) {
          isolatedImageCache.set(src, src)
          if (!isCancelled) setIsolatedSrc(src)
          return
        }

        const bgR = crSum / 4
        const bgG = cgSum / 4
        const bgB = cbSum / 4

        // Soft perceptual feathering that preserves delicate pencil/ink washes
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]
          const lum = 0.299 * r + 0.587 * g + 0.114 * b

          const dr = r - bgR
          const dg = g - bgG
          const db = b - bgB
          const bgDist = Math.sqrt(dr * dr + dg * dg + db * db)

          if (lum > 242 || (lum > 205 && bgDist < 22)) {
            data[i + 3] = 0
          } else if (lum > 188 && bgDist < 54) {
            const feather = clamp((bgDist - 20) / 34)
            data[i + 3] = Math.round(data[i + 3] * feather * feather)
          }
        }

        ctx.putImageData(imgData, 0, 0)
        const dataUrl = canvas.toDataURL('image/png')
        isolatedImageCache.set(src, dataUrl)
        if (!isCancelled) setIsolatedSrc(dataUrl)
      } catch {
        if (!isCancelled) setIsolatedSrc(src)
      }
    }

    return () => {
      isCancelled = true
    }
  }, [src, isElementLayer])

  return isolatedSrc
}

function ElementImage({ layer }) {
  const isElement = layer.removeBg !== false
  const resolvedSrc = resolveAssetUrl(layer.src)
  const imgSrc = useAutoIsolatedImage(resolvedSrc, isElement)

  return (
    <img
      src={imgSrc || resolvedSrc}
      alt={layer.id || ''}
      style={{
        width: '100%',
        height: '100%',
        objectFit: layer.fit || 'contain',
        display: 'block',
      }}
      onError={(e) => {
        e.currentTarget.style.display = 'none'
      }}
    />
  )
}

/**
 * GPU-composited S-curve camera with subtle Simplex-noise breathing & parallax vector export.
 */
function computeCameraState(time, shot, reduceMotion, rhythm) {
  if (reduceMotion) {
    return {
      transform: 'translate3d(0px, 0px, 0) scale(1)',
      panX: 0,
      panY: 0,
    }
  }

  const sStart = shot.sceneStart ?? shot.start
  const sEnd = shot.sceneEnd ?? shot.end
  const duration = Math.max(0.1, sEnd - sStart)
  const rawP = clamp((time - sStart) / duration)
  const c = shot.camera || {}
  const easedP = easings.easeInOutSine(rawP)

  const scaleStart = c.scaleStart ?? 1.01
  const scaleEnd = c.scaleEnd ?? 1.065
  // Pure, smooth continuous S-curve Ken Burns zoom across the entire shot (zero dholak blinking/shaking)
  const scale = lerp(scaleStart, scaleEnd, easedP)

  // Convert legacy transformOrigin % shift into smooth subpixel-stable GPU translation
  const oxStart = c.originStartX ?? 50
  const oxEnd = c.originEndX ?? 50
  const oyStart = c.originStartY ?? 50
  const oyEnd = c.originEndY ?? 50

  const ox = lerp(oxStart, oxEnd, easedP)
  const oy = lerp(oyStart, oyEnd, easedP)

  // Gentle organic paper/lens weave so still illustrations never feel frozen
  const weaveX = camNoise2D(time * 0.12, sStart * 0.1) * 2.2
  const weaveY = camNoise2D(sStart * 0.1 + 17, time * 0.12) * 1.8

  const panX = (50 - ox) * (scale - 1) * 15 + (c.panX ? lerp(c.panX[0], c.panX[1], easedP) : 0) + weaveX
  const panY = (50 - oy) * (scale - 1) * 10 + (c.panY ? lerp(c.panY[0], c.panY[1], easedP) : 0) + weaveY

  return {
    transform: `translate3d(${panX.toFixed(2)}px, ${panY.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`,
    panX,
    panY,
  }
}

function computeLayerStyle(time, layer, shotStart, shotEnd, reduceMotion, cameraState, rhythm) {
  const lStart = layer.start ?? shotStart
  const lEnd = layer.end ?? shotEnd
  if (time < lStart || time > lEnd) return null

  const lDuration = Math.max(0.1, lEnd - lStart)
  const p = clamp((time - lStart) / lDuration)

  const enterConfig = typeof layer.enter === 'string' ? { type: layer.enter } : layer.enter || {}
  const exitConfig = typeof layer.exit === 'string' ? { type: layer.exit } : layer.exit || {}
  const livingConfig =
    typeof layer.living === 'string'
      ? { type: layer.living, id: layer.id }
      : layer.living
      ? { id: layer.id, ...layer.living }
      : { type: 'breathe', intensity: 0.45, id: layer.id } // Gentle default life for cutouts

  const rawEnterDur = enterConfig.duration ?? layer.fadeIn ?? 0.65
  const rawExitDur = exitConfig.duration ?? layer.fadeOut ?? 0.55
  // Replace jarring 0.05s sticker pops with silky ink/mist transitions unless hardCut is explicitly requested
  const enterDuration = enterConfig.type === 'cut' && !layer.hardCut ? 0.42 : rawEnterDur
  const exitDuration = exitConfig.type === 'cut' && !layer.hardCut ? 0.38 : rawExitDur

  const timeFromStart = time - lStart
  const timeFromEnd = lEnd - time

  const isEntering = enterDuration > 0 && timeFromStart < enterDuration
  const isExiting = exitDuration > 0 && timeFromEnd < exitDuration

  const enterP = enterDuration > 0 ? easings.easeOutCubic(clamp(timeFromStart / enterDuration)) : 1
  const exitP = exitDuration > 0 ? easings.easeInOutSine(clamp(timeFromEnd / exitDuration)) : 1

  let opacity = 1
  if (isEntering) opacity = Math.min(opacity, enterP)
  if (isExiting) opacity = Math.min(opacity, exitP)
  if (layer.opacity != null) opacity *= layer.opacity

  const filters = []
  const transforms = []
  let maskImage = undefined

  // 2.5D Depth Parallax + Rack-Focus Depth of Field
  const zIndex = layer.zIndex ?? 2
  const isForeground = zIndex >= 5 || layer.role === 'foreground'
  const isDistantMemory = layer.role === 'memory' || (layer.depthBlur == null && zIndex <= 2 && layer.isMemory)
  const depthFactor = layer.parallax ?? (isForeground ? 1.32 : clamp((zIndex - 1) * 0.28, 0.12, 0.95))
  if (!reduceMotion && depthFactor > 0) {
    const px = cameraState.panX * depthFactor * 0.65
    const py = cameraState.panY * depthFactor * 0.52
    if (Math.abs(px) > 0.05 || Math.abs(py) > 0.05) {
      transforms.push(`translate3d(${px.toFixed(2)}px, ${py.toFixed(2)}px, 0)`)
    }
  }

  const opticalBlur = layer.depthBlur ?? (isForeground ? 2.2 : isDistantMemory ? 1.6 : 0)
  if (opticalBlur > 0) {
    filters.push(`blur(${opticalBlur.toFixed(2)}px)`)
  }
  if (layer.brightness != null) {
    filters.push(`brightness(${layer.brightness})`)
  }
  if (layer.contrast != null) {
    filters.push(`contrast(${layer.contrast})`)
  }
  if (layer.saturate != null) {
    filters.push(`saturate(${layer.saturate})`)
  }
  if (layer.filter) {
    filters.push(layer.filter)
  }
  if (isDistantMemory && layer.opacity == null) {
    opacity *= 0.78
  }

  // Organic Enter Effects
  const rawEnterType = enterConfig.type || (layer.fadeIn != null ? 'ink-bleed' : 'none')
  const enterType = rawEnterType === 'cut' && !layer.hardCut ? 'smoke-dissolve' : rawEnterType
  if (isEntering && !reduceMotion) {
    if (enterType === 'ink-bleed' || enterType === 'watercolor') {
      const spread = (enterP * 118).toFixed(1)
      maskImage = `radial-gradient(circle at 50% 50%, black ${spread}%, transparent ${(enterP * 118 + 26).toFixed(1)}%)`
      filters.push(`blur(${((1 - enterP) * 1.8).toFixed(2)}px)`)
    } else if (enterType === 'smoke-dissolve' || enterType === 'mist') {
      filters.push(`blur(${((1 - enterP) * 5.2).toFixed(2)}px)`)
      transforms.push(`translate3d(0px, ${((1 - enterP) * 10).toFixed(2)}px, 0)`)
    } else if (enterType === 'float-up') {
      transforms.push(`translate3d(0px, ${((1 - enterP) * 20).toFixed(2)}px, 0)`)
    }
  }

  // Organic Exit Effects
  const rawExitType = exitConfig.type || (layer.fadeOut != null ? 'fade' : 'none')
  const exitType = rawExitType === 'cut' && !layer.hardCut ? 'smoke-evaporate' : rawExitType
  if (isExiting && !reduceMotion) {
    if (exitType === 'smoke-evaporate' || exitType === 'mist-fade') {
      filters.push(`blur(${((1 - exitP) * 6.0).toFixed(2)}px)`)
      transforms.push(`translate3d(0px, ${(-(1 - exitP) * 12).toFixed(2)}px, 0)`)
    } else if (exitType === 'ink-dissolve') {
      filters.push(`blur(${((1 - exitP) * 2.2).toFixed(2)}px)`)
    }
  }

  // Continuous Choreography + Simplex Living Motion
  if (!reduceMotion) {
    if (Array.isArray(layer.keyframes) && layer.keyframes.length > 0) {
      const kf = computeKeyframesMotion(layer.keyframes, p)
      if (kf) {
        if (kf.x !== 0 || kf.y !== 0) transforms.push(`translate3d(${kf.x.toFixed(2)}px, ${kf.y.toFixed(2)}px, 0)`)
        if (kf.scale !== 1.0) transforms.push(`scale(${kf.scale.toFixed(4)})`)
        if (kf.rotation !== 0) transforms.push(`rotate(${kf.rotation.toFixed(2)}deg)`)
        if (kf.opacity != null) opacity *= kf.opacity
      }
    } else if (layer.motion) {
      const lm = computeLinearMotion(layer.motion, p)
      if (lm.x !== 0 || lm.y !== 0) transforms.push(`translate3d(${lm.x.toFixed(2)}px, ${lm.y.toFixed(2)}px, 0)`)
      if (lm.scale !== 1.0) transforms.push(`scale(${lm.scale.toFixed(4)})`)
      if (lm.rotation !== 0) transforms.push(`rotate(${lm.rotation.toFixed(2)}deg)`)
      if (lm.opacity != null) opacity *= lm.opacity
    }

    const living = evaluateLivingMotion(time - lStart, livingConfig, rhythm)
    if (living.transforms.length > 0) transforms.push(...living.transforms)
    if (living.filters.length > 0) filters.push(...living.filters)
  }

  const pos = layer.position || {}
  const style = {
    position: 'absolute',
    opacity: clamp(opacity),
    zIndex,
    // Blend ink linework naturally into parchment unless explicitly overridden
    mixBlendMode: layer.blend || (layer.preserveColors ? 'normal' : 'multiply'),
    transform: transforms.length > 0 ? transforms.join(' ') : undefined,
    transformOrigin: layer.motion?.origin || '50% 65%',
    filter: filters.length > 0 ? filters.join(' ') : undefined,
    maskImage,
    WebkitMaskImage: maskImage,
    pointerEvents: 'none',
  }

  if (pos.left !== undefined) style.left = pos.left
  if (pos.right !== undefined) style.right = pos.right
  if (pos.top !== undefined) style.top = pos.top
  if (pos.bottom !== undefined) style.bottom = pos.bottom
  if (pos.width !== undefined) style.width = pos.width
  if (pos.height !== undefined) style.height = pos.height

  return style
}

export default function ShotRenderer({ activeShots = [], time = 0, reduceMotion = false, rhythm = null }) {
  return (
    <div className="plates-container">
      {activeShots.map(({ shot, opacity }) => {
        const cameraState = computeCameraState(time, shot, reduceMotion, rhythm)
        const transitionStyle = getTransitionStyle(shot, time)
        const effectsStyle = resolveEffectsStyle(shot.effects)
        const vignetteStyle = buildVignetteStyle(shot.effects?.vignette)

        const sStart = shot.sceneStart ?? shot.start
        const sEnd = shot.sceneEnd ?? shot.end
        const bgStart = shot.bgStart ?? shot.start
        const bgEnd = shot.bgEnd ?? shot.end

        const rawBgSrc = shot.src || (shot.file ? `/assets/paper/${shot.file}` : null)
        const hasExplicitNoBg = shot.file === 'none' || shot.src === 'none' || rawBgSrc === '/assets/paper/'
        const resolvedBgSrc = rawBgSrc && !hasExplicitNoBg ? resolveAssetUrl(rawBgSrc) : null
        const hasCustomPlate = Boolean(resolvedBgSrc)

        // Does this shot's custom plate end before the scene/layers end?
        const plateEndsEarly = hasCustomPlate && bgEnd < sEnd - 0.05
        const isCutTransition = shot.transition?.type === 'cut' || shot.transitionOut?.type === 'cut' || shot.fade === 0
        const plateFadeDuration = isCutTransition ? 0 : Math.min(0.35, shot.fade ?? shot.fadeOut ?? 0.35)

        // 1. Custom Scene Plate: ONLY active from bgStart up to bgEnd!
        let customPlateOpacity = 0
        let shouldRenderCustomPlate = false

        if (hasCustomPlate && time >= bgStart - 0.05 && time <= bgEnd + (plateEndsEarly ? 0.05 : 0.65)) {
          customPlateOpacity = shot.bgOpacity ?? 0.52
          const plateFadeIn = isCutTransition ? 0 : (shot.fade ?? shot.fadeIn ?? 0.6)
          if (plateFadeIn > 0 && time - bgStart < plateFadeIn) {
            customPlateOpacity *= easings.smootherstep(clamp((time - bgStart) / plateFadeIn))
          }
          if (plateFadeDuration > 0 && plateEndsEarly && time > bgEnd - plateFadeDuration) {
            const exitP = clamp((bgEnd - time) / plateFadeDuration)
            customPlateOpacity *= easings.easeInOutSine(exitP)
          }
          shouldRenderCustomPlate = customPlateOpacity > 0.005
        }

        // 2. Default Paper Background: ONLY rendered when there is NO custom plate, or ONLY in the gap after custom plate ends!
        let defaultPlateOpacity = 0
        let shouldRenderDefaultPlate = false

        if (!hasExplicitNoBg) {
          if (!hasCustomPlate) {
            // Case A: Shot has no background plate image at all
            defaultPlateOpacity = 0.85
            shouldRenderDefaultPlate = true
          } else if (plateEndsEarly && time >= bgEnd - plateFadeDuration) {
            // Case B: Custom plate ended early -> default plate shows ONLY during the remaining gap (e.g. 32.0s to 35.30s)!
            if (plateFadeDuration > 0 && time < bgEnd) {
              const enterP = clamp((time - (bgEnd - plateFadeDuration)) / plateFadeDuration)
              defaultPlateOpacity = 0.85 * easings.easeInOutSine(enterP)
            } else {
              defaultPlateOpacity = 0.85
            }
            shouldRenderDefaultPlate = defaultPlateOpacity > 0.005
          }
        }

        const combinedTransform = [cameraState.transform, transitionStyle.transform].filter(Boolean).join(' ')
        const combinedFilter = [transitionStyle.filter, effectsStyle.filter].filter(Boolean).join(' ')

        return (
          <div
            key={shot.id}
            className="plate-layer"
            style={{
              opacity,
              ...effectsStyle,
              ...transitionStyle,
              transform: combinedTransform || undefined,
              transformOrigin: '50% 50%',
              filter: combinedFilter || undefined,
            }}
          >
            {/* Custom Scene Plate (100% clean & crisp, zero default image behind it while active) */}
            {shouldRenderCustomPlate && (
              <>
                <img
                  className="plate-img"
                  src={resolvedBgSrc}
                  alt={shot.file || shot.id}
                  style={{
                    opacity: customPlateOpacity,
                    filter: shot.bgBlur ? `blur(${shot.bgBlur}px) sepia(0.12) contrast(1.04)` : undefined,
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
                <div className="plate-ground-mist" />
              </>
            )}

            {/* Default Background Image (ONLY rendered when no custom plate exists or during early exit gap) */}
            {shouldRenderDefaultPlate && (
              <>
                <img
                  className="plate-img"
                  src={resolveAssetUrl('/assets/paper/paper_01_blank.png')}
                  alt="Default Paper Canvas"
                  style={{
                    opacity: defaultPlateOpacity,
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
                <div className="plate-ground-mist" />
              </>
            )}

            {vignetteStyle && <div className="shot-vignette-overlay" style={vignetteStyle} />}

            {Array.isArray(shot.layers) &&
              shot.layers.map((layer, lIdx) => {
                const layerStyle = computeLayerStyle(
                  time,
                  layer,
                  sStart,
                  sEnd,
                  reduceMotion,
                  cameraState,
                  rhythm
                )
                if (!layerStyle) return null
                return (
                  <div
                    key={layer.id || `layer-${shot.id}-${lIdx}`}
                    className={`scene-cast-element ${layer.className || ''}`}
                    style={layerStyle}
                  >
                    <ElementImage layer={layer} />
                  </div>
                )
              })}
          </div>
        )
      })}
    </div>
  )
}
