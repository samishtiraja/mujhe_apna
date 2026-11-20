// ===========================================================================
// Video Shots, Background Plates & Camera Settings Configuration
// • Background plates, transitions, effects, and camera Ken Burns zoom
// • Layers are managed separately in ./layers.js and automatically attached
// ===========================================================================

import { shotLayers } from './layers.js'

export { shotLayers } from './layers.js'

export const shotBackgrounds = [

// Video Shots and Cutout Layers Configuration (Cinematic & Emotionally Synced)
  // ==========================================
  // INTRO ARC: 0.0s - 18.81s (Synced to Beats)
  // भाव: स्मृति, प्रतीक्षा और मिलन की भोर (Before Separation)
  // ==========================================
  {
    id: 's01',
    start: 0.0,
    end: 4.15, // Covers transition through Beat 5 (3.76s)
    file: 'plate_04_face.png',
    src: '/assets/paper/plate_04_face.png',
    fade: 0.5,
    bgOpacity: 1.2,
    transition: { type: 'ink-burst', duration: 0.7 },
    effects: {
      vignette: { strength: 0.34, size: 62 },
      colorGrade: { contrast: 1.08, brightness: 1.02, saturate: 1.03 },
    },
    camera: {
      scaleStart: 1.0,
      scaleEnd: 1.08,
      originStartX: 76,
      originStartY: 42,
      originEndX: 72,
      originEndY: 40,
    },
  },
  {
    id: 's02',
    start: 3.76, // Beat 5
    end: 9.15, // Covers transition through Beat 13 (8.80s)
    file: 'Figure_gazing_back_76866c55_2K.jpg',
    src: '/assets/paper/Figure_gazing_back_76866c55_2K.jpg',
    fade: 0.6,
    transition: { type: 'smoke-dissolve', duration: 0.75 },
    bgOpacity: 1.2,
    effects: {
      vignette: { strength: 0.28, size: 68 },
      colorGrade: { saturate: 1.06, brightness: 1.02, contrast: 1.06 },
    },
    camera: {
      scaleStart: 1.07,
      scaleEnd: 1.0,
      originStartX: 52,
      originStartY: 46,
      originEndX: 48,
      originEndY: 50,
    },
  },
  {
    id: 's03',
    start: 8.80, // Beat 13
    end: 14.15, // Covers transition through Beat 21 (13.84s)
    file: 'plate_07_lane.png',
    src: '/assets/paper/plate_07_lane.png',
    fade: 0.6,
    bgOpacity: 1.2,
    transition: { type: 'smoke-dissolve', duration: 0.75 },
    effects: {
      vignette: { strength: 0.32, size: 66 },
      colorGrade: { saturate: 1.02, brightness: 1.0, contrast: 1.07 },
    },
    camera: {
      scaleStart: 1.0,
      scaleEnd: 1.08,
      originStartX: 42,
      originStartY: 50,
      originEndX: 54,
      originEndY: 47,
    },
  },
  {
    id: 's04',
    start: 13.84, // Beat 21
    end: 15.00, // Seamlessly hands off to vocal entry "मुझे" at 15.00s
    file: 'Figure_holding_leather_reins_8642e236_2K.jpg',
    src: '/assets/paper/Figure_holding_leather_reins_8642e236_2K.jpg',
    fade: 0.5,
    bgOpacity: 1.2,
    transition: { type: 'smoke-dissolve', duration: 0.7 },
    effects: {
      vignette: { strength: 0.30, size: 68 },
      colorGrade: { saturate: 1.05, brightness: 1.01, contrast: 1.06 },
    },
    camera: {
      scaleStart: 1.02,
      scaleEnd: 1.05,
      originStartX: 46,
      originStartY: 50,
      originEndX: 52,
      originEndY: 48,
    },
  },

  // ==========================================
  {
    id: 's06_chorus_journey',
    start: 15.00,
    end: 25.40,
    file: 'Figure_looking_back_at_twilight_4619df71.png',
    src: '/assets/paper/backgrounds/Figure_looking_back_at_twilight_4619df71.jpg',
    bgOpacity: 1.2,
    fade: 0.55,
    transition: { type: 'ink-wash', duration: 0.8 },
    effects: {
      vignette: { strength: 0.30, size: 68 },
      colorGrade: { saturate: 1.08, brightness: 1.01, contrast: 1.07 },
    },
    camera: {
      scaleStart: 1.0,
      scaleEnd: 1.07,
      beatPunch: 1.25,
      originStartX: 52,
      originStartY: 50,
      originEndX: 47,
      originEndY: 48,
    },
  },

  // ==========================================
  // SHOT 07 (seg_04): 25.40s - 35.30s (Chorus Cycle 2 - Sam Strike)
  // ==========================================
  {
    id: 's07_chorus_cycle2',
    start: 25.40,
    end: 35.30,
    file: 'plate_06_threshold.png',
    src: '/assets/paper/plate_06_threshold.png',
    bgOpacity: 0.50,
    fade: 0.65,
    transition: { type: 'smoke-dissolve', duration: 0.85 },
    effects: {
      vignette: { strength: 0.32, size: 66 },
      colorGrade: { saturate: 1.04, brightness: 1.0, contrast: 1.07 },
    },
    camera: {
      scaleStart: 1.0,
      scaleEnd: 1.07,
      beatPunch: 1.2,
      originStartX: 52,
      originStartY: 50,
      originEndX: 46,
      originEndY: 46,
    },
  },

  // ==========================================
  // SHOT 08 (seg_05): 35.30s - 45.20s (Chorus Cycle 3 - Echoing Accusation | Lyric lower-left)
  // ==========================================
  {
    id: 's08_chorus_cycle3',
    start: 35.30,
    end: 45.20,
    file: 'plate_05c_viraha_trio.png',
    src: '/assets/paper/plate_05c_viraha_trio.png',
    bgOpacity: 1,
    fade: 0.65,
    transition: { type: 'parchment-drift', duration: 0.85 },
    effects: {
      vignette: { strength: 0.32, size: 68 },
      colorGrade: { saturate: 1.02, brightness: 1.0, contrast: 1.06 },
    },
    camera: {
      scaleStart: 1.0,
      scaleEnd: 1.07,
      beatPunch: 1.2,
      originStartX: 46,
      originStartY: 50,
      originEndX: 54,
      originEndY: 48,
    },
  },

  // ==========================================
  // SHOT 09 (seg_06): 45.20s - 55.10s (Chorus Cycle 4 - Helpless Surrender)
  // ==========================================
  {
    id: 's09_chorus_cycle4',
    start: 45.20,
    end: 55.10,
    file: 'plate_radha_krishna_separation.png',
    src: '/assets/paper/plate_radha_krishna_separation.png',
    bgOpacity: 1,
    fade: 0.65,
    transition: { type: 'smoke-dissolve', duration: 0.85 },
    effects: {
      vignette: { strength: 0.35, size: 65 },
      colorGrade: { saturate: 1.0, brightness: 1.0, contrast: 1.08 },
    },
    camera: {
      scaleStart: 1.0,
      scaleEnd: 1.07,
      beatPunch: 1.15,
      originStartX: 52,
      originStartY: 50,
      originEndX: 48,
      originEndY: 50,
    },
  },

  // ==========================================
  // SHOT 10 (seg_07): 55.10s - 58.20s (Interlude 1 - Diya & Kadamba)
  // ==========================================
  {
    id: 's10_interlude_diya',
    start: 55.10,
    end: 58.20,
    file: 'plate_01_moon_sky.png',
    src: '/assets/paper/plate_01_moon_sky.png',
    bgOpacity: 0.54,
    fade: 0.55,
    transition: { type: 'ink-wash', duration: 0.7 },
    effects: {
      vignette: { strength: 0.32, size: 68 },
      colorGrade: { saturate: 1.04, brightness: 1.0, contrast: 1.06 },
    },
    camera: {
      scaleStart: 1.0,
      scaleEnd: 1.05,
      originStartX: 50,
      originStartY: 50,
      originEndX: 50,
      originEndY: 46,
    },
  },

  // ==========================================
  // SHOT 11 (seg_08): 58.20s - 68.00s (Verse 1 - प्रीत करे दुख होए | Lyric lower-left)
  // ==========================================
  {
    id: 's11_verse1_preet_dukh',
    start: 58.20,
    end: 68.00,
    file: 'plate_24c_eyes_longing.png',
    src: '/assets/paper/plate_24c_eyes_longing.png',
    bgOpacity: 1,
    fade: 0.65,
    transition: { type: 'smoke-dissolve', duration: 0.85 },
    effects: {
      vignette: { strength: 0.30, size: 68 },
      colorGrade: { saturate: 0.98, brightness: 1.0, contrast: 1.06 },
    },
    camera: {
      scaleStart: 1.0,
      scaleEnd: 1.06,
      originStartX: 46,
      originStartY: 50,
      originEndX: 54,
      originEndY: 48,
    },
  },

  // ==========================================
  // SHOT 12 (seg_09): 68.00s - 78.80s (Verse 1 - नगर ढिंढोरा पीटती | Real Dholak & Town Crier)
  // ==========================================
  {
    id: 's12_verse1_dindora',
    start: 68.00,
    end: 78.80,
    file: '',
    src: '/assets/paper/plate_14a_beating_dholak.png',
    bgOpacity: 0.9,
    fade: 0.6,
    transition: { type: 'ink-burst', duration: 0.75 },
    effects: {
      vignette: { strength: 0.32, size: 66 },
      colorGrade: { saturate: 1.05, brightness: 1.0, contrast: 1.08 },
    },
    camera: {
      scaleStart: 1.0,
      scaleEnd: 1.08,
      beatPunch: 1.45,
      originStartX: 52,
      originStartY: 50,
      originEndX: 47,
      originEndY: 48,
    },
  },

  // ==========================================
  // SHOT 13 (seg_10): 78.80s - 88.60s (Chorus - प्रेमी बनाकर 1 | Lyric low-center)
  // ==========================================
  {
    id: 's13_chorus_premi_1',
    start: 78.80,
    end: 88.60,
    file: 'plate_08a_krishna_glance_back.png',
    src: '/assets/paper/plate_08a_krishna_glance_back.png',
    bgOpacity: 1,
    fade: 0.65,
    transition: { type: 'smoke-dissolve', duration: 0.8 },
    effects: {
      vignette: { strength: 0.32, size: 66 },
      colorGrade: { saturate: 1.04, brightness: 1.0, contrast: 1.07 },
    },
    camera: {
      scaleStart: 1.0,
      scaleEnd: 1.07,
      beatPunch: 1.25,
      originStartX: 48,
      originStartY: 50,
      originEndX: 52,
      originEndY: 48,
    },
  },

  // ==========================================
  // SHOT 14 (seg_11): 88.60s - 98.80s (Chorus - प्रेमी बनाकर 2 | Lyric center)
  // ==========================================
  {
    id: 's14_chorus_premi_2',
    start: 88.60,
    end: 98.80,
    file: 'Woman_touching_tear_on_paper_694ba943.jpg',
    src: '/assets/paper/backgrounds/Woman_touching_tear_on_paper_694ba943.jpg',
    bgOpacity: 1,
    bgBlur: 1.0,
    fade: 0.65,
    transition: { type: 'smoke-dissolve', duration: 0.85 },
    effects: {
      vignette: { strength: 0.34, size: 64 },
      colorGrade: { saturate: 1.02, brightness: 1.0, contrast: 1.08 },
    },
    camera: {
      scaleStart: 1.0,
      scaleEnd: 1.08,
      beatPunch: 1.2,
      originStartX: 52,
      originStartY: 50,
      originEndX: 48,
      originEndY: 50,
    },
  },

  // ==========================================
  // SHOT 15 (seg_12): 98.80s - 108.80s (Chorus - अपना बनाकर 3 | Lyric top-center)
  // ==========================================
  {
    id: 's15_chorus_apna_3',
    start: 98.80,
    end: 108.80,
    file: 'plate_06a_clutched_veil.png',
    src: '/assets/paper/plate_06a_clutched_veil.png',
    bgOpacity: 0.46,
    fade: 0.65,
    transition: { type: 'ink-wash', duration: 0.85 },
    effects: {
      vignette: { strength: 0.32, size: 68 },
      colorGrade: { saturate: 1.04, brightness: 1.01, contrast: 1.06 },
    },
    camera: {
      scaleStart: 1.0,
      scaleEnd: 1.07,
      beatPunch: 1.25,
      originStartX: 48,
      originStartY: 50,
      originEndX: 52,
      originEndY: 50,
    },
  },

  // ==========================================
  // SHOT 16 (seg_13): 108.80s - 118.80s (Chorus - अपना बनाकर 4 | Wide Lonely Mist)
  // ==========================================
  {
    id: 's16_chorus_apna_4',
    start: 108.80,
    end: 118.80,
    file: 'Close-up_of_crying_eyes_e84f2e78.jpg',
    src: '/assets/paper/backgrounds/Close-up_of_crying_eyes_e84f2e78.jpg',
    bgOpacity: 0.48,
    fade: 0.65,
    transition: { type: 'parchment-drift', duration: 0.85 },
    effects: {
      vignette: { strength: 0.34, size: 66 },
      colorGrade: { saturate: 0.98, brightness: 1.0, contrast: 1.07 },
    },
    camera: {
      scaleStart: 1.0,
      scaleEnd: 1.07,
      originStartX: 52,
      originStartY: 50,
      originEndX: 48,
      originEndY: 50,
    },
  },

  // ==========================================
  // SHOT 17 (seg_14): 118.80s - 122.00s (Interlude 2 - Braj Cow & Peacock)
  // ==========================================
  {
    id: 's17_interlude_braj_cow',
    start: 118.80,
    end: 122.00,
    file: 'plate_09a_waiting_cow.png',
    src: '/assets/paper/plate_09a_waiting_cow.png',
    bgOpacity: 1,
    fade: 0.55,
    transition: { type: 'smoke-dissolve', duration: 0.7 },
    effects: {
      vignette: { strength: 0.30, size: 70 },
      colorGrade: { saturate: 1.04, brightness: 1.0, contrast: 1.05 },
    },
    camera: {
      scaleStart: 1.0,
      scaleEnd: 1.05,
      originStartX: 50,
      originStartY: 50,
      originEndX: 50,
      originEndY: 46,
    },
  },

  // ==========================================
  // SHOT 18 (seg_15): 122.00s - 132.00s (Verse 2 - रहिमन धागा प्रेम का | Real Moli Thread)
  // ==========================================
  {
    id: 's18_verse2_dhaga_prem',
    start: 122.00,
    end: 132.00,
    file: 'plate_15a_burning_thread.png',
    src: '/assets/paper/plate_15a_burning_thread.png',
    bgOpacity: 0.48,
    fade: 0.65,
    transition: { type: 'ink-wash', duration: 0.85 },
    effects: {
      vignette: { strength: 0.32, size: 68 },
      colorGrade: { saturate: 1.08, brightness: 1.01, contrast: 1.07 },
    },
    camera: {
      scaleStart: 1.0,
      scaleEnd: 1.06,
      originStartX: 48,
      originStartY: 50,
      originEndX: 52,
      originEndY: 48,
    },
  },

  // ==========================================
  // SHOT 19 (seg_16): 132.00s - 142.40s (Verse 2 - टूटे से फिर ना जुड़े | Broken Red Thread Close-Up)
  // ==========================================
  {
    id: 's19_verse2_toote_ganth',
    start: 132.00,
    end: 142.40,
    file: 'plate_04b_clutched_silk.png',
    src: '/assets/paper/',
    bgOpacity: 0.48,
    fade: 0.65,
    transition: { type: 'smoke-dissolve', duration: 0.8 },
    effects: {
      vignette: { strength: 0.34, size: 66 },
      colorGrade: { saturate: 1.04, brightness: 1.0, contrast: 1.08 },
    },
    camera: {
      scaleStart: 1.0,
      scaleEnd: 1.08,
      beatPunch: 1.35,
      originStartX: 52,
      originStartY: 50,
      originEndX: 48,
      originEndY: 50,
    },
  },

  // ==========================================
  // SHOT 20 (seg_17): 142.40s - 152.80s (Chorus - गठबंधन बनाकर 1 | Lyric low-center)
  // ==========================================
  {
    id: 's20_chorus_gathbandhan_1',
    start: 142.40,
    end: 152.80,
    file: 'plate_goverdhan_complete_dawn.png',
    src: '/assets/paper/plate_goverdhan_complete_dawn.png',
    bgOpacity: 0.46,
    fade: 0.65,
    transition: { type: 'ink-burst', duration: 0.8 },
    effects: {
      vignette: { strength: 0.34, size: 66 },
      colorGrade: { saturate: 1.06, brightness: 1.0, contrast: 1.08 },
    },
    camera: {
      scaleStart: 1.0,
      scaleEnd: 1.07,
      beatPunch: 1.3,
      originStartX: 48,
      originStartY: 50,
      originEndX: 52,
      originEndY: 48,
    },
  },

  // ==========================================
  // SHOT 21 (seg_18): 152.80s - 163.00s (Chorus - गठबंधन बनाकर 2 | Lyric left)
  // ==========================================
  {
    id: 's21_chorus_gathbandhan_2',
    start: 152.80,
    end: 163.00,
    file: 'plate_10a_sunset_empty_path.png',
    src: '/assets/paper/plate_10a_sunset_empty_path.png',
    bgOpacity: 0.50,
    fade: 0.65,
    transition: { type: 'parchment-drift', duration: 0.85 },
    effects: {
      vignette: { strength: 0.34, size: 66 },
      colorGrade: { saturate: 1.04, brightness: 1.0, contrast: 1.08 },
    },
    camera: {
      scaleStart: 1.0,
      scaleEnd: 1.07,
      beatPunch: 1.25,
      originStartX: 54,
      originStartY: 50,
      originEndX: 48,
      originEndY: 50,
    },
  },

  // ==========================================
  // SHOT 22 (seg_19): 163.00s - 173.00s (Chorus - अपना बनाकर 5 | Lyric top-center)
  // ==========================================
  {
    id: 's22_chorus_apna_5',
    start: 163.00,
    end: 173.00,
    file: 'plate_05a_silent_flute.png',
    src: '/assets/paper/plate_05a_silent_flute.png',
    bgOpacity: 0.48,
    fade: 0.65,
    transition: { type: 'smoke-dissolve', duration: 0.85 },
    effects: {
      vignette: { strength: 0.32, size: 68 },
      colorGrade: { saturate: 1.04, brightness: 1.01, contrast: 1.06 },
    },
    camera: {
      scaleStart: 1.0,
      scaleEnd: 1.07,
      beatPunch: 1.25,
      originStartX: 48,
      originStartY: 50,
      originEndX: 52,
      originEndY: 50,
    },
  },

  // ==========================================
  // SHOT 23 (seg_20): 173.00s - 183.40s (Chorus - अपना बनाकर 6 | Lyric low-center)
  // ==========================================
  {
    id: 's23_chorus_apna_6',
    start: 173.00,
    end: 183.40,
    file: 'plate_08b_radha_grief.png',
    src: '/assets/paper/plate_08b_radha_grief.png',
    bgOpacity: 0.46,
    fade: 0.65,
    transition: { type: 'smoke-dissolve', duration: 0.9 },
    effects: {
      vignette: { strength: 0.34, size: 66 },
      colorGrade: { saturate: 1.0, brightness: 1.0, contrast: 1.08 },
    },
    camera: {
      scaleStart: 1.0,
      scaleEnd: 1.07,
      originStartX: 52,
      originStartY: 50,
      originEndX: 48,
      originEndY: 50,
    },
  },

  // ==========================================
  // SHOT 24 (seg_21): 183.40s - 193.60s (Verse 3 - लकड़ी जल कोयला भई | Viraha Chita Climax Begins)
  // ==========================================
  {
    id: 's24_verse3_lakdi_jal_koyla',
    start: 183.40,
    end: 193.60,
    file: 'plate_20c_sandalwood_embers.png',
    src: '/assets/paper/plate_20c_sandalwood_embers.png',
    bgOpacity: 0.56,
    fade: 0.7,
    transition: { type: 'ink-burst', duration: 0.9 },
    effects: {
      vignette: { strength: 0.38, size: 62 },
      colorGrade: { saturate: 1.18, brightness: 0.99, contrast: 1.12, sepia: 0.14 },
    },
    camera: {
      scaleStart: 1.0,
      scaleEnd: 1.08,
      beatPunch: 1.3,
      originStartX: 48,
      originStartY: 52,
      originEndX: 52,
      originEndY: 46,
    },
  },

  // ==========================================
  // SHOT 25 (seg_22): 193.60s - 204.20s (Verse 3 - मैं पापिन ऐसी जली | Lyric low-center)
  // ==========================================
  {
    id: 's25_verse3_papin_aisi_jali',
    start: 193.60,
    end: 204.20,
    file: 'plate_15a_burning_thread.png',
    src: '/assets/paper/plate_15a_burning_thread.png',
    bgOpacity: 0.52,
    fade: 0.65,
    transition: { type: 'smoke-dissolve', duration: 0.85 },
    effects: {
      vignette: { strength: 0.40, size: 60 },
      colorGrade: { saturate: 1.16, brightness: 0.98, contrast: 1.13, sepia: 0.12 },
    },
    camera: {
      scaleStart: 1.0,
      scaleEnd: 1.08,
      beatPunch: 1.35,
      originStartX: 52,
      originStartY: 50,
      originEndX: 48,
      originEndY: 48,
    },
  },

  // ==========================================
  // SHOT 26 (seg_23): 204.20s - 214.40s (Chorus - जलती चिता में 1 | Fiery Climax Peak!)
  // ==========================================
  {
    id: 's26_chorus_jalti_chita_1',
    start: 204.20,
    end: 214.40,
    file: 'plate_20c_sandalwood_embers.png',
    src: '/assets/paper/plate_20c_sandalwood_embers.png',
    bgOpacity: 0.58,
    fade: 0.65,
    transition: { type: 'ink-burst', duration: 0.85 },
    effects: {
      vignette: { strength: 0.42, size: 58 },
      colorGrade: { saturate: 1.22, brightness: 0.99, contrast: 1.14, sepia: 0.14 },
    },
    camera: {
      scaleStart: 1.0,
      scaleEnd: 1.09,
      beatPunch: 1.45,
      originStartX: 48,
      originStartY: 50,
      originEndX: 53,
      originEndY: 47,
    },
  },

  // ==========================================
  // SHOT 27 (seg_24): 214.40s - 224.60s (Chorus - जलती चिता में 2 | Close-Up Tear Portrait)
  // ==========================================
  {
    id: 's27_chorus_jalti_chita_2',
    start: 214.40,
    end: 224.60,
    file: 'plate_04b_departing_dust.png',
    src: '/assets/paper/plate_04b_departing_dust.png',
    bgOpacity: 0.50,
    bgBlur: 0.8,
    fade: 0.65,
    transition: { type: 'smoke-dissolve', duration: 0.85 },
    effects: {
      vignette: { strength: 0.40, size: 60 },
      colorGrade: { saturate: 1.12, brightness: 0.99, contrast: 1.12 },
    },
    camera: {
      scaleStart: 1.0,
      scaleEnd: 1.08,
      beatPunch: 1.35,
      originStartX: 52,
      originStartY: 50,
      originEndX: 48,
      originEndY: 46,
    },
  },

  // ==========================================
  // SHOT 28 (seg_25): 224.60s - 234.80s (Chorus - अपना बनाकर 7 | Lyric right)
  // ==========================================
  {
    id: 's28_chorus_apna_7',
    start: 224.60,
    end: 234.80,
    file: 'plate_10a_sunset_empty_path.png',
    src: '/assets/paper/plate_10a_sunset_empty_path.png',
    bgOpacity: 0.52,
    fade: 0.65,
    transition: { type: 'parchment-drift', duration: 0.85 },
    effects: {
      vignette: { strength: 0.34, size: 66 },
      colorGrade: { saturate: 1.06, brightness: 1.0, contrast: 1.08 },
    },
    camera: {
      scaleStart: 1.0,
      scaleEnd: 1.07,
      beatPunch: 1.25,
      originStartX: 46,
      originStartY: 50,
      originEndX: 52,
      originEndY: 50,
    },
  },

  // ==========================================
  // SHOT 29 (seg_26): 234.80s - 245.20s (Verse 4 - कागा सब तन खाइयो | Sacred Crow Messenger)
  // ==========================================
  {
    id: 's29_verse4_kaga_sab_tan',
    start: 234.80,
    end: 245.20,
    file: 'plate_23c_crow_bough.png',
    src: '/assets/paper/plate_23c_crow_bough.png',
    bgOpacity: 0.54,
    fade: 0.7,
    transition: { type: 'ink-wash', duration: 0.9 },
    effects: {
      vignette: { strength: 0.36, size: 64 },
      colorGrade: { saturate: 0.98, brightness: 0.99, contrast: 1.08 },
    },
    camera: {
      scaleStart: 1.0,
      scaleEnd: 1.07,
      originStartX: 52,
      originStartY: 50,
      originEndX: 48,
      originEndY: 46,
    },
  },

  // ==========================================
  // SHOT 30 (seg_27): 245.20s - 256.20s (Verse 4 - दो नैना मत खाइयो | Extreme Close-Up Emotional Peak!)
  // ==========================================
  {
    id: 's30_verse4_do_naina',
    start: 245.20,
    end: 256.20,
    file: 'plate_24c_eyes_longing.png',
    src: '/assets/paper/plate_24c_eyes_longing.png',
    bgOpacity: 0.60,
    fade: 0.75,
    transition: { type: 'radial-bloom', duration: 0.95 },
    effects: {
      vignette: { strength: 0.38, size: 62 },
      colorGrade: { saturate: 1.06, brightness: 1.0, contrast: 1.10 },
    },
    camera: {
      scaleStart: 1.0,
      scaleEnd: 1.10,
      beatPunch: 1.15,
      originStartX: 48,
      originStartY: 46,
      originEndX: 52,
      originEndY: 42,
    },
  },

  // ==========================================
  // SHOT 31 (seg_28): 256.20s - 266.20s (Chorus - मोसे नैना मिलाकर 1 | Lyric top-center)
  // ==========================================
  {
    id: 's31_chorus_naina_milakar_1',
    start: 256.20,
    end: 266.20,
    file: 'plate_08a_krishna_glance_back.png',
    src: '/assets/paper/plate_08a_krishna_glance_back.png',
    bgOpacity: 0.50,
    fade: 0.65,
    transition: { type: 'smoke-dissolve', duration: 0.85 },
    effects: {
      vignette: { strength: 0.34, size: 66 },
      colorGrade: { saturate: 1.04, brightness: 1.01, contrast: 1.07 },
    },
    camera: {
      scaleStart: 1.0,
      scaleEnd: 1.07,
      beatPunch: 1.3,
      originStartX: 48,
      originStartY: 50,
      originEndX: 52,
      originEndY: 50,
    },
  },

  // ==========================================
  // SHOT 32 (seg_29): 266.20s - 276.40s (Chorus - मोसे नैना मिलाकर 2 | Lyric low-center)
  // ==========================================
  {
    id: 's32_chorus_naina_milakar_2',
    start: 266.20,
    end: 276.40,
    file: 'plate_08b_krishna_distant_mist.png',
    src: '/assets/paper/plate_08b_krishna_distant_mist.png',
    bgOpacity: 0.52,
    fade: 0.65,
    transition: { type: 'smoke-dissolve', duration: 0.9 },
    effects: {
      vignette: { strength: 0.36, size: 64 },
      colorGrade: { saturate: 1.0, brightness: 1.0, contrast: 1.08 },
    },
    camera: {
      scaleStart: 1.0,
      scaleEnd: 1.07,
      originStartX: 52,
      originStartY: 50,
      originEndX: 48,
      originEndY: 50,
    },
  },

  // ==========================================
  // SHOT 33 (seg_30): 276.40s - 288.00s (Outro - मुझे अपना बनाकर छोड़ गए | Final Horizon Stillness)
  // ==========================================
  {
    id: 's33_outro_apna_banakar',
    start: 276.40,
    end: 288.00,
    file: 'plate_27c_final_horizon.png',
    src: '/assets/paper/plate_27c_final_horizon.png',
    bgOpacity: 0.56,
    fadeOut: 1.8,
    fade: 0.8,
    transition: { type: 'smoke-dissolve', duration: 1.0 },
    effects: {
      vignette: { strength: 0.40, size: 62 },
      colorGrade: { saturate: 0.96, brightness: 0.98, contrast: 1.08 },
    },
    camera: {
      scaleStart: 1.06,
      scaleEnd: 1.0,
      originStartX: 50,
      originStartY: 48,
      originEndX: 50,
      originEndY: 50,
    },
  },
]

// Assemble complete shots by binding respective layers from ./layers.js
export const shots = shotBackgrounds.map((shot) => ({
  ...shot,
  layers: shotLayers[shot.id] || [],
}))

export default shots
