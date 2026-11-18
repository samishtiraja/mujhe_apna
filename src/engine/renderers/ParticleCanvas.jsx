import { useEffect, useRef } from 'react'
import { createNoise2D } from 'simplex-noise'
import { clamp, easings } from '../motion/interpolate.js'

const particleNoise2D = createNoise2D(() => 0.731)

function hashFloat(seed) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}

function inferPreset(track) {
  const cfg = track.particle || {}
  if (cfg.preset || cfg.style) return cfg.preset || cfg.style
  const id = (track.id || '').toLowerCase()
  if (id.includes('rain') || id.includes('barish') || id.includes('sawan')) return 'ink-rain'
  if (id.includes('petal') || id.includes('flower') || id.includes('tulsi') || id.includes('kadamba')) return 'petals'
  if (id.includes('ember') || id.includes('chita') || id.includes('fire') || id.includes('flame') || id.includes('spark')) return 'embers'
  return 'parchment-dust'
}

/**
 * Deterministic, ResizeObserver-backed HiDPI Canvas Atmospheric Engine.
 * Supports:
 *   - 'ink-rain': hand-drawn ink rain streaks + splash ripples (Monsoon yearning)
 *   - 'petals': drifting botanical Kadamba petals (Vrindavan devotional memories)
 *   - 'embers': glowing rising sandalwood sparks (Viraha chita / burning pyre)
 *   - 'parchment-dust': subtle floating antique fibers & sepia dust (continuous)
 * Scrub-safe and 100% deterministic for headless Puppeteer 4K export.
 */
