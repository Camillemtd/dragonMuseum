import { OrbitControls, Environment, Sparkles } from "@react-three/drei";
import ModelEnvironement from "./Environement";
import Camera from "./Camera"
const Experience = () => {
	
	return (
		<>
		{/* <OrbitControls makeDefault /> */}
		<Camera/>
		<Sparkles
          size={3}
          scale={[10, 10, 20]}
          position-y={1}
          speed={0.6}
          count={200}
        />
		<Environment background files={"./baked.hdr"}  />
		<directionalLight
        color="pink" // La couleur de la lumière
        intensity={3} // L'intensité de la lumière
        position={[3, 2, 0.5]} // La position de la lumière
		castShadow
      />
		<ModelEnvironement/>
		<ambientLight intensity={0.5}/>
		</>
	);
};

export default Experience;