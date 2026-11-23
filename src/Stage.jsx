import { useCallback, useEffect, useRef, useState } from 'react'
import { songScript } from './timeline.js'
import { useClock, usePrefersReducedMotion } from './useClock.js'
import { resolveTimelineState } from './engine/systems/timelineResolver.js'
import { useAudioEnvelope } from './engine/systems/rhythmicSync.js'
import { resolveAssetUrl } from './engine/systems/assetUrl.js'
import ShotRenderer from './engine/renderers/ShotRenderer.jsx'
import TrackRenderer from './engine/renderers/TrackRenderer.jsx'
import ParticleCanvas from './engine/renderers/ParticleCanvas.jsx'
import LyricRenderer from './engine/renderers/LyricRenderer.jsx'
import CreditRenderer from './engine/renderers/CreditRenderer.jsx'
import SectionMarkers from './engine/renderers/SectionMarkers.jsx'
import './Stage.css'

function formatClock(seconds, includeMs = false) {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  if (includeMs) {
    const ms = Math.floor((seconds % 1) * 1000)
    return `${m}:${s.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`
  }
  return `${m}:${s.toString().padStart(2, '0')}`
}

function bandEnvelope(t, start, end, fade = 2.2) {
  if (t <= start - fade || t >= end + fade) return 0
  if (t < start + fade) return Math.max(0, Math.min(1, (t - (start - fade)) / (fade * 2)))
  if (t > end - fade) return Math.max(0, Math.min(1, (end + fade - t) / (fade * 2)))
  return 1
}

function evaluateAtmosphericLighting(time) {
  // Calm, stable ambient lighting envelope across the 5 acts (zero strobing / flicker)
  return {
    dawn: bandEnvelope(time, 0, 56.0, 2.5) * 0.85,
    monsoon: bandEnvelope(time, 56.0, 120.0, 2.8) * 0.88,
    dusk: bandEnvelope(time, 120.0, 183.4, 2.8) * 0.85,
    chitaFire: bandEnvelope(time, 183.4, 234.8, 2.4) * 0.88,
    chitaChar: bandEnvelope(time, 183.4, 234.8, 2.6) * 0.92,
    twilight: bandEnvelope(time, 234.8, 289.0, 2.8) * 0.85,
  }
}

