import { OrbitControls, Environment, Sparkles } from "@react-three/drei";
import ModelEnvironement from "./Environement";
const Experience = () => {
	
	return (
		<>
		<OrbitControls makeDefault />
		<Sparkles
          size={6}
          scale={[10, 10, 20]}
          position-y={1}
          speed={0.4}
          count={200}
        />
		<Environment background files={"./baked.hdr"}  />
		<directionalLight
        color="pink" // La couleur de la lumière
        intensity={3} // L'intensité de la lumière
        position={[3, 3, 0.5]} // La position de la lumière
		castShadow
      />
		<ambientLight/>
		<ModelEnvironement/>
		</>
	);
};

export default Experience;