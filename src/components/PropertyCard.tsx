import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import type { Property } from '../types'

interface PropertyCardProps {
  property: Property
  extended?: boolean
}

const vertexShader = `
  uniform float uTilt;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 pos = position;
    float tiltFactor = uTilt;
    float yTilted = pos.z * sin(tiltFactor) + pos.y * cos(tiltFactor);
    float zTilted = pos.z * cos(tiltFactor) - pos.y * sin(tiltFactor);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos.x, yTilted, zTilted, 1.0);
  }
`

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec3 uColor;
  varying vec2 vUv;
  void main() {
    vec4 tex = texture2D(uTexture, vUv);
    vec3 finalColor = mix(tex.rgb, uColor, 0.05);
    gl_FragColor = vec4(finalColor, tex.a);
  }
`

export default function PropertyCard({ property, extended = false }: PropertyCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setSize(400, 250)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    rendererRef.current = renderer

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 400 / 250, 0.1, 100)
    camera.position.set(0, 0, 5)

    const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
    scene.add(ambientLight)

    const keyLight = new THREE.PointLight(0xFFEDD7, 1.0, 100)
    keyLight.position.set(5, 5, 5)
    scene.add(keyLight)

    const fillLight = new THREE.PointLight(0x00523C, 0.4, 100)
    fillLight.position.set(-5, -5, 5)
    scene.add(fillLight)

    const loader = new THREE.TextureLoader()
    loader.load(property.image, (texture) => {
      texture.minFilter = THREE.LinearFilter
      texture.magFilter = THREE.LinearFilter

      const geometry = new THREE.PlaneGeometry(3.2, 2.0, 1, 1)
      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTexture: { value: texture },
          uColor: { value: new THREE.Color(0xFFEDD7) },
          uTilt: { value: 0.35 },
        },
        transparent: true,
        side: THREE.DoubleSide,
      })
      materialRef.current = material

      const mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)

      renderer.render(scene, camera)
    })

    return () => {
      renderer.dispose()
    }
  }, [property.image])

  useEffect(() => {
    if (materialRef.current) {
      const targetTilt = hovered ? 0.5 : 0.35
      materialRef.current.uniforms.uTilt.value = targetTilt
      rendererRef.current?.render(
        (rendererRef.current as any).scene || new THREE.Scene(),
        (rendererRef.current as any).camera || new THREE.PerspectiveCamera()
      )
    }
  }, [hovered])

  const handleMouseEnter = () => setHovered(true)
  const handleMouseLeave = () => setHovered(false)

  return (
    <div
      className="group cursor-pointer overflow-hidden rounded bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative overflow-hidden">
        <canvas
          ref={canvasRef}
          width={400}
          height={250}
          className="h-[250px] w-full object-cover"
        />
        {property.isNew && (
          <span className="absolute left-3 top-3 rounded bg-[#00523C] px-2.5 py-1 font-['Inter'] text-[13px] font-medium text-white">
            NEW
          </span>
        )}
      </div>
      <div className="p-5">
        <p className="font-['Newsreader'] text-4xl font-light text-[#00523C]">
          {property.price}
        </p>
        <h3 className="mt-1 font-['Newsreader'] text-2xl font-light text-[#212121]">
          {property.address}
        </h3>
        <p className="mt-1 font-['Inter'] text-[13px] text-[#888888]">
          {property.beds} bed &middot; {property.baths} bath &middot; {property.sqft.toLocaleString()} sqft
          {property.acres ? ` &middot; ${property.acres} acres` : ''}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00523C]" />
          <span className="font-['Inter'] text-[13px] text-[#00523C]">{property.neighborhood}</span>
          {extended && property.mls && (
            <span className="ml-auto font-['Inter'] text-[13px] text-[#888888]">
              MLS #{property.mls}
            </span>
          )}
        </div>
        {extended && property.description && (
          <p className="mt-2 line-clamp-2 font-['Inter'] text-[13px] leading-relaxed text-[#888888]">
            {property.description}
          </p>
        )}
        {extended && property.features && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {property.features.slice(0, 4).map((f) => (
              <span
                key={f}
                className="rounded bg-[#F8F8F8] px-2 py-1 font-['Inter'] text-[13px] text-[#212121]"
              >
                {f}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
