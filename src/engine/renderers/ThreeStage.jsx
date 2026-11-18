import { useEffect, useRef } from 'react'
import { CinemaStage } from '../three/CinemaStage.js'

/**
 * ThreeStage Component
 * Connects Three.js WebGL 2.5D Stage seamlessly into React Stage viewport.
 */
export default function ThreeStage({ activeShots = [], time = 0, reduceMotion = false }) {
  const containerRef = useRef(null)
  const cinemaStageRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const stage = new CinemaStage(containerRef.current, 1920, 1080)
    cinemaStageRef.current = stage

    const handleResize = () => {
      if (containerRef.current && cinemaStageRef.current) {
        const { clientWidth, clientHeight } = containerRef.current
        if (clientWidth > 0 && clientHeight > 0) {
          cinemaStageRef.current.resize(clientWidth, clientHeight)
        }
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      stage.destroy()
      cinemaStageRef.current = null
    }
  }, [])

  // Sync animation every frame
  useEffect(() => {
    if (cinemaStageRef.current) {
      cinemaStageRef.current.updateLayers(activeShots, time, reduceMotion)
    }
  }, [activeShots, time, reduceMotion])

  return (
    <div
      ref={containerRef}
      className="cinema-webgl-container"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
        overflow: 'hidden',
      }}
    />
  )
}
