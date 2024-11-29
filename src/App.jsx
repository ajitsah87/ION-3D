
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Center } from '@react-three/drei'
import Model from './Components/Model'

export default function App() {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      {/* Video Background with responsive sizing */}
      <video 
        autoPlay 
        muted 
        loop 
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source 
          src="./src/assets/video1.mp4" 
          type="video/mp4"
        />
      </video>

      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* 3D Canvas */}
      <Canvas
        camera={{
          position: [0, 0, 4], // Adjusted camera position
          fov: 50, // Narrower FOV for better perspective
          near: 0.1,
          far: 1000,
        }}
      >
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.5}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 2.5}
          enableZoom={false}
          enablePan={false}
        />

        {/* Enhanced lighting setup */}
        <ambientLight intensity={0.6} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={1.5} 
          castShadow
        />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#ffffff" />
        <pointLight position={[10, -10, 10]} intensity={0.8} color="#ffffff" />

        <Environment
          preset="studio"
          background={false}
          intensity={2}
        />

          <Model />
       

      </Canvas>
      <div className="fixed bottom-[10%] w-full flex flex-col items-center justify-center text-center text-white">
        <h1 className="text-xl md:text-4xl font-bold tracking-widest mb-4">
          COMING SOON
        </h1>
        <img
          src="./src/assets/Vector.png" 
          alt="Logo"
          className="w-8 " 
        />
    
      </div>
    </div>
  )
}

