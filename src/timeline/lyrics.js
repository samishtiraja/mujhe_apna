// Song Lyrics and Devanagari Wet-Ink Calligraphy Timings (All 26 Vocal Segments)
// • Rich single-word reveals for profound couplets and Dohas
// • Dynamic positioning (top, center, low, left, right) tailored to cinematic compositions
// • Ghost couplet evaporation tails for lingering emotional depth

export const lyricLines = [
  {
    id: 'line_seg_03',
    start: 15.0,
    end: 25.4,
    text: 'मुझे अपना बनाकर छोड़ गए, आए ना सँवरिया बेदरदी',
    position: { anchor: 'top-center', top: '8%', left: '58%', textAlign: 'center' },
    style: {
      fontFamily: "'Kalam', 'Rozha One', cursive, serif",
      fontSize: 'clamp(3.9rem, 9.4vw, 39.0rem)',
      fontWeight: '700',
      letterSpacing: '0.025em',
      activeColor: '#7d1e1d', // Fresh wet sindoor crimson
      sungColor: '#261c14',   // Dried warm walnut-lampblack ink
      unsungColor: '#6e5645',
    },
    wordReveal: { type: 'single-word' },
    motion: { scaleStart: 0.99, scaleEnd: 1.02, yStart: 2, yEnd: -2 },
    living: { type: 'pulse', amp: 0.015, period: 3.5 },
    enter: { type: 'ink-reveal', duration: 0.45 },
    exit: { type: 'ink-dry', duration: 0.55 },
    words: [
      { text: 'मुझे', time: 15.1,  },
      { text: 'अपना', time: 16.1, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'बनाकर', time: 17.2 },
      { text: 'छोड़', time: 18.6, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'गए', time: 19.4 },
      { text: 'आए', time: 20.3 },
      { text: 'ना', time: 21.0, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'सँवरिया', time: 21.8 },
      { text: 'बेदरदी', time: 23.5, style: { color: '#8c2f2f' } }, // Hero word
    ],
  },
  {
    id: 'line_seg_04',
    start: 25.4,
    end: 35.3,
    text: 'मुझे अपना बनाकर छोड़ गए, आए ना सँवरिया बेदरदी',
    position: { anchor: 'low-center', top: '3%', left: '30%', textAlign: 'center' },
    style: {
      fontFamily: "'Kalam', 'Rozha One', cursive, serif",
      fontSize: 'clamp(3.9rem, 9.4vw, 39.0rem)',
      fontWeight: '700',
      letterSpacing: '0.025em',
      activeColor: '#7d1e1d', // Fresh wet sindoor crimson
      sungColor: '#261c14',   // Dried warm walnut-lampblack ink
      unsungColor: '#6e5645',
    },
    wordReveal: { type: 'single-word' },
    motion: { scaleStart: 0.99, scaleEnd: 1.02, yStart: 2, yEnd: -2 },
    living: { type: 'pulse', amp: 0.015, period: 3.5 },
    enter: { type: 'ink-reveal', duration: 0.45 },
    exit: { type: 'ink-dry', duration: 0.55 },
    words: [
      { text: 'मुझे', time: 25.45, },
      { text: 'अपना', time: 26.3, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'बनाकर', time: 27.3 },
      { text: 'छोड़', time: 28.5 },
      { text: 'गए', time: 29.2 },
      { text: 'आए', time: 30.1 },
      { text: 'ना', time: 30.8, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'सँवरिया', time: 31.6, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'बेदरदी', time: 33.4, style: { color: '#8c2f2f' } }, // Hero word
    ],
  },
  {
    id: 'line_seg_05',
    start: 35.3,
    end: 45.2,
    text: 'मुझे अपना बनाकर छोड़ गए, आए ना सँवरिया बेदरदी',
    position: { anchor: 'lower-left', left: '38%', bottom: '54%', textAlign: 'left' },
    style: {
      fontFamily: "'Kalam', 'Rozha One', cursive, serif",
      fontSize: 'clamp(3.9rem, 9.4vw, 39.0rem)',
      fontWeight: '700',
      letterSpacing: '0.025em',
      activeColor: '#7d1e1d', // Fresh wet sindoor crimson
      sungColor: '#261c14',   // Dried warm walnut-lampblack ink
      unsungColor: '#6e5645',
    },
    wordReveal: { type: 'single-word' },
    motion: { scaleStart: 0.99, scaleEnd: 1.02, yStart: 2, yEnd: -2 },
    living: { type: 'pulse', amp: 0.015, period: 3.5 },
    enter: { type: 'ink-reveal', duration: 0.45 },
    exit: { type: 'ink-dry', duration: 0.55 },
    words: [
      { text: 'मुझे', time: 35.35 },
      { text: 'अपना', time: 36.2 },
      { text: 'बनाकर', time: 37.2 },
      { text: 'छोड़', time: 38.4, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'गए', time: 39.1 },
      { text: 'आए', time: 40.0, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'ना', time: 40.7, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'सँवरिया', time: 41.5 },
      { text: 'बेदरदी', time: 43.3, style: { color: '#8c2f2f' } }, // Hero word
    ],
  },
  {
    id: 'line_seg_06',
    start: 45.2,
    end: 55.1,
    text: 'मुझे अपना बनाकर छोड़ गए, आए ना सँवरिया बेदरदी',
    position: { anchor: 'low-center', top: '2%', left: '50%', textAlign: 'center' },
    style: {
      fontFamily: "'Kalam', 'Rozha One', cursive, serif",
      fontSize: 'clamp(3.9rem, 9.4vw, 39.0rem)',
      fontWeight: '700',
      letterSpacing: '0.025em',
      activeColor: '#7d1e1d', // Fresh wet sindoor crimson
      sungColor: '#261c14',   // Dried warm walnut-lampblack ink
      unsungColor: '#6e5645',
    },
    wordReveal: { type: 'single-word' },
    motion: { scaleStart: 0.99, scaleEnd: 1.02, yStart: 2, yEnd: -2 },
    living: { type: 'pulse', amp: 0.015, period: 3.5 },
    enter: { type: 'ink-reveal', duration: 0.45 },
    exit: { type: 'ink-dry', duration: 0.55 },
    words: [
      { text: 'मुझे', time: 45.25 },
      { text: 'अपना', time: 46.1, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'बनाकर', time: 47.1 },
      { text: 'छोड़', time: 48.3 },
      { text: 'गए', time: 49.0 },
      { text: 'आए', time: 49.9 },
      { text: 'ना', time: 50.6, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'सँवरिया', time: 51.4, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'बेदरदी', time: 53.2, style: { color: '#8c2f2f' } }, // Hero word
    ],
  },
  {
    id: 'line_seg_08',
    start: 58.2,
    end: 68.0,
    text: 'जो मैं ऐसो जानती प्रीत करे दुख होए',
    position: { anchor: 'right', top: '20%', right: '45%', textAlign: 'right' },
    style: {
      fontFamily: "'Kalam', 'Rozha One', cursive, serif",
      fontSize: 'clamp(3.9rem, 9.4vw, 39.0rem)',
      fontWeight: '700',
      letterSpacing: '0.025em',
      activeColor: '#7d1e1d', // Fresh wet sindoor crimson
      sungColor: '#261c14',   // Dried warm walnut-lampblack ink
      unsungColor: '#6e5645',
    },
    wordReveal: { type: 'single-word' },
    motion: { scaleStart: 0.99, scaleEnd: 1.02, yStart: 2, yEnd: -2 },
    living: { type: 'pulse', amp: 0.015, period: 3.5 },
    enter: { type: 'ink-reveal', duration: 0.45 },
    exit: { type: 'ink-dry', duration: 0.55 },
    words: [
      { text: 'जो', time: 58.2 },
      { text: 'मैं', time: 58.6 },
      { text: 'ऐसो', time: 59.0 },
      { text: 'जानती', time: 59.7 },
      { text: 'प्रीत', time: 60.6, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'करे', time: 61.2 },
      { text: 'दुख', time: 61.8, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'होए', time: 62.3 },
      { text: 'जो', time: 63.15 },
      { text: 'मैं', time: 63.55 },
      { text: 'ऐसो', time: 63.95 },
      { text: 'जानती', time: 64.65 },
      { text: 'प्रीत', time: 65.55, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'करे', time: 66.15 },
      { text: 'दुख', time: 66.75, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'होए', time: 67.25 },
    ],
  },
  {
    id: 'line_seg_09',
    start: 68.0,
    end: 78.8,
    text: 'नगर ढिंढोरा पीटती प्रीत ना करियो कोए',
    position: { anchor: 'top-center', top: '12%', left: '50%', textAlign: 'center' },
    style: {
      fontFamily: "'Kalam', 'Rozha One', cursive, serif",
      fontSize: 'clamp(3.9rem, 9.4vw, 39.0rem)',
      fontWeight: '700',
      letterSpacing: '0.025em',
      activeColor: '#7d1e1d', // Fresh wet sindoor crimson
      sungColor: '#261c14',   // Dried warm walnut-lampblack ink
      unsungColor: '#6e5645',
    },
    wordReveal: { type: 'single-word' },
    motion: { scaleStart: 0.99, scaleEnd: 1.02, yStart: 2, yEnd: -2 },
    living: { type: 'pulse', amp: 0.015, period: 3.5 },
    enter: { type: 'ink-reveal', duration: 0.45 },
    exit: { type: 'ink-dry', duration: 0.55 },
    words: [
      { text: 'नगर', time: 68.05, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'ढिंढोरा', time: 68.8, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'पीटती', time: 69.8 },
      { text: 'प्रीत', time: 70.7, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'ना', time: 71.15, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'करियो', time: 71.6, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'कोए', time: 72.3 },
      { text: 'नगर', time: 73.05, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'ढिंढोरा', time: 73.8, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'पीटती', time: 74.8 },
      { text: 'प्रीत', time: 75.7, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'ना', time: 76.15, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'करियो', time: 76.6, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'कोए', time: 77.3 },
    ],
  },
  {
    id: 'line_seg_10',
    start: 78.8,
    end: 88.6,
    text: 'मुझे प्रेमी बनाकर छोड़ गए, आए ना सँवरिया बेदरदी',
    position: { anchor: 'low-center', top: '2%', left: '50%', textAlign: 'center' },
    style: {
      fontFamily: "'Kalam', 'Rozha One', cursive, serif",
      fontSize: 'clamp(3.9rem, 9.4vw, 39.0rem)',
      fontWeight: '700',
      letterSpacing: '0.025em',
      activeColor: '#7d1e1d', // Fresh wet sindoor crimson
      sungColor: '#261c14',   // Dried warm walnut-lampblack ink
      unsungColor: '#6e5645',
    },
    wordReveal: { type: 'single-word' },
    motion: { scaleStart: 0.99, scaleEnd: 1.02, yStart: 2, yEnd: -2 },
    living: { type: 'pulse', amp: 0.015, period: 3.5 },
    enter: { type: 'ink-reveal', duration: 0.45 },
    exit: { type: 'ink-dry', duration: 0.55 },
    words: [
      { text: 'मुझे', time: 78.8 },
      { text: 'प्रेमी', time: 79.7, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'बनाकर', time: 80.8 },
      { text: 'छोड़', time: 82.1, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'गए', time: 82.9 },
      { text: 'आए', time: 83.8 },
      { text: 'ना', time: 84.5 },
      { text: 'सँवरिया', time: 85.3 },
      { text: 'बेदरदी', time: 87.0, style: { color: '#8c2f2f' } }, // Hero word
    ],
  },
  {
    id: 'line_seg_11',
    start: 88.6,
    end: 98.8,
    text: 'मुझे प्रेमी बनाकर छोड़ गए, आए ना सँवरिया बेदरदी',
    position: { anchor: 'center', top: '25%', left: '60%', textAlign: 'center' },
    style: {
      fontFamily: "'Kalam', 'Rozha One', cursive, serif",
      fontSize: 'clamp(3.9rem, 9.4vw, 39.0rem)',
      fontWeight: '700',
      letterSpacing: '0.025em',
      activeColor: '#7d1e1d', // Fresh wet sindoor crimson
      sungColor: '#261c14',   // Dried warm walnut-lampblack ink
      unsungColor: '#6e5645',
    },
    wordReveal: { type: 'single-word' },
    motion: { scaleStart: 0.99, scaleEnd: 1.02, yStart: 2, yEnd: -2 },
    living: { type: 'pulse', amp: 0.015, period: 3.5 },
    enter: { type: 'ink-reveal', duration: 0.45 },
    exit: { type: 'ink-dry', duration: 0.55 },
    words: [
      { text: 'मुझे', time: 88.7 },
      { text: 'प्रेमी', time: 89.6, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'बनाकर', time: 90.6 },
      { text: 'छोड़', time: 91.9 },
      { text: 'गए', time: 92.6 },
      { text: 'आए', time: 93.5 },
      { text: 'ना', time: 94.2 },
      { text: 'सँवरिया', time: 95.0, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'बेदरदी', time: 96.7, style: { color: '#8c2f2f' } }, // Hero word
    ],
  },
  {
    id: 'line_seg_12',
    start: 98.8,
    end: 108.8,
    text: 'मुझे अपना बनाकर छोड़ गए, आए ना सँवरिया बेदरदी',
    position: { anchor: 'top-center', top: '8%', left: '60%', textAlign: 'center' },
    style: {
      fontFamily: "'Kalam', 'Rozha One', cursive, serif",
      fontSize: 'clamp(3.9rem, 9.4vw, 39.0rem)',
      fontWeight: '700',
      letterSpacing: '0.025em',
      activeColor: '#7d1e1d', // Fresh wet sindoor crimson
      sungColor: '#261c14',   // Dried warm walnut-lampblack ink
      unsungColor: '#6e5645',
    },
    wordReveal: { type: 'single-word' },
    motion: { scaleStart: 0.99, scaleEnd: 1.02, yStart: 2, yEnd: -2 },
    living: { type: 'pulse', amp: 0.015, period: 3.5 },
    enter: { type: 'ink-reveal', duration: 0.45 },
    exit: { type: 'ink-dry', duration: 0.55 },
    words: [
      { text: 'मुझे', time: 98.85 },
      { text: 'अपना', time: 99.7, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'बनाकर', time: 100.7 },
      { text: 'छोड़', time: 101.9, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'गए', time: 102.6 },
      { text: 'आए', time: 103.5 },
      { text: 'ना', time: 104.2, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'सँवरिया', time: 105.0 },
      { text: 'बेदरदी', time: 106.8, style: { color: '#8c2f2f' } }, // Hero word
    ],
  },
  {
    id: 'line_seg_13',
    start: 108.8,
    end: 118.8,
    text: 'मुझे अपना बनाकर छोड़ गए, आए ना सँवरिया बेदरदी',
    position: { anchor: 'low-center', top: '2%', left: '20%', textAlign: 'center' },
    style: {
      fontFamily: "'Kalam', 'Rozha One', cursive, serif",
      fontSize: 'clamp(3.9rem, 9.4vw, 39.0rem)',
      fontWeight: '700',
      letterSpacing: '0.025em',
      activeColor: '#7d1e1d', // Fresh wet sindoor crimson
      sungColor: '#261c14',   // Dried warm walnut-lampblack ink
      unsungColor: '#6e5645',
    },
    wordReveal: { type: 'single-word' },
    motion: { scaleStart: 0.99, scaleEnd: 1.02, yStart: 2, yEnd: -2 },
    living: { type: 'pulse', amp: 0.015, period: 3.5 },
    enter: { type: 'ink-reveal', duration: 0.45 },
    exit: { type: 'ink-dry', duration: 0.55 },
    words: [
      { text: 'मुझे', time: 108.85 },
      { text: 'अपना', time: 109.7, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'बनाकर', time: 110.7 },
      { text: 'छोड़', time: 111.9 },
      { text: 'गए', time: 112.6 },
      { text: 'आए', time: 113.5, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'ना', time: 114.2, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'सँवरिया', time: 115.0 },
      { text: 'बेदरदी', time: 116.8, style: { color: '#8c2f2f' } }, // Hero word
    ],
  },
  {
    id: 'line_seg_15',
    start: 122.0,
    end: 132.0,
    text: 'रहिमन धागा प्रेम का मत तोड़ो चटकाए',
    position: { anchor: 'low-center', top: '4%', left: '20%', textAlign: 'center' },
    style: {
      fontFamily: "'Kalam', 'Rozha One', cursive, serif",
      fontSize: 'clamp(3.9rem, 9.4vw, 39.0rem)',
      fontWeight: '700',
      letterSpacing: '0.025em',
      activeColor: '#7d1e1d', // Fresh wet sindoor crimson
      sungColor: '#261c14',   // Dried warm walnut-lampblack ink
      unsungColor: '#6e5645',
    },
    wordReveal: { type: 'single-word' },
    motion: { scaleStart: 0.99, scaleEnd: 1.02, yStart: 2, yEnd: -2 },
    living: { type: 'pulse', amp: 0.015, period: 3.5 },
    enter: { type: 'ink-reveal', duration: 0.45 },
    exit: { type: 'ink-dry', duration: 0.55 },
    words: [
      { text: 'रहिमन', time: 122.05 },
      { text: 'धागा', time: 122.8, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'प्रेम', time: 123.6, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'का', time: 124.2 },
      { text: 'मत', time: 124.7, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'तोड़ो', time: 125.3, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'चटकाए', time: 126.1 },
      { text: 'रहिमन', time: 127.05 },
      { text: 'धागा', time: 127.8, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'प्रेम', time: 128.6, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'का', time: 129.2 },
      { text: 'मत', time: 129.7, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'तोड़ो', time: 130.3, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'चटकाए', time: 131.1 },
    ],
  },
  {
    id: 'line_seg_16',
    start: 132.0,
    end: 142.4,
    text: 'टूटे से फिर ना जुड़े, जुड़े गाँठ पड़ जाए',
    position: { anchor: 'top-center', top: '4%', left: '50%', textAlign: 'center' },
    style: {
      fontFamily: "'Kalam', 'Rozha One', cursive, serif",
      fontSize: 'clamp(3.9rem, 9.4vw, 39.0rem)',
      fontWeight: '700',
      letterSpacing: '0.025em',
      activeColor: '#7d1e1d', // Fresh wet sindoor crimson
      sungColor: '#261c14',   // Dried warm walnut-lampblack ink
      unsungColor: '#6e5645',
    },
    wordReveal: { type: 'single-word' },
    motion: { scaleStart: 0.99, scaleEnd: 1.02, yStart: 2, yEnd: -2 },
    living: { type: 'pulse', amp: 0.015, period: 3.5 },
    enter: { type: 'ink-reveal', duration: 0.45 },
    exit: { type: 'ink-dry', duration: 0.55 },
    words: [
      { text: 'टूटे', time: 132.05, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'से', time: 132.6 },
      { text: 'फिर', time: 133.1 },
      { text: 'ना', time: 133.6 },
      { text: 'जुड़े', time: 134.1 },
      { text: 'जुड़े', time: 134.8 },
      { text: 'गाँठ', time: 135.4, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'पड़', time: 136.0 },
      { text: 'जाए', time: 136.5 },
      { text: 'टूटे', time: 137.1, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'से', time: 137.6 },
      { text: 'फिर', time: 138.1 },
      { text: 'ना', time: 138.6 },
      { text: 'जुड़े', time: 139.1 },
      { text: 'जुड़े', time: 139.8 },
      { text: 'गाँठ', time: 140.4, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'पड़', time: 141.0 },
      { text: 'जाए', time: 141.5 },
    ],
  },
  {
    id: 'line_seg_17',
    start: 142.4,
    end: 152.8,
    text: 'गठबंधन बनाकर छोड़ गए, आए ना सँवरिया बेदरदी',
    position: { anchor: 'low-center', top: '2%', left: '60%', textAlign: 'center' },
    style: {
      fontFamily: "'Kalam', 'Rozha One', cursive, serif",
       fontSize: 'clamp(3.9rem, 9.4vw, 39.0rem)',
      fontWeight: '700',
      letterSpacing: '0.025em',
      activeColor: '#7d1e1d', // Fresh wet sindoor crimson
      sungColor: '#261c14',   // Dried warm walnut-lampblack ink
      unsungColor: '#6e5645',
    },
    wordReveal: { type: 'single-word' },
    motion: { scaleStart: 0.99, scaleEnd: 1.02, yStart: 2, yEnd: -2 },
    living: { type: 'pulse', amp: 0.015, period: 3.5 },
    enter: { type: 'ink-reveal', duration: 0.45 },
    exit: { type: 'ink-dry', duration: 0.55 },
    words: [
      { text: 'गठबंधन', time: 142.8, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'बनाकर', time: 144.3 },
      { text: 'छोड़', time: 145.7, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'गए', time: 146.5 },
      { text: 'आए', time: 147.4 },
      { text: 'ना', time: 148.1 },
      { text: 'सँवरिया', time: 148.9 },
      { text: 'बेदरदी', time: 150.7, style: { color: '#8c2f2f' } }, // Hero word
    ],
  },
  {
    id: 'line_seg_18',
    start: 152.8,
    end: 163.0,
    text: 'गठबंधन बनाकर छोड़ गए, आए ना सँवरिया बेदरदी',
    position: { anchor: 'left', top: '44%', left: '8%', textAlign: 'left' },
    style: {
      fontFamily: "'Kalam', 'Rozha One', cursive, serif",
      fontSize: 'clamp(1.9rem, 3.4vw, 3.0rem)',
      fontWeight: '700',
      letterSpacing: '0.025em',
      activeColor: '#7d1e1d', // Fresh wet sindoor crimson
      sungColor: '#261c14',   // Dried warm walnut-lampblack ink
      unsungColor: '#6e5645',
    },
    wordReveal: { type: 'single-word' },
    motion: { scaleStart: 0.99, scaleEnd: 1.02, yStart: 2, yEnd: -2 },
    living: { type: 'pulse', amp: 0.015, period: 3.5 },
    enter: { type: 'ink-reveal', duration: 0.45 },
    exit: { type: 'ink-dry', duration: 0.55 },
    words: [
      { text: 'गठबंधन', time: 152.9, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'बनाकर', time: 154.3 },
      { text: 'छोड़', time: 155.6 },
      { text: 'गए', time: 156.4 },
      { text: 'आए', time: 157.3 },
      { text: 'ना', time: 158.0 },
      { text: 'सँवरिया', time: 158.8, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'बेदरदी', time: 160.6, style: { color: '#8c2f2f' } }, // Hero word
    ],
  },
  {
    id: 'line_seg_19',
    start: 163.0,
    end: 173.0,
    text: 'मुझे अपना बनाकर छोड़ गए, आए ना सँवरिया बेदरदी',
    position: { anchor: 'top-center', top: '12%', left: '50%', textAlign: 'center' },
    style: {
      fontFamily: "'Kalam', 'Rozha One', cursive, serif",
      fontSize: 'clamp(1.9rem, 3.4vw, 3.0rem)',
      fontWeight: '700',
      letterSpacing: '0.025em',
      activeColor: '#7d1e1d', // Fresh wet sindoor crimson
      sungColor: '#261c14',   // Dried warm walnut-lampblack ink
      unsungColor: '#6e5645',
    },
    wordReveal: { type: 'single-word' },
    motion: { scaleStart: 0.99, scaleEnd: 1.02, yStart: 2, yEnd: -2 },
    living: { type: 'pulse', amp: 0.015, period: 3.5 },
    enter: { type: 'ink-reveal', duration: 0.45 },
    exit: { type: 'ink-dry', duration: 0.55 },
    words: [
      { text: 'मुझे', time: 163.05 },
      { text: 'अपना', time: 163.9, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'बनाकर', time: 164.9 },
      { text: 'छोड़', time: 166.1, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'गए', time: 166.8 },
      { text: 'आए', time: 167.7 },
      { text: 'ना', time: 168.4, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'सँवरिया', time: 169.2 },
      { text: 'बेदरदी', time: 171.0, style: { color: '#8c2f2f' } }, // Hero word
    ],
  },
  {
    id: 'line_seg_20',
    start: 173.0,
    end: 183.4,
    text: 'मुझे अपना बनाकर छोड़ गए, आए ना सँवरिया बेदरदी',
    position: { anchor: 'low-center', bottom: '12%', left: '50%', textAlign: 'center' },
    style: {
      fontFamily: "'Kalam', 'Rozha One', cursive, serif",
      fontSize: 'clamp(1.9rem, 3.4vw, 3.0rem)',
      fontWeight: '700',
      letterSpacing: '0.025em',
      activeColor: '#7d1e1d', // Fresh wet sindoor crimson
      sungColor: '#261c14',   // Dried warm walnut-lampblack ink
      unsungColor: '#6e5645',
    },
    wordReveal: { type: 'single-word' },
    motion: { scaleStart: 0.99, scaleEnd: 1.02, yStart: 2, yEnd: -2 },
    living: { type: 'pulse', amp: 0.015, period: 3.5 },
    enter: { type: 'ink-reveal', duration: 0.45 },
    exit: { type: 'ink-dry', duration: 0.55 },
    words: [
      { text: 'मुझे', time: 173.05 },
      { text: 'अपना', time: 173.9, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'बनाकर', time: 174.9 },
      { text: 'छोड़', time: 176.1 },
      { text: 'गए', time: 176.8 },
      { text: 'आए', time: 177.7 },
      { text: 'ना', time: 178.4, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'सँवरिया', time: 179.2, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'बेदरदी', time: 181.0, style: { color: '#8c2f2f' } }, // Hero word
    ],
  },
  {
    id: 'line_seg_21',
    start: 183.4,
    end: 193.6,
    text: 'लकड़ी जल कोयला भई, कोयला जल भई राख',
    position: { anchor: 'top-center', top: '12%', left: '50%', textAlign: 'center' },
    style: {
      fontFamily: "'Kalam', 'Rozha One', cursive, serif",
      fontSize: 'clamp(3.9rem, 9.4vw, 39.0rem)',
      fontWeight: '700',
      letterSpacing: '0.025em',
      activeColor: '#7d1e1d', // Fresh wet sindoor crimson
      sungColor: '#261c14',   // Dried warm walnut-lampblack ink
      unsungColor: '#6e5645',
    },
    wordReveal: { type: 'single-word' },
    motion: { scaleStart: 0.99, scaleEnd: 1.02, yStart: 2, yEnd: -2 },
    living: { type: 'pulse', amp: 0.015, period: 3.5 },
    enter: { type: 'ink-reveal', duration: 0.45 },
    exit: { type: 'ink-dry', duration: 0.55 },
    words: [
      { text: 'लकड़ी', time: 183.5 },
      { text: 'जल', time: 184.2 },
      { text: 'कोयला', time: 184.9, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'भई', time: 185.7 },
      { text: 'कोयला', time: 186.4, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'जल', time: 187.1 },
      { text: 'भई', time: 187.6 },
      { text: 'राख', time: 188.1, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'लकड़ी', time: 188.6 },
      { text: 'जल', time: 189.3 },
      { text: 'कोयला', time: 190.0, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'भई', time: 190.8 },
      { text: 'कोयला', time: 191.5, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'जल', time: 192.2 },
      { text: 'भई', time: 192.7 },
      { text: 'राख', time: 193.2, style: { color: '#8c2f2f' } }, // Hero word
    ],
  },
  {
    id: 'line_seg_22',
    start: 193.6,
    end: 204.2,
    text: 'मैं पापिन ऐसी जली ना कोयला बनी ना राख',
    position: { anchor: 'low-center', bottom: '12%', left: '50%', textAlign: 'center' },
    style: {
      fontFamily: "'Kalam', 'Rozha One', cursive, serif",
      fontSize: 'clamp(3.9rem, 9.4vw, 39.0rem)',
      fontWeight: '700',
      letterSpacing: '0.025em',
      activeColor: '#7d1e1d', // Fresh wet sindoor crimson
      sungColor: '#261c14',   // Dried warm walnut-lampblack ink
      unsungColor: '#6e5645',
    },
    wordReveal: { type: 'single-word' },
    motion: { scaleStart: 0.99, scaleEnd: 1.02, yStart: 2, yEnd: -2 },
    living: { type: 'pulse', amp: 0.015, period: 3.5 },
    enter: { type: 'ink-reveal', duration: 0.45 },
    exit: { type: 'ink-dry', duration: 0.55 },
    words: [
      { text: 'मैं', time: 193.8 },
      { text: 'पापिन', time: 194.3 },
      { text: 'ऐसी', time: 195.1, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'जली', time: 195.8, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'ना', time: 196.4, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'कोयला', time: 196.9 },
      { text: 'बनी', time: 197.7 },
      { text: 'ना', time: 198.2, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'राख', time: 198.6, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'मैं', time: 199.1 },
      { text: 'पापिन', time: 199.6 },
      { text: 'ऐसी', time: 200.4, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'जली', time: 201.1, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'ना', time: 201.7, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'कोयला', time: 202.2 },
      { text: 'बनी', time: 203.0 },
      { text: 'ना', time: 203.5, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'राख', time: 203.9, style: { color: '#8c2f2f' } }, // Hero word
    ],
  },
  {
    id: 'line_seg_23',
    start: 204.2,
    end: 214.4,
    text: 'मुझे जलती चिता में छोड़ गए, आए ना सँवरिया बेदरदी',
    position: { anchor: 'top-center', top: '12%', left: '50%', textAlign: 'center' },
    style: {
      fontFamily: "'Kalam', 'Rozha One', cursive, serif",
      fontSize: 'clamp(3.9rem, 9.4vw, 39.0rem)',
      fontWeight: '700',
      letterSpacing: '0.025em',
      activeColor: '#7d1e1d', // Fresh wet sindoor crimson
      sungColor: '#261c14',   // Dried warm walnut-lampblack ink
      unsungColor: '#6e5645',
    },
    wordReveal: { type: 'single-word' },
    motion: { scaleStart: 0.99, scaleEnd: 1.02, yStart: 2, yEnd: -2 },
    living: { type: 'pulse', amp: 0.015, period: 3.5 },
    enter: { type: 'ink-reveal', duration: 0.45 },
    exit: { type: 'ink-dry', duration: 0.55 },
    words: [
      { text: 'मुझे', time: 204.4 },
      { text: 'जलती', time: 205.3, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'चिता', time: 206.4, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'में', time: 207.1 },
      { text: 'छोड़', time: 207.8, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'गए', time: 208.6 },
      { text: 'आए', time: 209.5 },
      { text: 'ना', time: 210.2 },
      { text: 'सँवरिया', time: 211.0 },
      { text: 'बेदरदी', time: 212.8, style: { color: '#8c2f2f' } }, // Hero word
    ],
  },
  {
    id: 'line_seg_24',
    start: 214.4,
    end: 224.6,
    text: 'मुझे जलती चिता में छोड़ गए, आए ना सँवरिया बेदरदी',
    position: { anchor: 'low-center', bottom: '12%', left: '50%', textAlign: 'center' },
    style: {
      fontFamily: "'Kalam', 'Rozha One', cursive, serif",
      fontSize: 'clamp(1.9rem, 3.4vw, 3.0rem)',
      fontWeight: '700',
      letterSpacing: '0.025em',
      activeColor: '#7d1e1d', // Fresh wet sindoor crimson
      sungColor: '#261c14',   // Dried warm walnut-lampblack ink
      unsungColor: '#6e5645',
    },
    wordReveal: { type: 'single-word' },
    motion: { scaleStart: 0.99, scaleEnd: 1.02, yStart: 2, yEnd: -2 },
    living: { type: 'pulse', amp: 0.015, period: 3.5 },
    enter: { type: 'ink-reveal', duration: 0.45 },
    exit: { type: 'ink-dry', duration: 0.55 },
    words: [
      { text: 'मुझे', time: 214.5 },
      { text: 'जलती', time: 215.4, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'चिता', time: 216.4, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'में', time: 217.1 },
      { text: 'छोड़', time: 217.8 },
      { text: 'गए', time: 218.5 },
      { text: 'आए', time: 219.4 },
      { text: 'ना', time: 220.1 },
      { text: 'सँवरिया', time: 220.9, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'बेदरदी', time: 222.7, style: { color: '#8c2f2f' } }, // Hero word
    ],
  },
  {
    id: 'line_seg_25',
    start: 224.6,
    end: 234.8,
    text: 'मुझे अपना बनाकर छोड़ गए, आए ना सँवरिया बेदरदी',
    position: { anchor: 'right', top: '44%', right: '8%', textAlign: 'right' },
    style: {
      fontFamily: "'Kalam', 'Rozha One', cursive, serif",
      fontSize: 'clamp(1.9rem, 3.4vw, 3.0rem)',
      fontWeight: '700',
      letterSpacing: '0.025em',
      activeColor: '#7d1e1d', // Fresh wet sindoor crimson
      sungColor: '#261c14',   // Dried warm walnut-lampblack ink
      unsungColor: '#6e5645',
    },
    wordReveal: { type: 'single-word' },
    motion: { scaleStart: 0.99, scaleEnd: 1.02, yStart: 2, yEnd: -2 },
    living: { type: 'pulse', amp: 0.015, period: 3.5 },
    enter: { type: 'ink-reveal', duration: 0.45 },
    exit: { type: 'ink-dry', duration: 0.55 },
    words: [
      { text: 'मुझे', time: 224.7 },
      { text: 'अपना', time: 225.55, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'बनाकर', time: 226.55 },
      { text: 'छोड़', time: 227.75, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'गए', time: 228.45 },
      { text: 'आए', time: 229.35 },
      { text: 'ना', time: 230.05, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'सँवरिया', time: 230.85 },
      { text: 'बेदरदी', time: 232.65, style: { color: '#8c2f2f' } }, // Hero word
    ],
  },
  {
    id: 'line_seg_26',
    start: 234.8,
    end: 245.2,
    text: 'कागा सब तन खाइयो चुन चुन खइयो मांस',
    position: { anchor: 'low-center', bottom: '12%', left: '50%', textAlign: 'center' },
    style: {
      fontFamily: "'Kalam', 'Rozha One', cursive, serif",
      fontSize: 'clamp(3.9rem, 9.4vw, 39.0rem)',
      fontWeight: '700',
      letterSpacing: '0.025em',
      activeColor: '#7d1e1d', // Fresh wet sindoor crimson
      sungColor: '#261c14',   // Dried warm walnut-lampblack ink
      unsungColor: '#6e5645',
    },
    wordReveal: { type: 'single-word' },
    motion: { scaleStart: 0.99, scaleEnd: 1.02, yStart: 2, yEnd: -2 },
    living: { type: 'pulse', amp: 0.015, period: 3.5 },
    enter: { type: 'ink-reveal', duration: 0.45 },
    exit: { type: 'ink-dry', duration: 0.55 },
    words: [
      { text: 'कागा', time: 235.0, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'सब', time: 235.7, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'तन', time: 236.2, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'खाइयो', time: 236.8 },
      { text: 'चुन', time: 237.7 },
      { text: 'चुन', time: 238.2 },
      { text: 'खइयो', time: 238.7 },
      { text: 'मांस', time: 239.4 },
      { text: 'कागा', time: 240.1, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'सब', time: 240.8, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'तन', time: 241.3, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'खाइयो', time: 241.9 },
      { text: 'चुन', time: 242.8 },
      { text: 'चुन', time: 243.3 },
      { text: 'खइयो', time: 243.8 },
      { text: 'मांस', time: 244.5 },
    ],
  },
  {
    id: 'line_seg_27',
    start: 245.2,
    end: 256.2,
    text: 'दो नैना मत खाइयो मोहे पिया मिलन की आस',
    position: { anchor: 'low-center', bottom: '8%', left: '50%', textAlign: 'center' },
    style: {
      fontFamily: "'Kalam', 'Rozha One', cursive, serif",
      fontSize: 'clamp(3.9rem, 9.4vw, 39.0rem)',
      fontWeight: '700',
      letterSpacing: '0.025em',
      activeColor: '#7d1e1d', // Fresh wet sindoor crimson
      sungColor: '#261c14',   // Dried warm walnut-lampblack ink
      unsungColor: '#6e5645',
    },
    wordReveal: { type: 'single-word' },
    motion: { scaleStart: 0.99, scaleEnd: 1.02, yStart: 2, yEnd: -2 },
    living: { type: 'pulse', amp: 0.015, period: 3.5 },
    enter: { type: 'ink-reveal', duration: 0.45 },
    exit: { type: 'ink-dry', duration: 0.55 },
    words: [
      { text: 'दो', time: 245.3, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'नैना', time: 245.9, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'मत', time: 246.7 },
      { text: 'खाइयो', time: 247.3 },
      { text: 'मोहे', time: 248.2 },
      { text: 'पिया', time: 248.8, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'मिलन', time: 249.4, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'की', time: 250.0 },
      { text: 'आस', time: 250.4, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'दो', time: 250.9, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'नैना', time: 251.5, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'मत', time: 252.3 },
      { text: 'खाइयो', time: 252.9 },
      { text: 'मोहे', time: 253.8 },
      { text: 'पिया', time: 254.4, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'मिलन', time: 255.0, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'की', time: 255.6 },
      { text: 'आस', time: 256.0, style: { color: '#8c2f2f' } }, // Hero word
    ],
  },
  {
    id: 'line_seg_28',
    start: 256.2,
    end: 266.2,
    text: 'मोसे नैना मिलाकर छोड़ गए, आए ना सँवरिया बेदरदी',
    position: { anchor: 'top-center', top: '12%', left: '50%', textAlign: 'center' },
    style: {
      fontFamily: "'Kalam', 'Rozha One', cursive, serif",
      fontSize: 'clamp(1.9rem, 3.4vw, 3.0rem)',
      fontWeight: '700',
      letterSpacing: '0.025em',
      activeColor: '#7d1e1d', // Fresh wet sindoor crimson
      sungColor: '#261c14',   // Dried warm walnut-lampblack ink
      unsungColor: '#6e5645',
    },
    wordReveal: { type: 'single-word' },
    motion: { scaleStart: 0.99, scaleEnd: 1.02, yStart: 2, yEnd: -2 },
    living: { type: 'pulse', amp: 0.015, period: 3.5 },
    enter: { type: 'ink-reveal', duration: 0.45 },
    exit: { type: 'ink-dry', duration: 0.55 },
    words: [
      { text: 'मोसे', time: 256.3 },
      { text: 'नैना', time: 257.2, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'मिलाकर', time: 258.3, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'छोड़', time: 259.6, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'गए', time: 260.4 },
      { text: 'आए', time: 261.3 },
      { text: 'ना', time: 262.0, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'सँवरिया', time: 262.8 },
      { text: 'बेदरदी', time: 264.6, style: { color: '#8c2f2f' } }, // Hero word
    ],
  },
  {
    id: 'line_seg_29',
    start: 266.2,
    end: 276.4,
    text: 'मोसे नैना मिलाकर छोड़ गए, आए ना सँवरिया बेदरदी',
    position: { anchor: 'low-center', bottom: '12%', left: '50%', textAlign: 'center' },
    style: {
      fontFamily: "'Kalam', 'Rozha One', cursive, serif",
      fontSize: 'clamp(1.9rem, 3.4vw, 3.0rem)',
      fontWeight: '700',
      letterSpacing: '0.025em',
      activeColor: '#7d1e1d', // Fresh wet sindoor crimson
      sungColor: '#261c14',   // Dried warm walnut-lampblack ink
      unsungColor: '#6e5645',
    },
    wordReveal: { type: 'single-word' },
    motion: { scaleStart: 0.99, scaleEnd: 1.02, yStart: 2, yEnd: -2 },
    living: { type: 'pulse', amp: 0.015, period: 3.5 },
    enter: { type: 'ink-reveal', duration: 0.45 },
    exit: { type: 'ink-dry', duration: 0.55 },
    words: [
      { text: 'मोसे', time: 266.3 },
      { text: 'नैना', time: 267.2, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'मिलाकर', time: 268.2 },
      { text: 'छोड़', time: 269.5 },
      { text: 'गए', time: 270.3 },
      { text: 'आए', time: 271.2 },
      { text: 'ना', time: 271.9, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'सँवरिया', time: 272.7, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'बेदरदी', time: 274.5, style: { color: '#8c2f2f' } }, // Hero word
    ],
  },
  {
    id: 'line_seg_30',
    start: 276.4,
    end: 287.0,
    text: 'मुझे अपना बनाकर छोड़ गए, आए ना सँवरिया बेदरदी',
    position: { anchor: 'center', top: '50%', left: '50%', textAlign: 'center' },
    style: {
      fontFamily: "'Kalam', 'Rozha One', cursive, serif",
      fontSize: 'clamp(2.1rem, 3.8vw, 3.4rem)',
      fontWeight: '700',
      letterSpacing: '0.025em',
      activeColor: '#7d1e1d', // Fresh wet sindoor crimson
      sungColor: '#261c14',   // Dried warm walnut-lampblack ink
      unsungColor: '#6e5645',
    },
    wordReveal: { type: 'single-word' },
    motion: { scaleStart: 0.99, scaleEnd: 1.02, yStart: 2, yEnd: -2 },
    living: { type: 'pulse', amp: 0.015, period: 3.5 },
    enter: { type: 'ink-reveal', duration: 0.45 },
    exit: { type: 'ink-dry', duration: 0.55 },
    words: [
      { text: 'मुझे', time: 276.5 },
      { text: 'अपना', time: 277.35, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'बनाकर', time: 278.35 },
      { text: 'छोड़', time: 279.55, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'गए', time: 280.25 },
      { text: 'आए', time: 281.15 },
      { text: 'ना', time: 281.85, style: { color: '#8c2f2f' } }, // Hero word
      { text: 'सँवरिया', time: 282.65 },
      { text: 'बेदरदी', time: 284.45, style: { color: '#8c2f2f' } }, // Hero word
    ],
  },
]
