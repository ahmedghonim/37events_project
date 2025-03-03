import React, { Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef } from "react";

function GLTFModel({ glbPath }) {
  // Reference for rotation
  const ref = useRef();

  // Load the GLTF model
  const { scene } = useGLTF(glbPath);

  // Animate rotation
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01; // Adjust rotation speed
    }
  });

  return <primitive ref={ref} object={scene} scale={[3,3,3]} />;
}

export default function Scene() {
  return (
    <div className="lg:w-[600px] lg:h-[600px] size-[250px] ">
      <Canvas>
        <Suspense fallback={null}>
          {/* Brighter and whiter ambient light */}
          <ambientLight intensity={1.5} color="white" /> 

          {/* Stronger directional light for focused brightness */}
          <directionalLight 
            position={[10, 20, 10]} 
            intensity={2.5} 
            color="white" 
            castShadow 
          />

          {/* Additional point lights for even distribution */}
          <pointLight 
            position={[-15, 15, -15]} 
            intensity={2.0} 
            color="white" 
          />
          <pointLight 
            position={[15, -15, 15]} 
            intensity={1.8} 
            color="white" 
          />

          {/* SpotLight for enhanced focus */}
          <spotLight 
            position={[0, 30, 10]} 
            intensity={2.0} 
            angle={Math.PI / 6} 
            penumbra={0.5} 
            color="white" 
          />

          {/* Load the GLTF model */}
          <GLTFModel
            glbPath="/react/images/3dmodale.glb"
          />

          {/* Camera controls */}
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
}
