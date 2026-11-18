// Atmospheric Overlay Tracks (Particles, Callouts, Environmental Moods)
// Active across the entire 288.0s composition

export const tracks = [
  // ─────────────────────────────────────────────────────────────
  // 1. Continuous Living Parchment Dust (0.0s - 288.0s)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'ambient_dust',
    type: 'particle',
    start: 0.0,
    end: 288.0, // पूरे 4 मिनट 48 सेकंड तक सतत विरह धूल व वातावरण
    particle: {
      count: 26,
      color: 'rgba(92, 64, 42, 0.22)',
      sizeRange: [1.4, 3.6],
      speedRange: [0.2, 0.6],
    },
    zIndex: 2,
  },

  // ─────────────────────────────────────────────────────────────
  // 1.5 Golden Dawn Prana Motes (भोर की दिव्य स्वर्ण किरणें)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'dawn_golden_motes',
    type: 'particle',
    start: 0.0,
    end: 58.0,
    particle: {
      preset: 'golden-motes',
      count: 22,
    },
    fadeIn: 1.0,
    fadeOut: 2.0,
    zIndex: 4,
  },

  // ─────────────────────────────────────────────────────────────
  // 2. Sawan Monsoon Ink Rain (सावन की विरह वर्षा)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'sawan_rain_chorus_1',
    type: 'particle',
    start: 15.0,
    end: 35.3,
    particle: {
      preset: 'ink-rain',
      count: 36,
      color: 'rgba(62, 45, 33, 0.26)',
    },
    fadeIn: 1.2,
    fadeOut: 1.0,
    zIndex: 2,
  },
  {
    id: 'sawan_rain_chorus_repeat',
    type: 'particle',
    start: 98.8,
    end: 118.8,
    particle: {
      preset: 'ink-rain',
      count: 38,
      color: 'rgba(58, 42, 30, 0.28)',
    },
    fadeIn: 1.0,
    fadeOut: 1.0,
    zIndex: 2,
  },
  {
    id: 'sawan_rain_tears_climax',
    type: 'particle',
    start: 245.2,
    end: 276.4,
    particle: {
      preset: 'ink-rain',
      count: 42,
      color: 'rgba(55, 38, 28, 0.30)',
    },
    fadeIn: 1.2,
    fadeOut: 1.5,
    zIndex: 2,
  },

  // ─────────────────────────────────────────────────────────────
  // 3. Kadamba Blossom Petals (कदम्ब के पुष्प व स्मृतियाँ)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'kadamba_petals_memory',
    type: 'particle',
    start: 35.3,
    end: 55.1,
    particle: {
      preset: 'petals',
      count: 24,
      color: 'rgba(128, 42, 38, 0.26)',
    },
    fadeIn: 1.0,
    fadeOut: 1.0,
    zIndex: 2,
  },
  {
    id: 'kadamba_petals_prem_dhaga',
    type: 'particle',
    start: 122.0,
    end: 142.4,
    particle: {
      preset: 'petals',
      count: 22,
      color: 'rgba(135, 45, 40, 0.25)',
    },
    fadeIn: 1.0,
    fadeOut: 1.0,
    zIndex: 2,
  },

  // ─────────────────────────────────────────────────────────────
  // 4. Viraha Chita Embers & Sparks (विरह चिता / जलती चिता की राख)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'viraha_chita_embers',
    type: 'particle',
    start: 183.4,
    end: 234.8,
    particle: {
      preset: 'embers',
      count: 46,
      color: 'rgba(255, 118, 36, 0.55)',
    },
    fadeIn: 1.2,
    fadeOut: 1.5,
    zIndex: 4,
  },
  {
    id: 'outro_diya_golden_motes',
    type: 'particle',
    start: 266.2,
    end: 288.0,
    particle: {
      preset: 'golden-motes',
      count: 20,
    },
    fadeIn: 1.8,
    fadeOut: 1.5,
    zIndex: 4,
  },

  // ─────────────────────────────────────────────────────────────
  // 5. Poetic Inscription Callouts (शीर्ष हाशिया जल-चिह्न)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'intro_scene_callout',
    type: 'text',
    start: 0.2,
    end: 4.5,
    text: '॥ श्री राधा विरह गाथा ॥',
    position: { top: '15%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' },
    style: {
      fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
      color: '#8c2f2f',
      letterSpacing: '0.14em',
      opacity: 0.85,
    },
    enter: { type: 'ink-reveal', duration: 0.6 },
    exit: { type: 'ink-dry', duration: 0.6 },
    zIndex: 4,
  },
  {
    id: 'antara1_callout',
    type: 'text',
    start: 58.2,
    end: 64.0,
    text: '— प्रीत की रीत —',
    position: { top: '8%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' },
    style: {
      fontSize: 'clamp(1.1rem, 1.8vw, 1.6rem)',
      color: '#6e5645',
      letterSpacing: '0.22em',
      opacity: 0.6,
    },
    enter: { type: 'ink-reveal', duration: 0.6 },
    exit: { type: 'ink-dry', duration: 0.6 },
    zIndex: 4,
  },
  {
    id: 'antara2_callout',
    type: 'text',
    start: 122.0,
    end: 128.0,
    text: '— प्रेम धागा —',
    position: { top: '8%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' },
    style: {
      fontSize: 'clamp(1.1rem, 1.8vw, 1.6rem)',
      color: '#6e5645',
      letterSpacing: '0.22em',
      opacity: 0.6,
    },
    enter: { type: 'ink-reveal', duration: 0.6 },
    exit: { type: 'ink-dry', duration: 0.6 },
    zIndex: 4,
  },
  {
    id: 'antara3_callout',
    type: 'text',
    start: 183.4,
    end: 190.0,
    text: '— विरह चिता —',
    position: { top: '8%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' },
    style: {
      fontSize: 'clamp(1.1rem, 1.8vw, 1.6rem)',
      color: '#7d1e1d',
      letterSpacing: '0.22em',
      opacity: 0.65,
    },
    enter: { type: 'ink-reveal', duration: 0.6 },
    exit: { type: 'ink-dry', duration: 0.6 },
    zIndex: 4,
  },
  {
    id: 'antara4_callout',
    type: 'text',
    start: 234.8,
    end: 241.0,
    text: '— काग संदेश —',
    position: { top: '8%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' },
    style: {
      fontSize: 'clamp(1.1rem, 1.8vw, 1.6rem)',
      color: '#6e5645',
      letterSpacing: '0.22em',
      opacity: 0.6,
    },
    enter: { type: 'ink-reveal', duration: 0.6 },
    exit: { type: 'ink-dry', duration: 0.6 },
    zIndex: 4,
  },
]
