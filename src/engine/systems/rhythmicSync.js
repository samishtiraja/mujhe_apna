import { useEffect, useRef, useState } from 'react'
import { clamp } from '../motion/interpolate.js'
import { beatsData } from '../../timeline/beats.js'

// Binary search helper to find the index of the largest beat <= time
function findNearestBeatIndex(beats, time) {
  let low = 0
  let high = beats.length - 1
  let best = 0
  while (low <= high) {
    const mid = (low + high) >> 1
    if (beats[mid] <= time) {
      best = mid
      low = mid + 1
    } else {
      high = mid - 1
    }
  }
  return best
}

/**
 * Computes deterministic rhythmic & vocal-stress impulses from the SongScript timeline
 * and the real analyzed audio beats from /song/beats.json (95.7 BPM Keherwa taal).
 * Works identically during live browser playback, scrubbing, and headless video export.
 */
export function evaluateRhythmicState(time = 0, songScript = {}, liveAudioEnergy = 0) {
  const realBeats = beatsData.beats || []
  const strongOnsets = beatsData.strong_onsets || []
  const bpm = songScript.meta?.bpm || beatsData.tempo_bpm || 95.7
  const taalCycleBeats = songScript.meta?.taalBeats || 8 // Keherwa taal 8-beat cycle

  let beatIndex = 0
  let beatPhase = 0
  let rawBeatPulse = 0
  let isSam = false

  if (realBeats.length > 0) {
    const idx = findNearestBeatIndex(realBeats, time)
    beatIndex = idx
    isSam = beatIndex % taalCycleBeats === 0

    const currentBeatTime = realBeats[idx]
    const nextBeatTime = realBeats[idx + 1] || currentBeatTime + 0.627
    const beatInterval = Math.max(0.2, nextBeatTime - currentBeatTime)

    const dt = time - currentBeatTime
    beatPhase = clamp(dt / beatInterval)

    // Authentic dholak decay: sharp attack on the beat, exponential falloff
    const samMultiplier = isSam ? 1.25 : 0.78
    rawBeatPulse = Math.exp(-6.5 * Math.max(0, dt)) * samMultiplier
  } else {
    // Mathematical fallback if beats data is empty
    const beatDuration = 60 / bpm
    const beatFloat = Math.max(0, time / beatDuration)
    beatIndex = Math.floor(beatFloat)
    beatPhase = beatFloat - beatIndex
    isSam = beatIndex % taalCycleBeats === 0
    rawBeatPulse = Math.exp(-4.8 * beatPhase) * (isSam ? 1.0 : 0.58)
  }

  // Strong percussion / dholak attack accents
  let strongOnsetPulse = 0
  if (strongOnsets.length > 0) {
    const oIdx = findNearestBeatIndex(strongOnsets, time)
    const oTime = strongOnsets[oIdx]
    const oDiff = time - oTime
    if (oDiff >= 0 && oDiff < 0.22) {
      strongOnsetPulse = Math.exp(-8.0 * oDiff)
    }
  }

  // Vocal stress & syllable onset impulse derived from active lyric word timings
  let vocalOnsetPulse = 0
  let vocalSustained = 0

  const lyrics = songScript.lyrics || songScript.lyricLines || []
  for (let i = 0; i < lyrics.length; i++) {
    const line = lyrics[i]
    if (time < line.start - 0.1 || time > line.end + 0.2) continue
    const words = line.words || []
    for (let w = 0; w < words.length; w++) {
      const wStart = words[w].time
      const wEnd = words[w + 1] ? words[w + 1].time : line.end
      if (time >= wStart && time <= wEnd) {
        const dt = time - wStart
        const dur = Math.max(0.18, wEnd - wStart)
        const stressWeight = words[w].accent || (dur > 0.7 ? 1.0 : 0.75)
        vocalOnsetPulse = Math.max(vocalOnsetPulse, Math.exp(-6.2 * dt) * stressWeight)
        // Swell gently on elongated alaap / sustained notes
        vocalSustained = Math.sin(clamp(dt / dur) * Math.PI) * (dur > 0.65 ? 0.85 : 0.45)
        break
      }
    }
  }

  const combinedVocal = clamp(Math.max(vocalOnsetPulse * 0.75 + vocalSustained * 0.45, liveAudioEnergy * 0.85))
  const combinedBeat = clamp(Math.max(rawBeatPulse, strongOnsetPulse * 0.9, liveAudioEnergy * 0.6))

  return {
    bpm,
    beatDuration: 60 / bpm,
    beatPhase,
    beatIndex,
    isSam,
    beatPulse: combinedBeat,
    vocalEnergy: combinedVocal,
    vocalOnsetPulse,
    strongOnsetPulse,
  }
}

/**
 * Optional non-invasive Web Audio envelope follower for interactive playback.
 * Gracefully degrades to 0 in headless export mode or restricted media contexts.
 */
export function useAudioEnvelope(audioRef, playing, disabled = false) {
  const [energy, setEnergy] = useState(0)
  const ctxRef = useRef(null)
  const analyserRef = useRef(null)
  const dataRef = useRef(null)
  const connectedElRef = useRef(null)

  useEffect(() => {
    if (disabled || !playing || !audioRef?.current) {
      setEnergy(0)
      return
    }

    const audioEl = audioRef.current
    try {
      if (!ctxRef.current) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext
        if (!AudioCtx) return
        ctxRef.current = new AudioCtx()
      }
      if (ctxRef.current.state === 'suspended') {
        ctxRef.current.resume().catch(() => {})
      }
      if (connectedElRef.current !== audioEl) {
        const source = ctxRef.current.createMediaElementSource(audioEl)
        const analyser = ctxRef.current.createAnalyser()
        analyser.fftSize = 256
        analyser.smoothingTimeConstant = 0.82
        source.connect(analyser)
        analyser.connect(ctxRef.current.destination)
        analyserRef.current = analyser
        dataRef.current = new Uint8Array(analyser.frequencyBinCount)
        connectedElRef.current = audioEl
      }
    } catch {
      return
    }

    let rafId = null
    const sample = () => {
      if (analyserRef.current && dataRef.current) {
        analyserRef.current.getByteFrequencyData(dataRef.current)
        // Focus on tabla/dholak warmth + vocal fundamental (bins 2..28)
        let sum = 0
        const count = 26
        for (let i = 2; i < 2 + count; i++) {
          sum += dataRef.current[i]
        }
        const normalized = clamp((sum / (count * 255) - 0.08) * 1.55)
        setEnergy(normalized)
      }
      rafId = requestAnimationFrame(sample)
    }

    rafId = requestAnimationFrame(sample)
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [audioRef, playing, disabled])

  return energy
}
