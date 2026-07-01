import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

const AnimatedCore = () => {
    const sphereRef = useRef<Mesh>(null);

    useFrame(({ clock }) => {
        if (sphereRef.current) {
            const elapsed = clock.getElapsedTime();
            sphereRef.current.rotation.y = elapsed * 0.2;
            sphereRef.current.rotation.x = elapsed * 0.1;
            sphereRef.current.scale.setScalar(2.35 + Math.sin(elapsed * 1.5) * 0.05);
        }
    });

    return (
        <mesh ref={sphereRef}>
            <sphereGeometry args={[1, 100, 100]} />
            <meshStandardMaterial
                color="#a855f7"
                roughness={0.2}
                metalness={0.8}
                emissive="#581c87"
                emissiveIntensity={0.5}
            />
        </mesh>
    );
};

const NeuralCore3D = () => {
    return (
        <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
            <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <pointLight position={[-10, -10, -5]} color="#22d3ee" intensity={1} />
                <AnimatedCore />
            </Canvas>
        </div>
    );
};

export default NeuralCore3D;
