// ===========================================================================
// Character Cutout Layers and Props Configuration (Separated for Clean Management)
// • Edit Radha, Krishna, props, positions, and animations here independently
// • Mapped by Shot ID
// ===========================================================================


const SLOT_LEFT = { bottom: '1%', left: '3%', width: '40%' }
const SLOT_RIGHT = { bottom: '1%', right: '3%', width: '40%' }
const SLOT_TOP_LEFT = { top: '2%', left: '2%', width: '34%' }

// One figure per beat. End is 1ms before the next cut, so two poses never share a frame.
// Change the src string to swap a pose. Timing stays on the beat.
function beatCuts(rows, position) {
  return rows.map(([id, src, start, end]) => ({
    id,
    src,
    start,
    end,
    opacity: 1,
    contrast: 1.15,
    brightness: 1.02,
    hardCut: true,
    enter: { type: 'cut', duration: 0 },
    exit: { type: 'cut', duration: 0 },
    living: { type: 'sway', amp: 0.5, period: 3.8 },
    position,
    motion: { scaleStart: 1.0, scaleEnd: 1.02, yStart: 1, yEnd: -1 },
    blend: 'normal',
    zIndex: 4,
  }))
}

export const shotLayers = {

  // Video Shots and Cutout Layers Configuration (Cinematic & Emotionally Synced)
    // ==========================================
    // INTRO ARC: 0.0s - 18.81s (Synced to Beats)
    // भाव: स्मृति, प्रतीक्षा और मिलन की भोर (Before Separation)
    // ==========================================
  s01: [
        {
          id: 'krishna_contemplating_radha',
          src: '/assets/paper/cast_krishna/krishna_103_young_figure_contemplating_radha.png',
          start: 0.25,
          end: 3.76, // Beat 5
          enter: { type: 'smoke-dissolve', duration: 0.8 },
          exit: { type: 'smoke-evaporate', duration: 0.5 },
          living: { type: 'sway', amp: 2.0, period: 4.6 },
          keyframes: [
            { at: 0.0, x: 0, y: 2, scale: 0.94 },
            { at: 0.55, x: 7, y: -4, scale: 1.01 },
            { at: 1.0, x: 12, y: -2, scale: 1.06 },
          ],
          position: {
            top: '21%',
            left: '25%',
            width: '19%',
          },
          blend: 'normal',
          zIndex: 2,
        },
  ],
  s02: [
        {
          id: 'radha_waiting',
          src: '/assets/paper/cast_radha/radha_028_pointing_into_distance.png',
          start: 3.85,
          end: 8.80, // Beat 13
          enter: { type: 'smoke-dissolve', duration: 0.8 },
          exit: { type: 'smoke-evaporate', duration: 0.55 },
          living: { type: 'sway', amp: 1.6, period: 4.6 },
          position: {
            bottom: '2%',
            left: '48%',
            width: '42%',
          },
          keyframes: [
            { at: 0.0, x: -8, y: 6, scale: 0.98 },
            { at: 0.6, x: 2, y: -4, scale: 1.03 },
            { at: 1.0, x: 5, y: -6, scale: 1.05 },
          ],
          blend: 'normal',
          zIndex: 3,
        },
  ],
  s03: [
        {
          id: 'radha_grief',
          src: '/assets/paper/cast_radha/radha_004_curled_figure_hiding_grief.png',
          start: 8.90,
          end: 13.84, // Beat 21
          enter: { type: 'smoke-dissolve', duration: 0.8 },
          exit: { type: 'smoke-evaporate', duration: 0.55 },
          living: { type: 'sway', amp: 1.1, period: 3.4 },
          position: {
            bottom: '0%',
            right: '51%',
            width: '42%',
          },
          keyframes: [
            { at: 0.0, x: 6, y: 5, scale: 0.98 },
            { at: 0.5, x: -2, y: -2, scale: 1.02 },
            { at: 1.0, x: -6, y: 2, scale: 1.04 },
          ],
          blend: 'normal',
          zIndex: 3,
        },
  ],
  s04: [
        {
          id: 'radha_flute_heart_intro',
          src: '/assets/paper/cast_radha/radha_005_holding_flute_to_heart.png',
          start: 13.90,
          end: 14.999,
          enter: { type: 'smoke-dissolve', duration: 0.6 },
          exit: { type: 'smoke-evaporate', duration: 0.4 },
          living: { type: 'sway', amp: 1.2, period: 4.2 },
          position: {
            bottom: '1%',
            right: '8%',
            width: '42%',
          },
          motion: { scaleStart: 0.98, scaleEnd: 1.04, xStart: 3, xEnd: -3 },
          blend: 'normal',
          zIndex: 4,
        },
  ],

    // ==========================================
  // मुझे अपना बनाकर — lyric on top, figure left
  s06_chorus_journey: beatCuts([
    ['s06_01', '/assets/paper/cast_radha/radha_007_listening_for_flute_melody.png', 15, 15.719], // मुझे
    ['s06_02', '/assets/paper/cast_radha/radha_032_reaching_outward_in_longing.png', 15.72, 16.346], // मुझे
    ['s06_03', '/assets/paper/cast_radha/radha_071_pulling_red_veil.png', 16.347, 16.95], // अपना
    ['s06_04', '/assets/paper/cast_krishna/krishna_037_holding_bamboo_flute.png', 16.951, 17.577], // बनाकर
    ['s06_05', '/assets/paper/cast_radha/radha_012_hands_holding_red_thread.png', 17.578, 18.18], // बनाकर
    ['s06_06', '/assets/paper/cast_krishna/krishna_081_standing_with_bansuri.png', 18.181, 18.807], // बनाकर
    ['s06_07', '/assets/paper/cast_krishna/krishna_055_walking_away_on_paper.png', 18.808, 19.457], // छोड़
    ['s06_08', '/assets/paper/cast_krishna/krishna_075_silhouette_in_wind.png', 19.458, 20.107], // गए
    ['s06_09', '/assets/paper/cast_radha/radha_027_peeking_from_marble_archway.png', 20.108, 20.758], // आए
    ['s06_10', '/assets/paper/cast_radha/radha_084_standing_in_shock.png', 20.759, 21.338], // ना
    ['s06_11', '/assets/paper/cast_radha/radha_086_standing_with_crossed_arms.png', 21.339, 21.965], // ना
    ['s06_12', '/assets/paper/cast_krishna/krishna_090_playing_flute.png', 21.966, 22.569], // सँवरिया
    ['s06_13', '/assets/paper/cast_krishna/krishna_043_playing_flute_on_paper.png', 22.57, 23.173], // सँवरिया
    ['s06_14', '/assets/paper/cast_krishna/krishna_045_pointing_flute_at_moon.png', 23.174, 23.799], // सँवरिया
    ['s06_15', '/assets/paper/cast_krishna/krishna_033_crying_with_bamboo_flute.png', 23.8, 24.403], // बेदरदी
    ['s06_16', '/assets/paper/cast_radha/radha_096_weeping_in_sorrow.png', 24.404, 25.007], // बेदरदी
    ['s06_17', '/assets/paper/cast_krishna/krishna_076_sitting_in_sorrow.png', 25.008, 25.399], // बेदरदी
  ], SLOT_LEFT),

  // मुझे अपना बनाकर — lyric on top, figure left
  s07_chorus_cycle2: beatCuts([
    ['s07_01', '/assets/paper/cast_radha/radha_072_resting_chin_on_hand.png', 25.4, 26.191], // मुझे
    ['s07_02', '/assets/paper/cast_radha/radha_092_tying_red_thread_on.png', 26.192, 26.818], // अपना
    ['s07_03', '/assets/paper/cast_radha/radha_010_standing_in_quiet_dignity.png', 26.819, 27.445], // अपना
    ['s07_04', '/assets/paper/cast_radha/radha_045_stringing_flowers_into_gar.png', 27.446, 28.049], // बनाकर
    ['s07_05', '/assets/paper/cast_krishna/krishna_037_holding_bamboo_flute.png', 28.05, 28.676], // बनाकर
    ['s07_06', '/assets/paper/cast_krishna/krishna_042_looking_back_with_sorrow.png', 28.677, 29.279], // छोड़
    ['s07_07', '/assets/paper/cast_krishna/krishna_054_turning_into_wind.png', 29.28, 29.906], // गए
    ['s07_08', '/assets/paper/cast_radha/radha_020_radha_gazing_at_full_moon.png', 29.907, 30.533], // आए
    ['s07_09', '/assets/paper/cast_radha/radha_006_kneeling_in_grief.png', 30.534, 31.16], // ना
    ['s07_10', '/assets/paper/cast_radha/radha_093_walking_forward_hesitantly.png', 31.161, 31.764], // ना
    ['s07_11', '/assets/paper/cast_krishna/krishna_050_sitting_with_bamboo_flute.png', 31.765, 32.391], // सँवरिया
    ['s07_12', '/assets/paper/cast_krishna/krishna_090_playing_flute.png', 32.392, 33.018], // सँवरिया
    ['s07_13', '/assets/paper/cast_krishna/krishna_043_playing_flute_on_paper.png', 33.019, 33.621], // सँवरिया
    ['s07_14', '/assets/paper/cast_radha/radha_095_weeping_against_pillar.png', 33.622, 34.248], // बेदरदी
    ['s07_15', '/assets/paper/cast_radha/radha_004_curled_figure_hiding_grief.png', 34.249, 34.852], // बेदरदी
    ['s07_16', '/assets/paper/cast_krishna/krishna_033_crying_with_bamboo_flute.png', 34.853, 35.299], // बेदरदी
  ], SLOT_LEFT),

  // मुझे अपना बनाकर — lyric on the left, figure right
  s08_chorus_cycle3: beatCuts([
    ['s08_01', '/assets/paper/cast_radha/radha_030_radha_portrait_with_tear_falling.png', 35.3, 36.083], // मुझे
    ['s08_02', '/assets/paper/cast_radha/radha_071_pulling_red_veil.png', 36.084, 36.71], // अपना
    ['s08_03', '/assets/paper/cast_radha/radha_092_tying_red_thread_on.png', 36.711, 37.313], // अपना
    ['s08_04', '/assets/paper/cast_radha/radha_012_hands_holding_red_thread.png', 37.314, 37.94], // बनाकर
    ['s08_05', '/assets/paper/cast_krishna/krishna_081_standing_with_bansuri.png', 37.941, 38.544], // बनाकर
    ['s08_06', '/assets/paper/cast_krishna/krishna_026_turning_away_with_flute.png', 38.545, 39.171], // छोड़
    ['s08_07', '/assets/paper/cast_krishna/krishna_086_walking_with_flute.png', 39.172, 39.798], // गए
    ['s08_08', '/assets/paper/cast_radha/radha_028_pointing_into_distance.png', 39.799, 40.425], // आए
    ['s08_09', '/assets/paper/cast_radha/radha_084_standing_in_shock.png', 40.426, 41.029], // ना
    ['s08_10', '/assets/paper/cast_radha/radha_086_standing_with_crossed_arms.png', 41.03, 41.656], // ना
    ['s08_11', '/assets/paper/cast_krishna/krishna_045_pointing_flute_at_moon.png', 41.657, 42.259], // सँवरिया
    ['s08_12', '/assets/paper/cast_krishna/krishna_050_sitting_with_bamboo_flute.png', 42.26, 42.886], // सँवरिया
    ['s08_13', '/assets/paper/cast_krishna/krishna_090_playing_flute.png', 42.887, 43.513], // सँवरिया
    ['s08_14', '/assets/paper/cast_radha/radha_096_weeping_in_sorrow.png', 43.514, 44.14], // बेदरदी
    ['s08_15', '/assets/paper/cast_krishna/krishna_076_sitting_in_sorrow.png', 44.141, 44.744], // बेदरदी
    ['s08_16', '/assets/paper/cast_radha/radha_095_weeping_against_pillar.png', 44.745, 45.199], // बेदरदी
  ], SLOT_RIGHT),

  // मुझे अपना बनाकर — lyric on top, figure left
  s09_chorus_cycle4: beatCuts([
    ['s09_01', '/assets/paper/cast_radha/radha_007_listening_for_flute_melody.png', 45.2, 45.975], // मुझे
    ['s09_02', '/assets/paper/cast_radha/radha_010_standing_in_quiet_dignity.png', 45.976, 46.601], // अपना
    ['s09_03', '/assets/paper/cast_radha/radha_071_pulling_red_veil.png', 46.602, 47.228], // अपना
    ['s09_04', '/assets/paper/cast_radha/radha_045_stringing_flowers_into_gar.png', 47.229, 47.832], // बनाकर
    ['s09_05', '/assets/paper/cast_krishna/krishna_037_holding_bamboo_flute.png', 47.833, 48.459], // बनाकर
    ['s09_06', '/assets/paper/cast_radha/radha_088_stepping_backwards_looking.png', 48.46, 49.086], // छोड़
    ['s09_07', '/assets/paper/cast_krishna/krishna_075_silhouette_in_wind.png', 49.087, 49.69], // गए
    ['s09_08', '/assets/paper/cast_radha/radha_027_peeking_from_marble_archway.png', 49.691, 50.317], // आए
    ['s09_09', '/assets/paper/cast_radha/radha_006_kneeling_in_grief.png', 50.318, 50.944], // ना
    ['s09_10', '/assets/paper/cast_radha/radha_093_walking_forward_hesitantly.png', 50.945, 51.547], // ना
    ['s09_11', '/assets/paper/cast_krishna/krishna_043_playing_flute_on_paper.png', 51.548, 52.174], // सँवरिया
    ['s09_12', '/assets/paper/cast_krishna/krishna_045_pointing_flute_at_moon.png', 52.175, 52.801], // सँवरिया
    ['s09_13', '/assets/paper/cast_krishna/krishna_050_sitting_with_bamboo_flute.png', 52.802, 53.405], // सँवरिया
    ['s09_14', '/assets/paper/cast_radha/radha_004_curled_figure_hiding_grief.png', 53.406, 54.032], // बेदरदी
    ['s09_15', '/assets/paper/cast_krishna/krishna_033_crying_with_bamboo_flute.png', 54.033, 54.636], // बेदरदी
    ['s09_16', '/assets/paper/cast_radha/radha_096_weeping_in_sorrow.png', 54.637, 55.099], // बेदरदी
  ], SLOT_LEFT),

  // अंतराल — one quiet pose, no lyric
  s10_interlude_diya: beatCuts([
    ['s10_01', '/assets/paper/cast_radha/radha_021_radha_holding_earthen_diya_lamp.png', 55.1, 55.866],
    ['s10_02', '/assets/paper/cast_krishna/krishna_050_sitting_with_bamboo_flute.png', 55.867, 56.493],
    ['s10_03', '/assets/paper/cast_radha/radha_020_radha_gazing_at_full_moon.png', 56.494, 57.12],
    ['s10_04', '/assets/paper/cast_krishna/krishna_088_leaning_against_tree.png', 57.121, 57.724],
    ['s10_05', '/assets/paper/cast_radha/radha_075_sitting_alone_on_swing.png', 57.725, 58.199],
  ], SLOT_LEFT),

  // ==========================================
  // SHOT 11 (seg_08): 58.20s - 68.00s (Verse 1 - प्रीत करे दुख होए | Lyric lower-left)
  // 58.20–63.00: one Radha at a time, cut on the beat. Slots do not overlap.
  // Swap `src` to change a pose. 63.00–68.00 stays the second-half pair.
  // ==========================================
  s11_verse1_preet_dukh: [
    {
      id: 'v1_r1_jo_main',
      src: '/assets/paper/cast_radha/radha_007_listening_for_flute_melody.png',
      start: 58.20,
      end: 58.978, // beat 58.979
      opacity: 1.0,
      contrast: 1.15,
      brightness: 1.02,
      hardCut: true,
      enter: { type: 'cut', duration: 0 },
      exit: { type: 'cut', duration: 0 },
      living: { type: 'sway', amp: 0.6, period: 3.8 },
      position: { bottom: '1%', left: '3%', width: '40%' },
      motion: { scaleStart: 1.0, scaleEnd: 1.02, yStart: 1, yEnd: -1 },
      blend: 'normal',
      zIndex: 4,
    },
    {
      id: 'v1_r2_aiso',
      src: '/assets/paper/cast_radha/radha_072_resting_chin_on_hand.png',
      start: 58.979,
      end: 59.605, // beat 59.606
      opacity: 1.0,
      contrast: 1.15,
      brightness: 1.02,
      hardCut: true,
      enter: { type: 'cut', duration: 0 },
      exit: { type: 'cut', duration: 0 },
      living: { type: 'sway', amp: 0.5, period: 3.8 },
      position: { bottom: '1%', left: '3%', width: '40%' },
      motion: { scaleStart: 1.0, scaleEnd: 1.02, yStart: 1, yEnd: -1 },
      blend: 'normal',
      zIndex: 4,
    },
    {
      id: 'v1_r3_jaanti',
      src: '/assets/paper/cast_radha/radha_086_standing_with_crossed_arms.png',
      start: 59.606,
      end: 60.232, // beat 60.233
      opacity: 1.0,
      contrast: 1.15,
      brightness: 1.02,
      hardCut: true,
      enter: { type: 'cut', duration: 0 },
      exit: { type: 'cut', duration: 0 },
      living: { type: 'sway', amp: 0.45, period: 4.0 },
      position: { bottom: '1%', left: '3%', width: '40%' },
      motion: { scaleStart: 1.0, scaleEnd: 1.02, yStart: 1, yEnd: -1 },
      blend: 'normal',
      zIndex: 4,
    },
    {
      id: 'v1_r4_preet',
      src: '/assets/paper/cast_radha/radha_005_holding_flute_to_heart.png',
      start: 60.233,
      end: 60.835, // beat 60.836
      opacity: 1.0,
      contrast: 1.12,
      brightness: 1.03,
      hardCut: true,
      enter: { type: 'cut', duration: 0 },
      exit: { type: 'cut', duration: 0 },
      living: { type: 'pulse', amp: 0.012, period: 2.8 },
      position: { bottom: '1%', left: '3%', width: '40%' },
      motion: { scaleStart: 1.0, scaleEnd: 1.03, yStart: 1, yEnd: -1 },
      blend: 'normal',
      zIndex: 4,
    },
    {
      id: 'v1_r5_kare',
      src: '/assets/paper/cast_radha/radha_093_walking_forward_hesitantly.png',
      start: 60.836,
      end: 61.485, // beat 61.486
      opacity: 1.0,
      contrast: 1.15,
      brightness: 1.02,
      hardCut: true,
      enter: { type: 'cut', duration: 0 },
      exit: { type: 'cut', duration: 0 },
      living: { type: 'sway', amp: 0.7, period: 3.6 },
      position: { bottom: '1%', left: '3%', width: '40%' },
      motion: { scaleStart: 1.0, scaleEnd: 1.02, xStart: 2, xEnd: -1 },
      blend: 'normal',
      zIndex: 4,
    },
    {
      id: 'v1_r6_dukh',
      src: '/assets/paper/cast_radha/radha_096_weeping_in_sorrow.png',
      start: 61.486,
      end: 62.112, // beat 62.113
      opacity: 1.0,
      contrast: 1.16,
      brightness: 1.0,
      hardCut: true,
      enter: { type: 'cut', duration: 0 },
      exit: { type: 'cut', duration: 0 },
      living: { type: 'sway', amp: 0.4, period: 3.4 },
      position: { bottom: '1%', left: '3%', width: '40%' },
      motion: { scaleStart: 1.01, scaleEnd: 1.03, yStart: 1, yEnd: -1 },
      blend: 'normal',
      zIndex: 4,
    },
    {
      id: 'v1_r7_hoe',
      src: '/assets/paper/cast_radha/radha_076_sitting_hugging_midriff.png',
      start: 62.113,
      end: 62.999,
      opacity: 1.0,
      contrast: 1.14,
      brightness: 1.0,
      hardCut: true,
      enter: { type: 'cut', duration: 0 },
      exit: { type: 'cut', duration: 0 },
      living: { type: 'sway', amp: 0.35, period: 4.2 },
      position: { bottom: '1%', left: '3%', width: '40%' },
      motion: { scaleStart: 1.0, scaleEnd: 1.02, yStart: 1, yEnd: -1 },
      blend: 'normal',
      zIndex: 4,
    },
    // अंतरा १ दोहराव — जो मैं ऐसो जानती. Beat cut, one figure, no overlap. Swap src to change the pose.
    ...beatCuts([
    ['s11b_01', '/assets/paper/cast_radha/radha_026_radha_looking_back_over_shoulder.png', 63, 63.389], // जो
    ['s11b_02', '/assets/paper/cast_radha/radha_010_standing_in_quiet_dignity.png', 63.39, 64.04], // मैं
    ['s11b_03', '/assets/paper/cast_radha/radha_037_radha_seated_looking_at_foot.png', 64.041, 64.667], // ऐसो
    ['s11b_04', '/assets/paper/cast_radha/radha_010_standing_in_quiet_dignity.png', 64.668, 65.294], // जानती
    ['s11b_05', '/assets/paper/cast_radha/radha_066_holding_flute_at_riverbank.png', 65.295, 65.92], // प्रीत
    ['s11b_06', '/assets/paper/cast_radha/radha_052_radha_walking_with_sorrowful_steps.png', 65.921, 66.571], // करे
    ['s11b_07', '/assets/paper/cast_radha/radha_095_weeping_against_pillar.png', 66.572, 67.198], // दुख
    ['s11b_08', '/assets/paper/cast_radha/radha_055_resting_on_stairs.png', 67.199, 67.824], // होए
    ['s11b_09', '/assets/paper/cast_radha/radha_008_prostrate_on_beige_paper.png', 67.825, 67.999], // होए
    ], SLOT_LEFT),
  ],

  // नगर ढिंढोरा पीटती
  s12_verse1_dindora: beatCuts([
    ['s12_01', '/assets/paper/cast_radha/radha_090_striding_forward_holding_veil.png', 68, 68.451], // नगर
    ['s12_02', '/assets/paper/cast_radha/radha_028_pointing_into_distance.png', 68.452, 69.078], // नगर
    ['s12_03', '/assets/paper/cast_radha/radha_090_striding_forward_holding_veil.png', 69.079, 69.705], // ढिंढोरा
    ['s12_04', '/assets/paper/cast_radha/radha_003_classical_dancer_posing_on_paper.png', 69.706, 70.355], // पीटती
    ['s12_05', '/assets/paper/cast_radha/radha_090_striding_forward_holding_veil.png', 70.356, 70.959], // पीटती
    ['s12_06', '/assets/paper/cast_radha/radha_086_standing_with_crossed_arms.png', 70.96, 71.609], // ना
    ['s12_07', '/assets/paper/cast_radha/radha_085_standing_pulling_shawl.png', 71.61, 72.236], // करियो
    ['s12_08', '/assets/paper/cast_radha/radha_028_pointing_into_distance.png', 72.237, 72.863], // कोए
    ['s12_09', '/assets/paper/cast_radha/radha_053_walking_with_urgent_footsteps.png', 72.864, 73.49], // नगर
    ['s12_10', '/assets/paper/cast_radha/radha_044_radha_standing_with_open_arms.png', 73.491, 74.14], // ढिंढोरा
    ['s12_11', '/assets/paper/cast_radha/radha_071_pulling_red_veil.png', 74.141, 74.767], // ढिंढोरा
    ['s12_12', '/assets/paper/cast_radha/radha_049_radha_twirling_in_joyful_circles.png', 74.768, 75.394], // पीटती
    ['s12_13', '/assets/paper/cast_radha/radha_032_reaching_outward_in_longing.png', 75.395, 76.021], // प्रीत
    ['s12_14', '/assets/paper/cast_radha/radha_088_stepping_backwards_looking.png', 76.022, 76.648], // ना
    ['s12_15', '/assets/paper/cast_radha/radha_009_standing_in_prayer_position.png', 76.649, 77.275], // करियो
    ['s12_16', '/assets/paper/cast_radha/radha_044_radha_standing_with_open_arms.png', 77.276, 77.925], // कोए
    ['s12_17', '/assets/paper/cast_radha/radha_040_radha_silhouette_facing_sunset.png', 77.926, 78.529], // कोए
    ['s12_18', '/assets/paper/cast_radha/radha_028_pointing_into_distance.png', 78.53, 78.799], // कोए
  ], SLOT_LEFT),

  // मुझे प्रेमी बनाकर
  s13_chorus_premi_1: beatCuts([
    ['s13_01', '/assets/paper/cast_radha/radha_007_listening_for_flute_melody.png', 78.8, 79.179], // मुझे
    ['s13_02', '/assets/paper/cast_radha/radha_032_reaching_outward_in_longing.png', 79.18, 79.829], // मुझे
    ['s13_03', '/assets/paper/cast_radha/radha_005_holding_flute_to_heart.png', 79.83, 80.456], // प्रेमी
    ['s13_04', '/assets/paper/cast_krishna/krishna_043_playing_flute_on_paper.png', 80.457, 81.083], // प्रेमी
    ['s13_05', '/assets/paper/cast_krishna/krishna_037_holding_bamboo_flute.png', 81.084, 81.71], // बनाकर
    ['s13_06', '/assets/paper/cast_radha/radha_012_hands_holding_red_thread.png', 81.711, 82.314], // बनाकर
    ['s13_07', '/assets/paper/cast_krishna/krishna_055_walking_away_on_paper.png', 82.315, 82.941], // छोड़
    ['s13_08', '/assets/paper/cast_krishna/krishna_075_silhouette_in_wind.png', 82.942, 83.568], // गए
    ['s13_09', '/assets/paper/cast_radha/radha_007_listening_for_flute_melody.png', 83.569, 84.195], // आए
    ['s13_10', '/assets/paper/cast_radha/radha_084_standing_in_shock.png', 84.196, 84.821], // ना
    ['s13_11', '/assets/paper/cast_radha/radha_006_kneeling_in_grief.png', 84.822, 85.472], // ना
    ['s13_12', '/assets/paper/cast_krishna/krishna_090_playing_flute.png', 85.473, 86.075], // सँवरिया
    ['s13_13', '/assets/paper/cast_krishna/krishna_043_playing_flute_on_paper.png', 86.076, 86.702], // सँवरिया
    ['s13_14', '/assets/paper/cast_krishna/krishna_033_crying_with_bamboo_flute.png', 86.703, 87.329], // बेदरदी
    ['s13_15', '/assets/paper/cast_radha/radha_096_weeping_in_sorrow.png', 87.33, 87.979], // बेदरदी
    ['s13_16', '/assets/paper/cast_krishna/krishna_076_sitting_in_sorrow.png', 87.98, 88.599], // बेदरदी
  ], SLOT_LEFT),

  // मुझे प्रेमी बनाकर २
  s14_chorus_premi_2: beatCuts([
    ['s14_01', '/assets/paper/cast_radha/radha_072_resting_chin_on_hand.png', 88.6, 89.21], // मुझे
    ['s14_02', '/assets/paper/cast_radha/radha_030_radha_portrait_with_tear_falling.png', 89.211, 89.86], // मुझे
    ['s14_03', '/assets/paper/cast_radha/radha_066_holding_flute_at_riverbank.png', 89.861, 90.487], // प्रेमी
    ['s14_04', '/assets/paper/cast_krishna/krishna_081_standing_with_bansuri.png', 90.488, 91.114], // बनाकर
    ['s14_05', '/assets/paper/cast_radha/radha_045_stringing_flowers_into_gar.png', 91.115, 91.741], // बनाकर
    ['s14_06', '/assets/paper/cast_krishna/krishna_026_turning_away_with_flute.png', 91.742, 92.368], // छोड़
    ['s14_07', '/assets/paper/cast_krishna/krishna_054_turning_into_wind.png', 92.369, 92.995], // गए
    ['s14_08', '/assets/paper/cast_krishna/krishna_086_walking_with_flute.png', 92.996, 93.622], // गए
    ['s14_09', '/assets/paper/cast_radha/radha_028_pointing_into_distance.png', 93.623, 94.249], // आए
    ['s14_10', '/assets/paper/cast_radha/radha_086_standing_with_crossed_arms.png', 94.25, 94.876], // ना
    ['s14_11', '/assets/paper/cast_krishna/krishna_086_walking_with_flute.png', 94.877, 95.503], // सँवरिया
    ['s14_12', '/assets/paper/cast_krishna/krishna_045_pointing_flute_at_moon.png', 95.504, 96.13], // सँवरिया
    ['s14_13', '/assets/paper/cast_krishna/krishna_090_playing_flute.png', 96.131, 96.757], // सँवरिया
    ['s14_14', '/assets/paper/cast_radha/radha_095_weeping_against_pillar.png', 96.758, 97.383], // बेदरदी
    ['s14_15', '/assets/paper/cast_krishna/krishna_033_crying_with_bamboo_flute.png', 97.384, 98.01], // बेदरदी
    ['s14_16', '/assets/paper/cast_radha/radha_096_weeping_in_sorrow.png', 98.011, 98.614], // बेदरदी
    ['s14_17', '/assets/paper/cast_krishna/krishna_076_sitting_in_sorrow.png', 98.615, 98.799], // बेदरदी
  ], SLOT_LEFT),

  // मुझे अपना बनाकर
  s15_chorus_apna_3: beatCuts([
    ['s15_01', '/assets/paper/cast_radha/radha_007_listening_for_flute_melody.png', 98.8, 99.218], // मुझे
    ['s15_02', '/assets/paper/cast_radha/radha_032_reaching_outward_in_longing.png', 99.219, 99.845], // मुझे
    ['s15_03', '/assets/paper/cast_radha/radha_071_pulling_red_veil.png', 99.846, 100.472], // अपना
    ['s15_04', '/assets/paper/cast_krishna/krishna_037_holding_bamboo_flute.png', 100.473, 101.099], // बनाकर
    ['s15_05', '/assets/paper/cast_radha/radha_012_hands_holding_red_thread.png', 101.1, 101.726], // बनाकर
    ['s15_06', '/assets/paper/cast_krishna/krishna_042_looking_back_with_sorrow.png', 101.727, 102.353], // छोड़
    ['s15_07', '/assets/paper/cast_krishna/krishna_055_walking_away_on_paper.png', 102.354, 102.979], // गए
    ['s15_08', '/assets/paper/cast_krishna/krishna_075_silhouette_in_wind.png', 102.98, 103.606], // गए
    ['s15_09', '/assets/paper/cast_radha/radha_020_radha_gazing_at_full_moon.png', 103.607, 104.21], // आए
    ['s15_10', '/assets/paper/cast_radha/radha_088_stepping_backwards_looking.png', 104.211, 104.837], // ना
    ['s15_11', '/assets/paper/cast_krishna/krishna_043_playing_flute_on_paper.png', 104.838, 105.464], // सँवरिया
    ['s15_12', '/assets/paper/cast_krishna/krishna_086_walking_with_flute.png', 105.465, 106.091], // सँवरिया
    ['s15_13', '/assets/paper/cast_krishna/krishna_045_pointing_flute_at_moon.png', 106.092, 106.718], // सँवरिया
    ['s15_14', '/assets/paper/cast_radha/radha_095_weeping_against_pillar.png', 106.719, 107.345], // बेदरदी
    ['s15_15', '/assets/paper/cast_krishna/krishna_033_crying_with_bamboo_flute.png', 107.346, 107.972], // बेदरदी
    ['s15_16', '/assets/paper/cast_radha/radha_096_weeping_in_sorrow.png', 107.973, 108.599], // बेदरदी
    ['s15_17', '/assets/paper/cast_krishna/krishna_076_sitting_in_sorrow.png', 108.6, 108.799], // बेदरदी
  ], SLOT_LEFT),

  // मुझे अपना बनाकर — lyric left, figure right
  s16_chorus_apna_4: beatCuts([
    ['s16_01', '/assets/paper/cast_radha/radha_072_resting_chin_on_hand.png', 108.8, 109.226], // मुझे
    ['s16_02', '/assets/paper/cast_radha/radha_030_radha_portrait_with_tear_falling.png', 109.227, 109.853], // मुझे
    ['s16_03', '/assets/paper/cast_radha/radha_092_tying_red_thread_on.png', 109.854, 110.48], // अपना
    ['s16_04', '/assets/paper/cast_krishna/krishna_081_standing_with_bansuri.png', 110.481, 111.083], // बनाकर
    ['s16_05', '/assets/paper/cast_radha/radha_045_stringing_flowers_into_gar.png', 111.084, 111.71], // बनाकर
    ['s16_06', '/assets/paper/cast_radha/radha_088_stepping_backwards_looking.png', 111.711, 112.337], // छोड़
    ['s16_07', '/assets/paper/cast_krishna/krishna_054_turning_into_wind.png', 112.338, 112.964], // गए
    ['s16_08', '/assets/paper/cast_krishna/krishna_086_walking_with_flute.png', 112.965, 113.591], // गए
    ['s16_09', '/assets/paper/cast_krishna/krishna_020_silhouette_looking_ove.png', 113.592, 114.218], // आए
    ['s16_10', '/assets/paper/cast_radha/radha_084_standing_in_shock.png', 114.219, 114.845], // ना
    ['s16_11', '/assets/paper/cast_krishna/krishna_090_playing_flute.png', 114.846, 115.472], // सँवरिया
    ['s16_12', '/assets/paper/cast_krishna/krishna_043_playing_flute_on_paper.png', 115.473, 116.099], // सँवरिया
    ['s16_13', '/assets/paper/cast_krishna/krishna_086_walking_with_flute.png', 116.1, 116.726], // सँवरिया
    ['s16_14', '/assets/paper/cast_radha/radha_095_weeping_against_pillar.png', 116.727, 117.353], // बेदरदी
    ['s16_15', '/assets/paper/cast_krishna/krishna_033_crying_with_bamboo_flute.png', 117.354, 117.956], // बेदरदी
    ['s16_16', '/assets/paper/cast_radha/radha_096_weeping_in_sorrow.png', 117.957, 118.583], // बेदरदी
    ['s16_17', '/assets/paper/cast_krishna/krishna_076_sitting_in_sorrow.png', 118.584, 118.799], // बेदरदी
  ], SLOT_RIGHT),

  // अंतराल
  s17_interlude_braj_cow: beatCuts([
    ['s17_01', '/assets/paper/cast_radha/radha_021_radha_holding_earthen_diya_lamp.png', 118.8, 119.233],
    ['s17_02', '/assets/paper/cast_krishna/krishna_050_sitting_with_bamboo_flute.png', 119.234, 119.837],
    ['s17_03', '/assets/paper/cast_radha/radha_020_radha_gazing_at_full_moon.png', 119.838, 120.464],
    ['s17_04', '/assets/paper/cast_krishna/krishna_088_leaning_against_tree.png', 120.465, 121.091],
    ['s17_05', '/assets/paper/cast_radha/radha_075_sitting_alone_on_swing.png', 121.092, 121.718],
    ['s17_06', '/assets/paper/cast_krishna/krishna_070_meditating_in_padmasana.png', 121.719, 121.999],
  ], SLOT_LEFT),

  // रहिमन धागा प्रेम का — lyric left, figure right
  s18_verse2_dhaga_prem: beatCuts([
    ['s18_01', '/assets/paper/cast_radha/radha_009_standing_in_prayer_position.png', 122, 122.345], // रहिमन
    ['s18_02', '/assets/paper/cast_radha/radha_070_praying_with_clasped_hands.png', 122.346, 122.972], // रहिमन
    ['s18_03', '/assets/paper/cast_radha/radha_012_hands_holding_red_thread.png', 122.973, 123.599], // धागा
    ['s18_04', '/assets/paper/cast_radha/radha_005_holding_flute_to_heart.png', 123.6, 124.249], // प्रेम
    ['s18_05', '/assets/paper/cast_radha/radha_063_holding_broken_red_thread.png', 124.25, 124.876], // का
    ['s18_06', '/assets/paper/cast_radha/radha_086_standing_with_crossed_arms.png', 124.877, 125.503], // मत
    ['s18_07', '/assets/paper/cast_radha/radha_063_holding_broken_red_thread.png', 125.504, 126.13], // तोड़ो
    ['s18_08', '/assets/paper/cast_radha/radha_004_curled_figure_hiding_grief.png', 126.131, 126.78], // चटकाए
    ['s18_09', '/assets/paper/cast_radha/radha_097_writing_on_parchment_roll.png', 126.781, 127.407], // रहिमन
    ['s18_10', '/assets/paper/cast_radha/radha_009_standing_in_prayer_position.png', 127.408, 128.034], // रहिमन
    ['s18_11', '/assets/paper/cast_radha/radha_092_tying_red_thread_on.png', 128.035, 128.661], // धागा
    ['s18_12', '/assets/paper/cast_radha/radha_032_reaching_outward_in_longing.png', 128.662, 129.311], // प्रेम
    ['s18_13', '/assets/paper/cast_radha/radha_012_hands_holding_red_thread.png', 129.312, 129.938], // का
    ['s18_14', '/assets/paper/cast_radha/radha_085_standing_pulling_shawl.png', 129.939, 130.565], // मत
    ['s18_15', '/assets/paper/cast_radha/radha_084_standing_in_shock.png', 130.566, 131.192], // तोड़ो
    ['s18_16', '/assets/paper/cast_radha/radha_059_embracing_tree_and_weeping.png', 131.193, 131.819], // चटकाए
    ['s18_17', '/assets/paper/cast_radha/radha_063_holding_broken_red_thread.png', 131.82, 131.999], // चटकाए
  ], SLOT_RIGHT),

  // टूटे से फिर ना जुड़े
  s19_verse2_toote_ganth: beatCuts([
    ['s19_01', '/assets/paper/cast_radha/radha_006_kneeling_in_grief.png', 132, 132.446], // टूटे
    ['s19_02', '/assets/paper/cast_radha/radha_076_sitting_hugging_midriff.png', 132.447, 133.096], // से
    ['s19_03', '/assets/paper/cast_radha/radha_026_radha_looking_back_over_shoulder.png', 133.097, 133.723], // फिर
    ['s19_04', '/assets/paper/cast_radha/radha_006_kneeling_in_grief.png', 133.724, 134.35], // ना
    ['s19_05', '/assets/paper/cast_radha/radha_092_tying_red_thread_on.png', 134.351, 134.977], // जुड़े
    ['s19_06', '/assets/paper/cast_radha/radha_012_hands_holding_red_thread.png', 134.978, 135.604], // जुड़े
    ['s19_07', '/assets/paper/cast_radha/radha_092_tying_red_thread_on.png', 135.605, 136.23], // गाँठ
    ['s19_08', '/assets/paper/cast_radha/radha_040_radha_silhouette_facing_sunset.png', 136.231, 136.881], // जाए
    ['s19_09', '/assets/paper/cast_radha/radha_095_weeping_against_pillar.png', 136.882, 137.508], // टूटे
    ['s19_10', '/assets/paper/cast_radha/radha_055_resting_on_stairs.png', 137.509, 138.135], // से
    ['s19_11', '/assets/paper/cast_radha/radha_088_stepping_backwards_looking.png', 138.136, 138.761], // फिर
    ['s19_12', '/assets/paper/cast_radha/radha_086_standing_with_crossed_arms.png', 138.762, 139.412], // ना
    ['s19_13', '/assets/paper/cast_radha/radha_070_praying_with_clasped_hands.png', 139.413, 140.015], // जुड़े
    ['s19_14', '/assets/paper/cast_radha/radha_092_tying_red_thread_on.png', 140.016, 140.665], // जुड़े
    ['s19_15', '/assets/paper/cast_radha/radha_063_holding_broken_red_thread.png', 140.666, 141.292], // गाँठ
    ['s19_16', '/assets/paper/cast_radha/radha_008_prostrate_on_beige_paper.png', 141.293, 141.919], // जाए
    ['s19_17', '/assets/paper/cast_krishna/krishna_055_walking_away_on_paper.png', 141.92, 142.399], // जाए
  ], SLOT_LEFT),

  // गठबंधन बनाकर
  s20_chorus_gathbandhan_1: beatCuts([
    ['s20_01', '/assets/paper/cast_radha/radha_040_radha_silhouette_facing_sunset.png', 142.4, 142.523], // जाए
    ['s20_02', '/assets/paper/cast_radha/radha_092_tying_red_thread_on.png', 142.524, 143.196], // गठबंधन
    ['s20_03', '/assets/paper/cast_radha/radha_012_hands_holding_red_thread.png', 143.197, 143.823], // गठबंधन
    ['s20_04', '/assets/paper/cast_krishna/krishna_038_holding_garland.png', 143.824, 144.45], // गठबंधन
    ['s20_05', '/assets/paper/cast_krishna/krishna_037_holding_bamboo_flute.png', 144.451, 145.077], // बनाकर
    ['s20_06', '/assets/paper/cast_radha/radha_012_hands_holding_red_thread.png', 145.078, 145.681], // बनाकर
    ['s20_07', '/assets/paper/cast_krishna/krishna_055_walking_away_on_paper.png', 145.682, 146.308], // छोड़
    ['s20_08', '/assets/paper/cast_krishna/krishna_075_silhouette_in_wind.png', 146.309, 146.958], // गए
    ['s20_09', '/assets/paper/cast_krishna/krishna_054_turning_into_wind.png', 146.959, 147.585], // गए
    ['s20_10', '/assets/paper/cast_radha/radha_007_listening_for_flute_melody.png', 147.586, 148.212], // आए
    ['s20_11', '/assets/paper/cast_radha/radha_088_stepping_backwards_looking.png', 148.213, 148.839], // ना
    ['s20_12', '/assets/paper/cast_krishna/krishna_045_pointing_flute_at_moon.png', 148.84, 149.466], // सँवरिया
    ['s20_13', '/assets/paper/cast_krishna/krishna_090_playing_flute.png', 149.467, 150.093], // सँवरिया
    ['s20_14', '/assets/paper/cast_krishna/krishna_043_playing_flute_on_paper.png', 150.094, 150.72], // सँवरिया
    ['s20_15', '/assets/paper/cast_radha/radha_095_weeping_against_pillar.png', 150.721, 151.347], // बेदरदी
    ['s20_16', '/assets/paper/cast_krishna/krishna_033_crying_with_bamboo_flute.png', 151.348, 151.974], // बेदरदी
    ['s20_17', '/assets/paper/cast_radha/radha_096_weeping_in_sorrow.png', 151.975, 152.601], // बेदरदी
    ['s20_18', '/assets/paper/cast_krishna/krishna_076_sitting_in_sorrow.png', 152.602, 152.799], // बेदरदी
  ], SLOT_LEFT),

  // गठबंधन बनाकर २ — lyric left, figure right
  s21_chorus_gathbandhan_2: beatCuts([
    ['s21_01', '/assets/paper/cast_radha/radha_092_tying_red_thread_on.png', 152.8, 153.227], // गठबंधन
    ['s21_02', '/assets/paper/cast_radha/radha_012_hands_holding_red_thread.png', 153.228, 153.854], // गठबंधन
    ['s21_03', '/assets/paper/cast_krishna/krishna_038_holding_garland.png', 153.855, 154.505], // गठबंधन
    ['s21_04', '/assets/paper/cast_krishna/krishna_081_standing_with_bansuri.png', 154.506, 155.108], // बनाकर
    ['s21_05', '/assets/paper/cast_radha/radha_045_stringing_flowers_into_gar.png', 155.109, 155.758], // बनाकर
    ['s21_06', '/assets/paper/cast_krishna/krishna_026_turning_away_with_flute.png', 155.759, 156.385], // छोड़
    ['s21_07', '/assets/paper/cast_krishna/krishna_086_walking_with_flute.png', 156.386, 157.012], // गए
    ['s21_08', '/assets/paper/cast_radha/radha_028_pointing_into_distance.png', 157.013, 157.639], // आए
    ['s21_09', '/assets/paper/cast_radha/radha_020_radha_gazing_at_full_moon.png', 157.64, 158.266], // आए
    ['s21_10', '/assets/paper/cast_radha/radha_084_standing_in_shock.png', 158.267, 158.893], // ना
    ['s21_11', '/assets/paper/cast_krishna/krishna_086_walking_with_flute.png', 158.894, 159.52], // सँवरिया
    ['s21_12', '/assets/paper/cast_krishna/krishna_045_pointing_flute_at_moon.png', 159.521, 160.147], // सँवरिया
    ['s21_13', '/assets/paper/cast_krishna/krishna_090_playing_flute.png', 160.148, 160.774], // सँवरिया
    ['s21_14', '/assets/paper/cast_radha/radha_095_weeping_against_pillar.png', 160.775, 161.424], // बेदरदी
    ['s21_15', '/assets/paper/cast_krishna/krishna_033_crying_with_bamboo_flute.png', 161.425, 162.028], // बेदरदी
    ['s21_16', '/assets/paper/cast_radha/radha_096_weeping_in_sorrow.png', 162.029, 162.655], // बेदरदी
    ['s21_17', '/assets/paper/cast_krishna/krishna_076_sitting_in_sorrow.png', 162.656, 162.999], // बेदरदी
  ], SLOT_RIGHT),

  // मुझे अपना बनाकर
  s22_chorus_apna_5: beatCuts([
    ['s22_01', '/assets/paper/cast_radha/radha_007_listening_for_flute_melody.png', 163, 163.282], // मुझे
    ['s22_02', '/assets/paper/cast_radha/radha_032_reaching_outward_in_longing.png', 163.283, 163.885], // मुझे
    ['s22_03', '/assets/paper/cast_radha/radha_044_radha_standing_with_open_arms.png', 163.886, 164.512], // अपना
    ['s22_04', '/assets/paper/cast_krishna/krishna_046_reaching_out_in_yearning.png', 164.513, 165.139], // अपना
    ['s22_05', '/assets/paper/cast_krishna/krishna_037_holding_bamboo_flute.png', 165.14, 165.766], // बनाकर
    ['s22_06', '/assets/paper/cast_radha/radha_012_hands_holding_red_thread.png', 165.767, 166.37], // बनाकर
    ['s22_07', '/assets/paper/cast_krishna/krishna_042_looking_back_with_sorrow.png', 166.371, 167.02], // छोड़
    ['s22_08', '/assets/paper/cast_krishna/krishna_055_walking_away_on_paper.png', 167.021, 167.647], // गए
    ['s22_09', '/assets/paper/cast_krishna/krishna_020_silhouette_looking_ove.png', 167.648, 168.274], // आए
    ['s22_10', '/assets/paper/cast_radha/radha_006_kneeling_in_grief.png', 168.275, 168.901], // ना
    ['s22_11', '/assets/paper/cast_krishna/krishna_043_playing_flute_on_paper.png', 168.902, 169.505], // सँवरिया
    ['s22_12', '/assets/paper/cast_krishna/krishna_086_walking_with_flute.png', 169.506, 170.132], // सँवरिया
    ['s22_13', '/assets/paper/cast_krishna/krishna_045_pointing_flute_at_moon.png', 170.133, 170.759], // सँवरिया
    ['s22_14', '/assets/paper/cast_radha/radha_095_weeping_against_pillar.png', 170.76, 171.385], // बेदरदी
    ['s22_15', '/assets/paper/cast_krishna/krishna_033_crying_with_bamboo_flute.png', 171.386, 172.012], // बेदरदी
    ['s22_16', '/assets/paper/cast_radha/radha_096_weeping_in_sorrow.png', 172.013, 172.639], // बेदरदी
    ['s22_17', '/assets/paper/cast_krishna/krishna_076_sitting_in_sorrow.png', 172.64, 172.999], // बेदरदी
  ], SLOT_LEFT),

  // मुझे अपना बनाकर
  s23_chorus_apna_6: beatCuts([
    ['s23_01', '/assets/paper/cast_radha/radha_072_resting_chin_on_hand.png', 173, 173.266], // मुझे
    ['s23_02', '/assets/paper/cast_radha/radha_030_radha_portrait_with_tear_falling.png', 173.267, 173.893], // मुझे
    ['s23_03', '/assets/paper/cast_radha/radha_071_pulling_red_veil.png', 173.894, 174.52], // अपना
    ['s23_04', '/assets/paper/cast_radha/radha_092_tying_red_thread_on.png', 174.521, 175.147], // अपना
    ['s23_05', '/assets/paper/cast_krishna/krishna_081_standing_with_bansuri.png', 175.148, 175.774], // बनाकर
    ['s23_06', '/assets/paper/cast_radha/radha_045_stringing_flowers_into_gar.png', 175.775, 176.401], // बनाकर
    ['s23_07', '/assets/paper/cast_radha/radha_088_stepping_backwards_looking.png', 176.402, 177.028], // छोड़
    ['s23_08', '/assets/paper/cast_krishna/krishna_075_silhouette_in_wind.png', 177.029, 177.655], // गए
    ['s23_09', '/assets/paper/cast_radha/radha_007_listening_for_flute_melody.png', 177.656, 178.282], // आए
    ['s23_10', '/assets/paper/cast_radha/radha_086_standing_with_crossed_arms.png', 178.283, 178.909], // ना
    ['s23_11', '/assets/paper/cast_krishna/krishna_090_playing_flute.png', 178.91, 179.536], // सँवरिया
    ['s23_12', '/assets/paper/cast_krishna/krishna_043_playing_flute_on_paper.png', 179.537, 180.139], // सँवरिया
    ['s23_13', '/assets/paper/cast_krishna/krishna_086_walking_with_flute.png', 180.14, 180.766], // सँवरिया
    ['s23_14', '/assets/paper/cast_radha/radha_095_weeping_against_pillar.png', 180.767, 181.393], // बेदरदी
    ['s23_15', '/assets/paper/cast_krishna/krishna_033_crying_with_bamboo_flute.png', 181.394, 182.02], // बेदरदी
    ['s23_16', '/assets/paper/cast_radha/radha_096_weeping_in_sorrow.png', 182.021, 182.647], // बेदरदी
    ['s23_17', '/assets/paper/cast_krishna/krishna_076_sitting_in_sorrow.png', 182.648, 183.297], // बेदरदी
    ['s23_18', '/assets/paper/cast_radha/radha_095_weeping_against_pillar.png', 183.298, 183.399], // बेदरदी
  ], SLOT_LEFT),

  // लकड़ी जल कोयला भई
  s24_verse3_lakdi_jal_koyla: beatCuts([
    ['s24_01', '/assets/paper/cast_radha/radha_021_radha_holding_earthen_diya_lamp.png', 183.4, 183.924], // लकड़ी
    ['s24_02', '/assets/paper/cast_radha/radha_074_shielding_earthen_lamp_flame.png', 183.925, 184.551], // जल
    ['s24_03', '/assets/paper/cast_radha/radha_021_radha_holding_earthen_diya_lamp.png', 184.552, 185.178], // जल
    ['s24_04', '/assets/paper/cast_radha/radha_004_curled_figure_hiding_grief.png', 185.179, 185.828], // कोयला
    ['s24_05', '/assets/paper/cast_radha/radha_040_radha_silhouette_facing_sunset.png', 185.829, 186.455], // भई
    ['s24_06', '/assets/paper/cast_radha/radha_069_lying_on_ground.png', 186.456, 187.082], // कोयला
    ['s24_07', '/assets/paper/cast_radha/radha_019_radha_catching_monsoon_rain.png', 187.083, 187.732], // जल
    ['s24_08', '/assets/paper/cast_radha/radha_084_standing_in_shock.png', 187.733, 188.359], // भई
    ['s24_09', '/assets/paper/cast_radha/radha_074_shielding_earthen_lamp_flame.png', 188.36, 188.986], // लकड़ी
    ['s24_10', '/assets/paper/cast_radha/radha_021_radha_holding_earthen_diya_lamp.png', 188.987, 189.613], // जल
    ['s24_11', '/assets/paper/cast_radha/radha_019_radha_catching_monsoon_rain.png', 189.614, 190.263], // जल
    ['s24_12', '/assets/paper/cast_radha/radha_008_prostrate_on_beige_paper.png', 190.264, 190.89], // कोयला
    ['s24_13', '/assets/paper/cast_radha/radha_055_resting_on_stairs.png', 190.891, 191.517], // भई
    ['s24_14', '/assets/paper/cast_radha/radha_004_curled_figure_hiding_grief.png', 191.518, 192.144], // कोयला
    ['s24_15', '/assets/paper/cast_radha/radha_074_shielding_earthen_lamp_flame.png', 192.145, 192.794], // जल
    ['s24_16', '/assets/paper/cast_radha/radha_040_radha_silhouette_facing_sunset.png', 192.795, 193.421], // भई
    ['s24_17', '/assets/paper/cast_radha/radha_008_prostrate_on_beige_paper.png', 193.422, 193.599], // राख
  ], SLOT_LEFT),

  // मैं पापिन ऐसी जली — lyric bottom, figure top-left
  s25_verse3_papin_aisi_jali: beatCuts([
    ['s25_01', '/assets/paper/cast_radha/radha_009_standing_in_prayer_position.png', 193.6, 194.048], // मैं
    ['s25_02', '/assets/paper/cast_radha/radha_006_kneeling_in_grief.png', 194.049, 194.698], // पापिन
    ['s25_03', '/assets/paper/cast_radha/radha_095_weeping_against_pillar.png', 194.699, 195.325], // पापिन
    ['s25_04', '/assets/paper/cast_radha/radha_084_standing_in_shock.png', 195.326, 195.952], // ऐसी
    ['s25_05', '/assets/paper/cast_radha/radha_074_shielding_earthen_lamp_flame.png', 195.953, 196.579], // जली
    ['s25_06', '/assets/paper/cast_radha/radha_088_stepping_backwards_looking.png', 196.58, 197.206], // ना
    ['s25_07', '/assets/paper/cast_radha/radha_069_lying_on_ground.png', 197.207, 197.833], // कोयला
    ['s25_08', '/assets/paper/cast_radha/radha_010_standing_in_quiet_dignity.png', 197.834, 198.483], // बनी
    ['s25_09', '/assets/paper/cast_radha/radha_069_lying_on_ground.png', 198.484, 199.11], // राख
    ['s25_10', '/assets/paper/cast_radha/radha_007_listening_for_flute_melody.png', 199.111, 199.737], // मैं
    ['s25_11', '/assets/paper/cast_radha/radha_008_prostrate_on_beige_paper.png', 199.738, 200.364], // पापिन
    ['s25_12', '/assets/paper/cast_radha/radha_030_radha_portrait_with_tear_falling.png', 200.365, 201.014], // ऐसी
    ['s25_13', '/assets/paper/cast_radha/radha_059_embracing_tree_and_weeping.png', 201.015, 201.641], // जली
    ['s25_14', '/assets/paper/cast_radha/radha_084_standing_in_shock.png', 201.642, 202.268], // ना
    ['s25_15', '/assets/paper/cast_radha/radha_008_prostrate_on_beige_paper.png', 202.269, 202.895], // कोयला
    ['s25_16', '/assets/paper/cast_radha/radha_040_radha_silhouette_facing_sunset.png', 202.896, 203.522], // बनी
    ['s25_17', '/assets/paper/cast_radha/radha_006_kneeling_in_grief.png', 203.523, 204.199], // ना
  ], SLOT_TOP_LEFT),

  // मुझे जलती चिता में
  s26_chorus_jalti_chita_1: beatCuts([
    ['s26_01', '/assets/paper/cast_radha/radha_007_listening_for_flute_melody.png', 204.2, 204.776], // मुझे
    ['s26_02', '/assets/paper/cast_radha/radha_032_reaching_outward_in_longing.png', 204.777, 205.403], // मुझे
    ['s26_03', '/assets/paper/cast_radha/radha_021_radha_holding_earthen_diya_lamp.png', 205.404, 206.03], // जलती
    ['s26_04', '/assets/paper/cast_radha/radha_074_shielding_earthen_lamp_flame.png', 206.031, 206.657], // जलती
    ['s26_05', '/assets/paper/cast_radha/radha_004_curled_figure_hiding_grief.png', 206.658, 207.284], // चिता
    ['s26_06', '/assets/paper/cast_radha/radha_076_sitting_hugging_midriff.png', 207.285, 207.887], // में
    ['s26_07', '/assets/paper/cast_krishna/krishna_055_walking_away_on_paper.png', 207.888, 208.514], // छोड़
    ['s26_08', '/assets/paper/cast_krishna/krishna_054_turning_into_wind.png', 208.515, 209.164], // गए
    ['s26_09', '/assets/paper/cast_krishna/krishna_086_walking_with_flute.png', 209.165, 209.815], // गए
    ['s26_10', '/assets/paper/cast_radha/radha_028_pointing_into_distance.png', 209.816, 210.395], // आए
    ['s26_11', '/assets/paper/cast_radha/radha_086_standing_with_crossed_arms.png', 210.396, 211.022], // ना
    ['s26_12', '/assets/paper/cast_krishna/krishna_045_pointing_flute_at_moon.png', 211.023, 211.649], // सँवरिया
    ['s26_13', '/assets/paper/cast_krishna/krishna_090_playing_flute.png', 211.65, 212.276], // सँवरिया
    ['s26_14', '/assets/paper/cast_krishna/krishna_043_playing_flute_on_paper.png', 212.277, 212.903], // सँवरिया
    ['s26_15', '/assets/paper/cast_krishna/krishna_033_crying_with_bamboo_flute.png', 212.904, 213.53], // बेदरदी
    ['s26_16', '/assets/paper/cast_radha/radha_096_weeping_in_sorrow.png', 213.531, 214.157], // बेदरदी
    ['s26_17', '/assets/paper/cast_krishna/krishna_076_sitting_in_sorrow.png', 214.158, 214.399], // बेदरदी
  ], SLOT_LEFT),

  // मुझे जलती चिता में २
  s27_chorus_jalti_chita_2: beatCuts([
    ['s27_01', '/assets/paper/cast_radha/radha_072_resting_chin_on_hand.png', 214.4, 214.784], // मुझे
    ['s27_02', '/assets/paper/cast_radha/radha_030_radha_portrait_with_tear_falling.png', 214.785, 215.411], // मुझे
    ['s27_03', '/assets/paper/cast_radha/radha_013_kneeling_figure_lighting_oil_lamps.png', 215.412, 216.037], // जलती
    ['s27_04', '/assets/paper/cast_radha/radha_021_radha_holding_earthen_diya_lamp.png', 216.038, 216.664], // जलती
    ['s27_05', '/assets/paper/cast_radha/radha_069_lying_on_ground.png', 216.665, 217.291], // चिता
    ['s27_06', '/assets/paper/cast_radha/radha_055_resting_on_stairs.png', 217.292, 217.918], // में
    ['s27_07', '/assets/paper/cast_krishna/krishna_026_turning_away_with_flute.png', 217.919, 218.545], // छोड़
    ['s27_08', '/assets/paper/cast_krishna/krishna_055_walking_away_on_paper.png', 218.546, 219.172], // गए
    ['s27_09', '/assets/paper/cast_radha/radha_020_radha_gazing_at_full_moon.png', 219.173, 219.799], // आए
    ['s27_10', '/assets/paper/cast_radha/radha_088_stepping_backwards_looking.png', 219.8, 220.426], // ना
    ['s27_11', '/assets/paper/cast_radha/radha_084_standing_in_shock.png', 220.427, 221.053], // ना
    ['s27_12', '/assets/paper/cast_krishna/krishna_086_walking_with_flute.png', 221.054, 221.68], // सँवरिया
    ['s27_13', '/assets/paper/cast_krishna/krishna_045_pointing_flute_at_moon.png', 221.681, 222.307], // सँवरिया
    ['s27_14', '/assets/paper/cast_krishna/krishna_090_playing_flute.png', 222.308, 222.934], // सँवरिया
    ['s27_15', '/assets/paper/cast_radha/radha_095_weeping_against_pillar.png', 222.935, 223.561], // बेदरदी
    ['s27_16', '/assets/paper/cast_krishna/krishna_033_crying_with_bamboo_flute.png', 223.562, 224.164], // बेदरदी
    ['s27_17', '/assets/paper/cast_radha/radha_096_weeping_in_sorrow.png', 224.165, 224.599], // बेदरदी
  ], SLOT_LEFT),

  // मुझे अपना बनाकर — lyric right
  s28_chorus_apna_7: beatCuts([
    ['s28_01', '/assets/paper/cast_krishna/krishna_076_sitting_in_sorrow.png', 224.6, 224.791], // बेदरदी
    ['s28_02', '/assets/paper/cast_radha/radha_007_listening_for_flute_melody.png', 224.792, 225.418], // मुझे
    ['s28_03', '/assets/paper/cast_radha/radha_044_radha_standing_with_open_arms.png', 225.419, 226.045], // अपना
    ['s28_04', '/assets/paper/cast_krishna/krishna_046_reaching_out_in_yearning.png', 226.046, 226.672], // अपना
    ['s28_05', '/assets/paper/cast_krishna/krishna_037_holding_bamboo_flute.png', 226.673, 227.299], // बनाकर
    ['s28_06', '/assets/paper/cast_radha/radha_012_hands_holding_red_thread.png', 227.3, 227.926], // बनाकर
    ['s28_07', '/assets/paper/cast_krishna/krishna_042_looking_back_with_sorrow.png', 227.927, 228.553], // छोड़
    ['s28_08', '/assets/paper/cast_krishna/krishna_075_silhouette_in_wind.png', 228.554, 229.18], // गए
    ['s28_09', '/assets/paper/cast_krishna/krishna_020_silhouette_looking_ove.png', 229.181, 229.807], // आए
    ['s28_10', '/assets/paper/cast_radha/radha_006_kneeling_in_grief.png', 229.808, 230.434], // ना
    ['s28_11', '/assets/paper/cast_radha/radha_086_standing_with_crossed_arms.png', 230.435, 231.061], // ना
    ['s28_12', '/assets/paper/cast_krishna/krishna_043_playing_flute_on_paper.png', 231.062, 231.688], // सँवरिया
    ['s28_13', '/assets/paper/cast_krishna/krishna_086_walking_with_flute.png', 231.689, 232.315], // सँवरिया
    ['s28_14', '/assets/paper/cast_krishna/krishna_045_pointing_flute_at_moon.png', 232.316, 232.942], // सँवरिया
    ['s28_15', '/assets/paper/cast_radha/radha_095_weeping_against_pillar.png', 232.943, 233.569], // बेदरदी
    ['s28_16', '/assets/paper/cast_krishna/krishna_033_crying_with_bamboo_flute.png', 233.57, 234.195], // बेदरदी
    ['s28_17', '/assets/paper/cast_radha/radha_096_weeping_in_sorrow.png', 234.196, 234.799], // बेदरदी
  ], SLOT_LEFT),

  // कागा सब तन — lyric bottom, figure top-left
  s29_verse4_kaga_sab_tan: beatCuts([
    ['s29_01', '/assets/paper/cast_radha/radha_041_radha_speaking_to_crow.png', 234.8, 235.426], // कागा
    ['s29_02', '/assets/paper/cast_radha/radha_069_lying_on_ground.png', 235.427, 236.076], // सब
    ['s29_03', '/assets/paper/cast_radha/radha_076_sitting_hugging_midriff.png', 236.077, 236.703], // तन
    ['s29_04', '/assets/paper/cast_radha/radha_085_standing_pulling_shawl.png', 236.704, 237.33], // खाइयो
    ['s29_05', '/assets/paper/cast_radha/radha_086_standing_with_crossed_arms.png', 237.331, 237.957], // खाइयो
    ['s29_06', '/assets/paper/cast_radha/radha_091_touching_fallen_flower_petals.png', 237.958, 238.584], // चुन
    ['s29_07', '/assets/paper/cast_radha/radha_006_kneeling_in_grief.png', 238.585, 239.211], // खइयो
    ['s29_08', '/assets/paper/cast_radha/radha_004_curled_figure_hiding_grief.png', 239.212, 239.838], // मांस
    ['s29_09', '/assets/paper/cast_radha/radha_041_speaking_to_crow.png', 239.839, 240.465], // कागा
    ['s29_10', '/assets/paper/cast_radha/radha_004_curled_figure_hiding_grief.png', 240.466, 241.115], // कागा
    ['s29_11', '/assets/paper/cast_radha/radha_006_kneeling_in_grief.png', 241.116, 241.719], // तन
    ['s29_12', '/assets/paper/cast_radha/radha_095_weeping_against_pillar.png', 241.72, 242.369], // खाइयो
    ['s29_13', '/assets/paper/cast_radha/radha_085_standing_pulling_shawl.png', 242.37, 242.996], // खाइयो
    ['s29_14', '/assets/paper/cast_radha/radha_037_radha_seated_looking_at_foot.png', 242.997, 243.623], // चुन
    ['s29_15', '/assets/paper/cast_radha/radha_095_weeping_against_pillar.png', 243.624, 244.25], // खइयो
    ['s29_16', '/assets/paper/cast_radha/radha_069_lying_on_ground.png', 244.251, 244.877], // मांस
    ['s29_17', '/assets/paper/cast_radha/radha_096_weeping_in_sorrow.png', 244.878, 245.199], // मांस
  ], SLOT_TOP_LEFT),

  // दो नैना मत खाइयो — lyric bottom, figure top-left
  s30_verse4_do_naina: beatCuts([
    ['s30_01', '/assets/paper/cast_radha/radha_030_radha_portrait_with_tear_falling.png', 245.2, 245.504], // दो
    ['s30_02', '/assets/paper/cast_radha/radha_062_gazing_into_hand_mirror.png', 245.505, 246.154], // दो
    ['s30_03', '/assets/paper/cast_radha/radha_030_radha_portrait_with_tear_falling.png', 246.155, 246.781], // नैना
    ['s30_04', '/assets/paper/cast_radha/radha_084_standing_in_shock.png', 246.782, 247.454], // मत
    ['s30_05', '/assets/paper/cast_radha/radha_086_standing_with_crossed_arms.png', 247.455, 248.104], // खाइयो
    ['s30_06', '/assets/paper/cast_radha/radha_032_reaching_outward_in_longing.png', 248.105, 248.754], // मोहे
    ['s30_07', '/assets/paper/cast_krishna/krishna_090_playing_flute.png', 248.755, 249.381], // पिया
    ['s30_08', '/assets/paper/cast_radha/radha_032_reaching_outward_in_longing.png', 249.382, 250.031], // मिलन
    ['s30_09', '/assets/paper/cast_radha/radha_020_radha_gazing_at_full_moon.png', 250.032, 250.682], // की
    ['s30_10', '/assets/paper/cast_radha/radha_030_radha_portrait_with_tear_falling.png', 250.683, 251.332], // दो
    ['s30_11', '/assets/paper/cast_radha/radha_062_gazing_into_hand_mirror.png', 251.333, 251.959], // नैना
    ['s30_12', '/assets/paper/cast_radha/radha_068_looking_into_round_mirror.png', 251.96, 252.609], // नैना
    ['s30_13', '/assets/paper/cast_radha/radha_095_weeping_against_pillar.png', 252.61, 253.282], // खाइयो
    ['s30_14', '/assets/paper/cast_radha/radha_085_standing_pulling_shawl.png', 253.283, 253.932], // खाइयो
    ['s30_15', '/assets/paper/cast_radha/radha_007_listening_for_flute_melody.png', 253.933, 254.583], // मोहे
    ['s30_16', '/assets/paper/cast_krishna/krishna_046_reaching_out_in_yearning.png', 254.584, 255.233], // पिया
    ['s30_17', '/assets/paper/cast_radha/radha_044_radha_standing_with_open_arms.png', 255.234, 255.883], // मिलन
    ['s30_18', '/assets/paper/cast_radha/radha_028_pointing_into_distance.png', 255.884, 256.199], // आस
  ], SLOT_TOP_LEFT),

  // मोसे नैना मिलाकर
  s31_chorus_naina_milakar_1: beatCuts([
    ['s31_01', '/assets/paper/cast_radha/radha_030_radha_portrait_with_tear_falling.png', 256.2, 256.533], // मोसे
    ['s31_02', '/assets/paper/cast_radha/radha_026_radha_looking_back_over_shoulder.png', 256.534, 257.183], // मोसे
    ['s31_03', '/assets/paper/cast_radha/radha_020_radha_gazing_at_full_moon.png', 257.184, 257.81], // नैना
    ['s31_04', '/assets/paper/cast_radha/radha_030_radha_portrait_with_tear_falling.png', 257.811, 258.414], // नैना
    ['s31_05', '/assets/paper/cast_radha/radha_032_reaching_outward_in_longing.png', 258.415, 259.041], // मिलाकर
    ['s31_06', '/assets/paper/cast_krishna/krishna_047_reaching_toward_viewer.png', 259.042, 259.645], // मिलाकर
    ['s31_07', '/assets/paper/cast_radha/radha_088_stepping_backwards_looking.png', 259.646, 260.295], // छोड़
    ['s31_08', '/assets/paper/cast_krishna/krishna_054_turning_into_wind.png', 260.296, 260.922], // गए
    ['s31_09', '/assets/paper/cast_krishna/krishna_086_walking_with_flute.png', 260.923, 261.549], // गए
    ['s31_10', '/assets/paper/cast_radha/radha_007_listening_for_flute_melody.png', 261.55, 262.176], // आए
    ['s31_11', '/assets/paper/cast_radha/radha_088_stepping_backwards_looking.png', 262.177, 262.802], // ना
    ['s31_12', '/assets/paper/cast_krishna/krishna_090_playing_flute.png', 262.803, 263.429], // सँवरिया
    ['s31_13', '/assets/paper/cast_krishna/krishna_043_playing_flute_on_paper.png', 263.43, 264.056], // सँवरिया
    ['s31_14', '/assets/paper/cast_krishna/krishna_086_walking_with_flute.png', 264.057, 264.683], // सँवरिया
    ['s31_15', '/assets/paper/cast_krishna/krishna_076_sitting_in_sorrow.png', 264.684, 265.31], // बेदरदी
    ['s31_16', '/assets/paper/cast_radha/radha_095_weeping_against_pillar.png', 265.311, 265.937], // बेदरदी
    ['s31_17', '/assets/paper/cast_krishna/krishna_033_crying_with_bamboo_flute.png', 265.938, 266.199], // बेदरदी
  ], SLOT_LEFT),

  // मोसे नैना मिलाकर २
  s32_chorus_naina_milakar_2: beatCuts([
    ['s32_01', '/assets/paper/cast_radha/radha_072_resting_chin_on_hand.png', 266.2, 266.564], // मोसे
    ['s32_02', '/assets/paper/cast_radha/radha_030_radha_portrait_with_tear_falling.png', 266.565, 267.191], // मोसे
    ['s32_03', '/assets/paper/cast_radha/radha_062_gazing_into_hand_mirror.png', 267.192, 267.818], // नैना
    ['s32_04', '/assets/paper/cast_radha/radha_068_looking_into_round_mirror.png', 267.819, 268.445], // नैना
    ['s32_05', '/assets/paper/cast_radha/radha_044_radha_standing_with_open_arms.png', 268.446, 269.072], // मिलाकर
    ['s32_06', '/assets/paper/cast_radha/radha_032_reaching_outward_in_longing.png', 269.073, 269.722], // मिलाकर
    ['s32_07', '/assets/paper/cast_krishna/krishna_055_walking_away_on_paper.png', 269.723, 270.349], // छोड़
    ['s32_08', '/assets/paper/cast_krishna/krishna_075_silhouette_in_wind.png', 270.35, 270.976], // गए
    ['s32_09', '/assets/paper/cast_radha/radha_028_pointing_into_distance.png', 270.977, 271.603], // आए
    ['s32_10', '/assets/paper/cast_radha/radha_084_standing_in_shock.png', 271.604, 272.207], // ना
    ['s32_11', '/assets/paper/cast_radha/radha_006_kneeling_in_grief.png', 272.208, 272.833], // ना
    ['s32_12', '/assets/paper/cast_krishna/krishna_045_pointing_flute_at_moon.png', 272.834, 273.46], // सँवरिया
    ['s32_13', '/assets/paper/cast_krishna/krishna_090_playing_flute.png', 273.461, 274.111], // सँवरिया
    ['s32_14', '/assets/paper/cast_krishna/krishna_043_playing_flute_on_paper.png', 274.112, 274.714], // सँवरिया
    ['s32_15', '/assets/paper/cast_radha/radha_096_weeping_in_sorrow.png', 274.715, 275.341], // बेदरदी
    ['s32_16', '/assets/paper/cast_krishna/krishna_076_sitting_in_sorrow.png', 275.342, 275.968], // बेदरदी
    ['s32_17', '/assets/paper/cast_radha/radha_095_weeping_against_pillar.png', 275.969, 276.399], // बेदरदी
  ], SLOT_LEFT),

  // उपसंहार
  s33_outro_apna_banakar: beatCuts([
    ['s33_01', '/assets/paper/cast_radha/radha_032_reaching_outward_in_longing.png', 276.4, 276.618], // मुझे
    ['s33_02', '/assets/paper/cast_radha/radha_072_resting_chin_on_hand.png', 276.619, 277.245], // मुझे
    ['s33_03', '/assets/paper/cast_radha/radha_071_pulling_red_veil.png', 277.246, 277.872], // अपना
    ['s33_04', '/assets/paper/cast_radha/radha_092_tying_red_thread_on.png', 277.873, 278.499], // अपना
    ['s33_05', '/assets/paper/cast_krishna/krishna_081_standing_with_bansuri.png', 278.5, 279.126], // बनाकर
    ['s33_06', '/assets/paper/cast_radha/radha_045_stringing_flowers_into_gar.png', 279.127, 279.753], // बनाकर
    ['s33_07', '/assets/paper/cast_krishna/krishna_026_turning_away_with_flute.png', 279.754, 280.38], // छोड़
    ['s33_08', '/assets/paper/cast_krishna/krishna_054_turning_into_wind.png', 280.381, 281.007], // गए
    ['s33_09', '/assets/paper/cast_radha/radha_020_radha_gazing_at_full_moon.png', 281.008, 281.634], // आए
    ['s33_10', '/assets/paper/cast_radha/radha_086_standing_with_crossed_arms.png', 281.635, 282.261], // ना
    ['s33_11', '/assets/paper/cast_radha/radha_088_stepping_backwards_looking.png', 282.262, 282.888], // ना
    ['s33_12', '/assets/paper/cast_krishna/krishna_086_walking_with_flute.png', 282.889, 283.515], // सँवरिया
    ['s33_13', '/assets/paper/cast_krishna/krishna_045_pointing_flute_at_moon.png', 283.516, 284.142], // सँवरिया
    ['s33_14', '/assets/paper/cast_krishna/krishna_033_crying_with_bamboo_flute.png', 284.143, 284.769], // बेदरदी
    ['s33_15', '/assets/paper/cast_radha/radha_096_weeping_in_sorrow.png', 284.77, 285.442], // बेदरदी
    ['s33_16', '/assets/paper/cast_krishna/krishna_076_sitting_in_sorrow.png', 285.443, 286.092], // बेदरदी
    ['s33_17', '/assets/paper/cast_radha/radha_095_weeping_against_pillar.png', 286.093, 287.999], // बेदरदी
  ], SLOT_LEFT),
}

export default shotLayers
