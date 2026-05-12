import { Canvas, useFrame } from "@react-three/fiber";

import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random";

import { useRef } from "react";

const NeuralParticles = () => {
  const ref = useRef();

  // Generate random particles
  const sphere = random.inSphere(new Float32Array(5000), { radius: 1.8 });

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 20;

    ref.current.rotation.y -= delta / 25;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#00ffff"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const NeuralBackground = () => {
  return (
    <div
      className="
    fixed
    top-0
    left-0
    w-full
    h-full
    z-0
    opacity-60
    "
    >
      <Canvas camera={{ position: [0, 0, 1] }}>
        {/* Ambient light */}
        <ambientLight intensity={0.5} />

        {/* Floating particles */}
        <NeuralParticles />
      </Canvas>
    </div>
  );
};

export default NeuralBackground;
