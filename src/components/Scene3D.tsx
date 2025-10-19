import { OrbitControls, Float } from "@react-three/drei";
import { useMemo } from "react";

function RoboticArm() {
  return (
    <group>
      {/* Base */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.8, 0.5, 32]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Lower arm */}
      <mesh position={[0, 1.5, 0]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.4, 2.5, 0.4]} />
        <meshStandardMaterial color="#06b6d4" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Joint 1 */}
      <mesh position={[0.9, 2.6, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color="#3b82f6" metalness={0.9} roughness={0.1} emissive="#3b82f6" emissiveIntensity={0.2} />
      </mesh>

      {/* Upper arm */}
      <mesh position={[1.8, 3.5, 0]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.35, 2, 0.35]} />
        <meshStandardMaterial color="#06b6d4" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Joint 2 */}
      <mesh position={[1.6, 4.5, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#10b981" metalness={0.9} roughness={0.1} emissive="#10b981" emissiveIntensity={0.2} />
      </mesh>

      {/* Gripper base */}
      <mesh position={[1.6, 5.2, 0]}>
        <boxGeometry args={[0.3, 0.6, 0.3]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Gripper fingers */}
      <mesh position={[1.4, 5.5, 0]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.15, 0.8, 0.15]} />
        <meshStandardMaterial color="#06b6d4" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[1.8, 5.5, 0]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.15, 0.8, 0.15]} />
        <meshStandardMaterial color="#06b6d4" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Accent lights */}
      <pointLight position={[0.9, 2.6, 0]} color="#3b82f6" intensity={2} distance={3} />
      <pointLight position={[1.6, 4.5, 0]} color="#10b981" intensity={2} distance={3} />
    </group>
  );
}

function Drone() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group>
        {/* Central body */}
        <mesh>
          <boxGeometry args={[1.5, 0.4, 1.5]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Arms with propellers */}
        {[
          { pos: [1, 0.2, 1], rot: 0 },
          { pos: [-1, 0.2, 1], rot: Math.PI / 2 },
          { pos: [-1, 0.2, -1], rot: Math.PI },
          { pos: [1, 0.2, -1], rot: -Math.PI / 2 },
        ].map((prop, i) => (
          <group key={i} position={prop.pos as [number, number, number]}>
            {/* Arm */}
            <mesh position={i % 2 === 0 ? [-0.5, 0, 0] : [0.5, 0, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 1.2, 16]} />
              <meshStandardMaterial color="#06b6d4" metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Motor */}
            <mesh position={i % 2 === 0 ? [-1, 0, 0] : [1, 0, 0]}>
              <cylinderGeometry args={[0.15, 0.2, 0.3, 16]} />
              <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.2} emissive="#3b82f6" emissiveIntensity={0.3} />
            </mesh>
            {/* Propeller */}
            <mesh position={i % 2 === 0 ? [-1, 0.2, 0] : [1, 0.2, 0]} rotation={[0, prop.rot, 0]}>
              <boxGeometry args={[1.2, 0.05, 0.15]} />
              <meshStandardMaterial color="#10b981" metalness={0.7} roughness={0.3} transparent opacity={0.7} />
            </mesh>
            <pointLight position={i % 2 === 0 ? [-1, 0, 0] : [1, 0, 0]} color="#3b82f6" intensity={1} distance={2} />
          </group>
        ))}

        {/* Camera gimbal */}
        <mesh position={[0, -0.4, 0]}>
          <sphereGeometry args={[0.25, 32, 32]} />
          <meshStandardMaterial color="#06b6d4" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </Float>
  );
}

function LoadingSpinner() {
  return (
    <group>
      <mesh>
        <torusGeometry args={[2, 0.3, 16, 100]} />
        <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.5} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[2.3, 0.2, 16, 100]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

interface Scene3DProps {
  isLoading: boolean;
  machineType?: "robot" | "drone" | null;
}

export function Scene3D({ isLoading, machineType }: Scene3DProps) {
  // Memoize the scene content to prevent unnecessary re-renders
  const SceneContent = useMemo(() => {
    if (isLoading) {
      return (
        <Float speed={4} rotationIntensity={2}>
          <LoadingSpinner />
        </Float>
      );
    }
    
    if (machineType === "drone") {
      return <Drone />;
    }
    
    return <RoboticArm />;
  }, [isLoading, machineType]);

  return (
    <>
      <OrbitControls
        enablePan={false}
        minDistance={5}
        maxDistance={15}
        maxPolarAngle={Math.PI / 2}
      />

      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
      <pointLight position={[-10, -10, -5]} color="#06b6d4" intensity={0.5} />
      <hemisphereLight args={["#ffffff", "#0f172a", 0.5]} />

      {SceneContent}

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Grid helper effect */}
      <gridHelper args={[20, 20, "#06b6d4", "#1e293b"]} position={[0, 0.01, 0]} />
    </>
  );
}
