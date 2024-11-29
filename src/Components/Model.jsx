
import { useRef, useEffect, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Model() {
  const modelRef = useRef()
  const { scene } = useGLTF('./src/assets/model.glb')

  const [baseScale, setBaseScale] = useState(() => {
    return window.innerWidth < 578 ? 1.5 : 1.8
  })

  useEffect(() => {
    if (modelRef.current) {
      const box = new THREE.Box3().setFromObject(modelRef.current)
      const center = new THREE.Vector3()
      const size = new THREE.Vector3()

      box.getCenter(center)
      box.getSize(size)

      const maxDimension = Math.max(size.x, size.y, size.z)
      const scale = baseScale / maxDimension // Adjusted scale for better fit

      modelRef.current.scale.setScalar(scale)
      modelRef.current.position.copy(center).multiplyScalar(-1)

      // Adjust vertical position
      modelRef.current.position.y = -size.y * scale /2
      // Enhanced material settings for silver shine
      modelRef.current.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshPhysicalMaterial({
            metalness: 0.95,
            roughness: 0.05,
            color: new THREE.Color('#E8E8E8'),
            emissive: new THREE.Color('#131313').multiplyScalar(0.1),
            envMapIntensity: 2.5,
            clearcoat: 1.0,
            clearcoatRoughness: 0.05,
            reflectivity: 1.0,
            ior: 2.33,
          })
          
          child.castShadow = true
          child.receiveShadow = true
          child.material.needsUpdate = true
        }
      })
    }
  }, [scene, baseScale])


  // Smooth rotation animation
  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.7
    }
  })

  return <primitive ref={modelRef} object={scene} />
}