export default function ParticleCanvas({ tracks = [], time = 0, reduceMotion = false, rhythm = null }) {
  const canvasRef = useRef(null)
  const sizeRef = useRef({ width: 1920, height: 1080, dpr: 1 })
  const particleTracks = tracks.filter((t) => t.type === 'particle')

  // Resize backing store ONLY when container dimensions change (eliminating 60fps canvas reallocation)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const updateSize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.max(1, Math.round(rect.width || 1920))
      const h = Math.max(1, Math.round(rect.height || 1080))
      if (sizeRef.current.width !== w || sizeRef.current.height !== h || sizeRef.current.dpr !== dpr) {
        sizeRef.current = { width: w, height: h, dpr }
        canvas.width = w * dpr
        canvas.height = h * dpr
      }
    }

    updateSize()
    const ro = new ResizeObserver(updateSize)
    ro.observe(canvas)
    return () => ro.disconnect()
  }, [particleTracks.length > 0])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || particleTracks.length === 0 || reduceMotion) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { width, height, dpr } = sizeRef.current
    ctx.save()
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, width, height)

    const beatLift = rhythm?.beatPulse ?? 0

    particleTracks.forEach((track, tIdx) => {
      const cfg = track.particle || {}
      const preset = inferPreset(track)
      const count = cfg.count ?? (preset === 'ink-rain' ? 36 : preset === 'embers' ? 28 : 22)

      // Smooth track fade envelope
      const fadeIn = track.fadeIn ?? 0.8
      const fadeOut = track.fadeOut ?? 0.8
      let trackAlpha = 1
      if (fadeIn > 0 && time - track.start < fadeIn) {
        trackAlpha *= easings.easeOutSine(clamp((time - track.start) / fadeIn))
      }
      if (fadeOut > 0 && track.end - time < fadeOut) {
        trackAlpha *= easings.easeInOutSine(clamp((track.end - time) / fadeOut))
      }

      ctx.save()

      if (preset === 'ink-rain') {
        // Slanted, tapered sepia/charcoal hand-drawn rain strokes + subtle floor ripples
        ctx.globalCompositeOperation = 'multiply'
        const slantX = -0.18
        const strokeColor = cfg.color || 'rgba(58, 43, 31, 0.28)'
        ctx.strokeStyle = strokeColor
        ctx.lineCap = 'round'

        for (let i = 0; i < count; i++) {
          const seed = (tIdx + 1) * 1000 + i * 17.3
          const speed = 0.62 + hashFloat(seed + 1) * 0.48
          const cycle = (time * speed + hashFloat(seed + 2) * 10) % 1
          const xBase = hashFloat(seed + 3) * (width * 1.15)
          const y = cycle * (height * 1.12) - height * 0.08
          const x = xBase + y * slantX
          const len = (24 + hashFloat(seed + 4) * 34) * (height / 1080)

          const env = cycle < 0.1 ? cycle / 0.1 : cycle > 0.88 ? (1 - cycle) / 0.12 : 1
          ctx.globalAlpha = clamp(env * trackAlpha * (0.35 + hashFloat(seed + 5) * 0.45))
          ctx.lineWidth = (0.75 + hashFloat(seed + 6) * 0.85) * (width / 1920 + 0.35)

          ctx.beginPath()
          ctx.moveTo(x, y)
          ctx.lineTo(x + len * slantX, y + len)
          ctx.stroke()

          // Delicate ink splash ring near bottom horizon on select drops
          if (i % 4 === 0 && cycle > 0.82) {
            const rippleP = (cycle - 0.82) / 0.18
            const rx = (3 + rippleP * 16) * (width / 1920 + 0.4)
            const ry = rx * 0.28
            ctx.globalAlpha = (1 - rippleP) * 0.22 * trackAlpha
            ctx.beginPath()
            ctx.ellipse(x, height * (0.82 + hashFloat(seed + 9) * 0.12), rx, ry, 0, 0, Math.PI * 2)
            ctx.stroke()
          }
        }
      } else if (preset === 'petals') {
        // Gently tumbling hand-inked botanical Kadamba flower silhouettes
        const fill = cfg.color || 'rgba(132, 46, 42, 0.28)'
        ctx.fillStyle = fill

        for (let i = 0; i < count; i++) {
          const seed = (tIdx + 1) * 2000 + i * 23.7
          const fallSpeed = 0.055 + hashFloat(seed + 1) * 0.045
          const cycle = (time * fallSpeed + hashFloat(seed + 2) * 10) % 1
          const sway = particleNoise2D(time * 0.25 + i, seed * 0.01) * (width * 0.045)
          const x = ((hashFloat(seed + 3) * width + time * 14 + sway) % (width + 60)) - 30
          const y = cycle * (height + 60) - 30
          const size = (4.5 + hashFloat(seed + 4) * 5.5) * (width / 1920 + 0.45)
          const angle = time * (0.8 + hashFloat(seed + 5)) + seed

          const env = Math.sin(cycle * Math.PI)
          ctx.save()
          ctx.translate(x, y)
          ctx.rotate(angle)
          ctx.scale(1, 0.52 + 0.35 * Math.sin(time * 2.1 + i))
          ctx.globalAlpha = clamp(env * trackAlpha * 0.55)
          ctx.beginPath()
          ctx.moveTo(-size, 0)
          ctx.quadraticCurveTo(0, -size * 0.85, size, 0)
          ctx.quadraticCurveTo(0, size * 0.85, -size, 0)
          ctx.fill()
          ctx.restore()
        }
      } else if (preset === 'embers') {
        // Luminous rising sandalwood pyre sparks with warm radial fire-halo (Viraha chita)
        ctx.globalCompositeOperation = 'lighter'

        for (let i = 0; i < count; i++) {
          const seed = (tIdx + 1) * 2500 + i * 19.3
          const riseSpeed = 0.075 + hashFloat(seed + 1) * 0.095
          const cycle = (time * riseSpeed + hashFloat(seed + 2) * 10) % 1
          const sway = particleNoise2D(time * 0.45 + i, seed * 0.02) * 44
          const x = ((hashFloat(seed + 3) * width + sway + width) % width)
          const y = (1 - cycle) * (height * 1.05)
          const coreSize = 1.6 + hashFloat(seed + 5) * 3.0
          const haloSize = coreSize * 4.2
          const flicker = 0.55 + 0.45 * Math.sin(time * 9.5 + seed)

          const env = Math.sin(cycle * Math.PI)
          const alpha = clamp(env * trackAlpha * (0.45 + flicker * 0.5))

          const grad = ctx.createRadialGradient(x, y, 0, x, y, haloSize)
          grad.addColorStop(0, `rgba(255, 232, 150, ${alpha})`)
          grad.addColorStop(0.32, `rgba(255, 118, 36, ${(alpha * 0.78).toFixed(3)})`)
          grad.addColorStop(1, 'rgba(185, 38, 12, 0)')

          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(x, y, haloSize, 0, Math.PI * 2)
          ctx.fill()
        }
      } else if (preset === 'golden-motes') {
        // Warm divine Govardhan sun-motes / diya prana light
        ctx.globalCompositeOperation = 'screen'
        for (let i = 0; i < count; i++) {
          const seed = (tIdx + 1) * 2800 + i * 29.1
          const lifeDur = 7.0 + hashFloat(seed + 1) * 5.0
          const cycle = ((time + hashFloat(seed + 2) * lifeDur) % lifeDur) / lifeDur
          const x = hashFloat(seed + 3) * width + particleNoise2D(time * 0.12 + i, seed * 0.01) * 52
          const y = hashFloat(seed + 4) * height - cycle * 48
          const r = 2.2 + hashFloat(seed + 5) * 5.2
          const env = Math.sin(cycle * Math.PI)
          const alpha = clamp(env * trackAlpha * 0.48)

          const grad = ctx.createRadialGradient(x, y, 0, x, y, r * 3.2)
          grad.addColorStop(0, `rgba(255, 238, 182, ${alpha})`)
          grad.addColorStop(0.45, `rgba(238, 178, 78, ${(alpha * 0.45).toFixed(3)})`)
          grad.addColorStop(1, 'rgba(220, 150, 50, 0)')

          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(x, y, r * 3.2, 0, Math.PI * 2)
          ctx.fill()
        }
      } else {
        // Warm parchment dust / prana motes drifting in Simplex air currents
        ctx.globalCompositeOperation = 'multiply'
        const minSize = cfg.sizeRange ? cfg.sizeRange[0] : 1.3
        const maxSize = cfg.sizeRange ? cfg.sizeRange[1] : 3.4
        const fill = cfg.color || 'rgba(92, 64, 42, 0.22)'
        ctx.fillStyle = fill

        for (let i = 0; i < count; i++) {
          const seed = (tIdx + 1) * 3000 + i * 31.1
          const lifeDur = 6.5 + hashFloat(seed + 1) * 5.5
          const cycle = ((time + hashFloat(seed + 2) * lifeDur) % lifeDur) / lifeDur

          const baseX = hashFloat(seed + 3) * width
          const baseY = hashFloat(seed + 4) * height
          const driftX = particleNoise2D(time * 0.14 + i * 0.7, seed * 0.01) * 42
          const driftY = -cycle * 55 + particleNoise2D(seed * 0.01, time * 0.16 + i * 0.7) * 24

          const size = minSize + hashFloat(seed + 5) * (maxSize - minSize)
          const env = Math.sin(cycle * Math.PI)
          ctx.globalAlpha = clamp(env * trackAlpha * (0.25 + hashFloat(seed + 6) * 0.38))

          ctx.beginPath()
          ctx.arc(baseX + driftX, baseY + driftY, size, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      ctx.restore()
    })

    ctx.restore()
  }, [time, particleTracks, reduceMotion, rhythm])

  return <canvas ref={canvasRef} className="particle-canvas-layer" />
}