export default function Stage() {
  const audioRef = useRef(null)
  const frameRef = useRef(null)
  const totalDuration = songScript.meta?.duration || 289.0
  const { time, playing, play, pause, seek, replay } = useClock(totalDuration, audioRef)
  const reduceMotion = usePrefersReducedMotion()
  const [controlsVisible, setControlsVisible] = useState(true)
  const [hasStarted, setHasStarted] = useState(false)
  const hideTimerRef = useRef(null)

  const isExportMode =
    typeof window !== 'undefined' &&
    (new URLSearchParams(window.location.search).get('export') === '1' || window.__EXPORT_MODE__ === true)

  // Live audio low/mid energy (automatically disabled in headless export so exports stay 100% deterministic)
  const liveAudioEnergy = useAudioEnvelope(audioRef, playing, isExportMode || reduceMotion)

  // Preload background plates AND cast cutout layers ahead of time to prevent pop-in
  useEffect(() => {
    if (Array.isArray(songScript.shots)) {
      songScript.shots.forEach((shot) => {
        if (shot.src && shot.src !== 'none' && !shot.src.endsWith('/')) {
          const img = new Image()
          img.src = resolveAssetUrl(shot.src)
        }
        if (Array.isArray(shot.layers)) {
          shot.layers.forEach((layer) => {
            if (layer.src) {
              const lImg = new Image()
              lImg.src = resolveAssetUrl(layer.src)
            }
          })
        }
      })
    }
  }, [])

  const resetControlsTimeout = useCallback(() => {
    setControlsVisible(true)
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    if (playing) {
      hideTimerRef.current = setTimeout(() => {
        setControlsVisible(false)
      }, 2200)
    }
  }, [playing])

  useEffect(() => {
    if (!playing) {
      setControlsVisible(true)
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    } else {
      resetControlsTimeout()
    }
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    }
  }, [playing, resetControlsTimeout])

  const handlePlayToggle = useCallback(() => {
    setHasStarted(true)
    if (playing) {
      pause()
    } else {
      play()
    }
  }, [playing, pause, play])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.code === 'Space') {
        const tag = e.target.tagName.toLowerCase()
        if (tag === 'button' || tag === 'input' || tag === 'textarea') return
        e.preventDefault()
        handlePlayToggle()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handlePlayToggle])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      if (frameRef.current?.requestFullscreen) {
        frameRef.current.requestFullscreen().catch(() => {})
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen().catch(() => {})
    }
  }, [])

  const {
    activeShots,
    activeLyric,
    previousLyric,
    activeCredits,
    activeTracks,
    currentSection,
    rhythm,
  } = resolveTimelineState(time, songScript, liveAudioEnergy)

  return (
    <div className={`stage-viewport ${isExportMode ? 'export-mode' : ''}`} onPointerMove={resetControlsTimeout}>
      {/* Zero-asset inline SVG filter definition for organic Khadi handmade paper fiber */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <filter id="khadi-paper-grain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="3" seed="14" result="noise" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.24  0 0 0 0 0.17  0 0 0 0 0.11  0 0 0 0.055 0"
              in="noise"
            />
          </filter>
        </defs>
      </svg>

      <div
        ref={frameRef}
        className="stage-frame"
        onClick={(e) => {
          if (e.target.closest('.controls-bar')) return
          handlePlayToggle()
        }}
      >
        <audio
          ref={audioRef}
          src={resolveAssetUrl(songScript.meta?.audio || '/song/aaye%20na%20sawariya.mp3')}
          preload="auto"
          playsInline
        />

        {/* Layer 1: Plates, S-Curve Camera, 2.5D Parallax & Feathered Cutouts */}
        <ShotRenderer activeShots={activeShots} time={time} reduceMotion={reduceMotion} rhythm={rhythm} />

        {/* Layer 2: Independent Overlays and Floating Poetic Annotations */}
        <TrackRenderer tracks={activeTracks} time={time} reduceMotion={reduceMotion} rhythm={rhythm} />

        {/* Layer 3: Deterministic HiDPI Atmospheric Canvas (Ink Rain, Petals, Glowing Embers, Dust) */}
        <ParticleCanvas tracks={activeTracks} time={time} reduceMotion={reduceMotion} rhythm={rhythm} />

        {/* Layer 3.5: 5-Act Emotional Atmospheric Lighting */}
        {(() => {
          const light = evaluateAtmosphericLighting(time)
          return (
            <div className="atmospheric-lighting-layer" aria-hidden="true">
              {light.dawn > 0.01 && <div className="lighting-wash mood-dawn-sunbeams" style={{ opacity: light.dawn }} />}
              {light.monsoon > 0.01 && (
                <div className="lighting-wash mood-monsoon-mist" style={{ opacity: light.monsoon }} />
              )}
              {light.dusk > 0.01 && <div className="lighting-wash mood-sindoor-dusk" style={{ opacity: light.dusk }} />}
              {light.chitaChar > 0.01 && (
                <div className="lighting-wash mood-chita-char" style={{ opacity: light.chitaChar }} />
              )}
              {light.chitaFire > 0.01 && (
                <div className="lighting-wash mood-chita-fireglow" style={{ opacity: Math.min(1, light.chitaFire) }} />
              )}
              {light.twilight > 0.01 && (
                <div className="lighting-wash mood-twilight-horizon" style={{ opacity: light.twilight }} />
              )}
            </div>
          )
        })()}

        {/* Layer 4: Wet-Ink Devanagari Calligraphy & Editorial Credits */}
        <div className="type-layer">
          <CreditRenderer activeCredits={activeCredits} time={time} reduceMotion={reduceMotion} rhythm={rhythm} />
          <LyricRenderer
            activeLine={activeLyric}
            previousLyric={previousLyric}
            time={time}
            reduceMotion={reduceMotion}
            rhythm={rhythm}
          />
        </div>

        {/* Layer 5: Unified Handmade Khadi Paper Grain & Warm Deckle Vignette */}
        <div className="parchment-unifier-layer" aria-hidden="true">
          <div className="parchment-fiber-weave" />
          <div className="parchment-grain-sheet" />
          <div className="parchment-edge-vignette" />
        </div>

        {/* Minimalist Manuscript Play Veil */}
        {!isExportMode && !hasStarted && !playing && (
          <div className="play-prompt-backdrop" onClick={handlePlayToggle}>
            <button className="play-prompt-button" type="button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="6 4 20 12 6 20 6 4" />
              </svg>
              <span>आरंभ करें</span>
            </button>
            <div className="play-prompt-sub">क्लिक करें या स्पेस दबाएँ</div>
          </div>
        )}

        {/* Section Chapter Indicator (visible only alongside controls so canvas stays pure during playback) */}
        {!isExportMode && currentSection && controlsVisible && (
          <div className="current-section-badge" style={{ '--badge-color': currentSection.color || '#7d1e1d' }}>
            {currentSection.label}
          </div>
        )}

        {/* Editorial Scrubber & Controls */}
        {!isExportMode && (
          <div className={`controls-bar ${controlsVisible ? '' : 'hidden'}`}>
            <div className="progress-track-wrapper">
              <SectionMarkers
                sections={songScript.sections}
                totalDuration={totalDuration}
                currentTime={time}
                onSeek={seek}
              />

              <input
                type="range"
                className="progress-slider"
                min={0}
                max={totalDuration}
                step={0.05}
                value={time}
                onChange={(e) => {
                  seek(parseFloat(e.target.value))
                }}
              />
            </div>

            <div className="controls-row">
              <div className="controls-left">
                <button
                  className="control-btn"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePlayToggle()
                  }}
                >
                  {playing ? (
                    <>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                      </svg>
                      <span>रोकें</span>
                    </>
                  ) : (
                    <>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      <span>चलाएँ</span>
                    </>
                  )}
                </button>

                <button
                  className="control-btn"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    replay()
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 4v6h6" />
                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                  </svg>
                  <span>फिर से</span>
                </button>

                <div className="time-display">
                  <span className="time-current">{formatClock(time, true)}</span>
                  <span className="time-raw">({time.toFixed(3)}s)</span>
                  <span className="time-sep">/</span>
                  <span className="time-total">{formatClock(totalDuration, false)}</span>
                </div>
              </div>

              <div className="controls-right">
                <button
                  className="control-btn"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFullscreen()
                  }}
                  title="पूर्ण स्क्रीन"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
