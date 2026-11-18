import * as THREE from 'three'
import { VERTEX_CLOTH_SHADER, CUTOUT_FRAGMENT_SHADER } from './shaders.js'
import { resolveAssetUrl } from '../systems/assetUrl.js'

/**
 * 2.5D Multi-Plane Cinema Stage (Three.js WebGL Engine)
 * Handles Z-Space camera parallax, mesh cloth dynamics, optical halation, and deterministic time sync.
 */
export class CinemaStage {
  constructor(containerElement, width = 1920, height = 1080) {
    this.container = containerElement
    this.width = width
    this.height = height

    // 1. WebGL Renderer
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true,
    })
    this.renderer.setSize(this.width, this.height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.08

    this.domElement = this.renderer.domElement
    this.domElement.className = 'cinema-webgl-canvas'
    this.domElement.style.position = 'absolute'
    this.domElement.style.inset = '0'
    this.domElement.style.width = '100%'
    this.domElement.style.height = '100%'
    this.domElement.style.pointerEvents = 'none'
    this.domElement.style.zIndex = '2'

    // 2. 3D Scene & Perspective Camera
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(36, this.width / this.height, 0.1, 2000)
    this.camera.position.set(0, 0, 1000)

    // 3. Lighting (Warm Diya & Ambient Sun)
    this.ambientLight = new THREE.AmbientLight(0xfff3e0, 1.2)
    this.scene.add(this.ambientLight)

    this.rimLight = new THREE.DirectionalLight(0xffdf99, 1.4)
    this.rimLight.position.set(300, 400, 500)
    this.scene.add(this.rimLight)

    // Cache texture loader
    this.textureLoader = new THREE.TextureLoader()
    this.textureCache = new Map()
    this.layerMeshes = new Map()

    this.container.appendChild(this.domElement)
  }

  getTexture(src) {
    if (!src) return null
    const resolved = resolveAssetUrl(src)
    if (this.textureCache.has(resolved)) return this.textureCache.get(resolved)

    const tex = this.textureLoader.load(resolved)
    tex.generateMipmaps = true
    tex.minFilter = THREE.LinearMipmapLinearFilter
    tex.magFilter = THREE.LinearFilter
    this.textureCache.set(resolved, tex)
    return tex
  }

  /**
   * Sync active layers from timeline to WebGL Meshes with Vertex Cloth Simulation
   */
  updateLayers(activeShots, time, reduceMotion = false) {
    const activeLayerIds = new Set()

    activeShots.forEach(({ shot, opacity: shotOpacity }) => {
      if (!Array.isArray(shot.layers)) return

      shot.layers.forEach((layer) => {
        const lStart = layer.start ?? shot.start
        const lEnd = layer.end ?? shot.end
        if (time < lStart || time > lEnd) return

        const layerId = layer.id || `${shot.id}-${layer.src}`
        activeLayerIds.add(layerId)

        // Progress 0..1
        const dur = Math.max(0.1, lEnd - lStart)
        const p = Math.max(0, Math.min(1, (time - lStart) / dur))

        let meshObj = this.layerMeshes.get(layerId)
        if (!meshObj) {
          const texture = this.getTexture(layer.src)
          // Subdivided grid for natural cloth wave physics (32x32 vertices)
          const geometry = new THREE.PlaneGeometry(600, 800, 32, 32)
          const material = new THREE.ShaderMaterial({
            vertexShader: VERTEX_CLOTH_SHADER,
            fragmentShader: CUTOUT_FRAGMENT_SHADER,
            uniforms: {
              uTexture: { value: texture },
              uTime: { value: time },
              uWindSpeed: { value: 1.4 },
              uWindAmp: { value: 16.0 },
              uBreatheAmp: { value: 3.5 },
              uOpacity: { value: 1.0 },
              uRimColor: { value: new THREE.Color(0xffdf99) },
              uRimStrength: { value: 0.65 },
              uTint: { value: new THREE.Color(1.0, 1.0, 1.0) },
            },
            transparent: true,
            depthWrite: false,
            side: THREE.DoubleSide,
          })

          const mesh = new THREE.Mesh(geometry, material)
          this.scene.add(mesh)
          meshObj = { mesh, material, geometry, layer }
          this.layerMeshes.set(layerId, meshObj)
        }

        // 1. Calculate Opacity with Enter/Exit
        let opacity = 1.0
        const enterDur = layer.enter?.duration || 0.4
        const exitDur = layer.exit?.duration || 0.4
        const timeFromStart = time - lStart
        const timeFromEnd = lEnd - time

        if (timeFromStart < enterDur) {
          opacity = timeFromStart / enterDur
        } else if (timeFromEnd < exitDur) {
          opacity = timeFromEnd / exitDur
        }
        meshObj.material.uniforms.uOpacity.value = opacity * shotOpacity

        // 2. Position & Scale Mapping to 3D Space
        const pos = layer.position || {}
        const motion = layer.motion || {}

        // Base width calculation
        let widthPct = 0.4
        if (pos.width) {
          widthPct = parseFloat(pos.width) / 100 || 0.4
        }
        const baseScale = widthPct * 2.2

        let scale = baseScale
        let posX = 0
        let posY = -100

        // Motion interpolation (scaleStart -> scaleEnd, travel x/y)
        if (motion.scaleStart != null && motion.scaleEnd != null) {
          scale *= motion.scaleStart + (motion.scaleEnd - motion.scaleStart) * p
        }
        if (motion.xStart != null && motion.xEnd != null) {
          posX += (motion.xStart + (motion.xEnd - motion.xStart) * p) * 1.5
        }
        if (motion.yStart != null && motion.yEnd != null) {
          posY += (motion.yStart + (motion.yEnd - motion.yStart) * p) * 1.5
        }

        // Horizontal position
        if (pos.left != null) {
          const lPct = parseFloat(pos.left) / 100
          posX = (lPct - 0.5) * 1600 + 200
        } else if (pos.right != null) {
          const rPct = parseFloat(pos.right) / 100
          posX = (0.5 - rPct) * 1600 - 200
        }

        // Vertical position
        if (pos.bottom != null) {
          const bPct = parseFloat(pos.bottom) / 100
          posY = (bPct - 0.5) * 900 - 150
        } else if (pos.top != null) {
          const tPct = parseFloat(pos.top) / 100
          posY = (0.5 - tPct) * 900 + 150
        }

        // Multi-plane Z-Depth (Radha z=20, Krishna z=0)
        const zDepth = (layer.zIndex || 2) * 20

        meshObj.mesh.position.set(posX, posY, zDepth)
        meshObj.mesh.scale.set(scale, scale, 1)

        // Update uniforms for cloth simulation
        meshObj.material.uniforms.uTime.value = time
        meshObj.mesh.visible = true
      })
    })

    // Hide inactive layers
    this.layerMeshes.forEach((meshObj, id) => {
      if (!activeLayerIds.has(id)) {
        meshObj.mesh.visible = false
      }
    })

    // Smooth Camera motion
    if (!reduceMotion && activeShots.length > 0) {
      const currentShot = activeShots[0].shot
      if (currentShot.camera) {
        const cDur = Math.max(0.1, currentShot.end - currentShot.start)
        const cP = Math.max(0, Math.min(1, (time - currentShot.start) / cDur))
        const cScale = (currentShot.camera.scaleStart || 1.0) + ((currentShot.camera.scaleEnd || 1.05) - (currentShot.camera.scaleStart || 1.0)) * cP
        this.camera.position.z = 1000 / cScale
      }
    }

    this.renderer.render(this.scene, this.camera)
  }

  resize(width, height) {
    this.width = width
    this.height = height
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
  }

  destroy() {
    if (this.domElement && this.domElement.parentNode) {
      this.domElement.parentNode.removeChild(this.domElement)
    }
    this.renderer.dispose()
    this.layerMeshes.forEach(({ geometry, material }) => {
      geometry.dispose()
      material.dispose()
    })
    this.layerMeshes.clear()
    this.textureCache.clear()
  }
}
