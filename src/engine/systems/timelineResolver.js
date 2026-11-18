import { easings } from '../motion/interpolate.js'
import { evaluateRhythmicState } from './rhythmicSync.js'

const COUPLET_ECHO_TAIL = 1.4 // Soft wet-ink evaporation tail after a lyric line ends

export function resolveTimelineState(time = 0, songScript = {}, liveAudioEnergy = 0) {
  const rhythm = evaluateRhythmicState(time, songScript, liveAudioEnergy)
  const shots = songScript.shots || []
  const lyrics = songScript.lyrics || songScript.lyricLines || []
  const credits = songScript.credits || []
  const tracks = songScript.tracks || []
  const sections = songScript.sections || []

  // 1. Resolve Active Shots with smooth S-curve crossfades (eliminating harsh linear pops)
  const activeShots = []
  for (let i = 0; i < shots.length; i++) {
    const shot = shots[i]
    const transObj = typeof shot.transition === 'object' ? shot.transition : null
    const fadeIn = shot.fadeIn ?? shot.transitionIn?.duration ?? transObj?.duration ?? (i === 0 ? 0.8 : 0.95)
    const fadeOut = shot.fadeOut ?? shot.transitionOut?.duration ?? transObj?.duration ?? 0.95

    // Total scene boundaries: encompasses both the background plate timing AND all child cutout layers
    const maxLayerEnd = Array.isArray(shot.layers) && shot.layers.length > 0
      ? shot.layers.reduce((max, l) => Math.max(max, Number(l.end) || 0), shot.end)
      : shot.end
    const minLayerStart = Array.isArray(shot.layers) && shot.layers.length > 0
      ? shot.layers.reduce((min, l) => Math.min(min, Number(l.start) || shot.start), shot.start)
      : shot.start

    const sceneStart = Math.min(shot.start, minLayerStart)
    const sceneEnd = Math.max(shot.end, maxLayerEnd)

    // Allow overlapping crossfade tail so adjacent scenes dissolve through parchment seamlessly
    const nextShot = shots[i + 1]
    const nextSceneStart = nextShot
      ? (Array.isArray(nextShot.layers) && nextShot.layers.length > 0
          ? Math.min(nextShot.start, nextShot.layers.reduce((min, l) => Math.min(min, Number(l.start) || nextShot.start), nextShot.start))
          : nextShot.start)
      : null

    const transOutType = shot.transitionOut?.type || transObj?.type
    const nextTransInType = nextShot?.transitionIn?.type || (typeof nextShot?.transition === 'object' ? nextShot.transition?.type : null)
    const hasHardBeatCut = transOutType === 'taal-cut' || transOutType === 'cut' || nextTransInType === 'taal-cut' || nextTransInType === 'cut'
    const overlapTail = !hasHardBeatCut && nextShot && nextSceneStart != null && Math.abs(nextSceneStart - sceneEnd) < 0.08 ? Math.min(0.65, fadeOut) : 0
    const effectiveEnd = sceneEnd + overlapTail

    if (time >= sceneStart && time <= effectiveEnd) {
      let opacity = 1

      if (i > 0 && !hasHardBeatCut && fadeIn > 0 && time - sceneStart < fadeIn) {
        opacity = Math.min(opacity, easings.smootherstep((time - sceneStart) / fadeIn))
      }

      if (overlapTail > 0 && time > sceneEnd) {
        const tailP = 1 - (time - sceneEnd) / overlapTail
        opacity = Math.min(opacity, easings.easeInOutSine(tailP))
      } else if (!nextShot && fadeOut > 0 && sceneEnd - time < fadeOut) {
        opacity = Math.min(opacity, easings.easeInOutSine((sceneEnd - time) / fadeOut))
      }

      if (opacity > 0.004) {
        activeShots.push({
          shot: {
            ...shot,
            sceneStart,
            sceneEnd,
          },
          opacity,
        })
      }
    }
  }

  // 2. Resolve Active Lyric + Ghosted Exiting Couplet Line (ink-evaporation memory)
  let activeLyric = null
  let previousLyric = null

  for (let i = 0; i < lyrics.length; i++) {
    const line = lyrics[i]
    if (time >= line.start && time < line.end) {
      activeLyric = line
      if (i > 0) {
        const prev = lyrics[i - 1]
        const sincePrevEnd = time - prev.end
        if (sincePrevEnd >= 0 && sincePrevEnd < COUPLET_ECHO_TAIL) {
          previousLyric = {
            line: prev,
            tailProgress: sincePrevEnd / COUPLET_ECHO_TAIL,
          }
        }
      }
      break
    }
  }

  // Also preserve soft ink-evaporation tail when entering an instrumental pause
  if (!activeLyric) {
    for (let i = lyrics.length - 1; i >= 0; i--) {
      const prev = lyrics[i]
      const sincePrevEnd = time - prev.end
      if (sincePrevEnd >= 0 && sincePrevEnd < COUPLET_ECHO_TAIL) {
        previousLyric = {
          line: prev,
          tailProgress: sincePrevEnd / COUPLET_ECHO_TAIL,
        }
        break
      }
    }
  }

  // 3. Active Credits
  const activeCredits = credits.filter((c) => time >= c.start && time <= c.end)

  // 4. Active Tracks (overlays, floating text, atmospheric particles)
  const activeTracks = tracks.filter((t) => time >= t.start && time <= t.end)

  // 5. Current Musical Section
  const currentSection = sections.find((s) => time >= s.start && time < s.end) || null

  return {
    activeShots,
    activeLyric,
    previousLyric,
    activeCredits,
    activeTracks,
    currentSection,
    rhythm,
  }
}
