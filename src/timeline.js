// Re-export modular timeline definitions
export { meta, TOTAL_DURATION, sections } from './timeline/meta.js'
export { credits } from './timeline/credits.js'
export { tracks } from './timeline/tracks.js'
export { shots } from './timeline/shots.js'
export { shotLayers, shotLayers as layers } from './timeline/layers.js'
export { lyricLines, lyricLines as lyrics } from './timeline/lyrics.js'

import { meta, sections } from './timeline/meta.js'
import { credits } from './timeline/credits.js'
import { tracks } from './timeline/tracks.js'
import { shots, shotLayers } from './timeline/shots.js'
import { lyricLines } from './timeline/lyrics.js'

export const songScript = {
  meta,
  sections,
  shots,
  shotLayers,
  layers: shotLayers,
  lyricLines,
  lyrics: lyricLines,
  tracks,
  credits,
}

export default songScript
