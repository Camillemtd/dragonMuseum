import { OrbitControls, Environment, Sparkles } from "@react-three/drei";
import ModelEnvironement from "../Model/Environement";
import Camera from "../Camera/Camera"
import { useEffect, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three'
const Experience = ({setScrollVisible, setOpenLair, updateLairData, openLair}) => {
	const [cameraPosition, setCameraPosition] = useState([0, 1, 13]);
    const { camera } = useThree();
    const handleMouseWheel = (event) => {
        // Vous pouvez ajuster cette logique en fonction de vos besoins
        // Par exemple, utiliser event.deltaY pour déterminer la direction et la quantité de déplacement
        let newPositionZ = cameraPosition[2] + (event.deltaY > 0 ? -0.1 : 0.1);
        newPositionZ = Math.max(-3, Math.min(newPositionZ, 13)); // Limiter entre -3 et 13

        setCameraPosition([0, 1, newPositionZ]);
    };
   if(cameraPosition[2] <= 12){
    setScrollVisible(true)
   } else {
    setScrollVisible(false)
   }

    useEffect(() => {
        window.addEventListener('wheel', handleMouseWheel);
        return () => {
            window.removeEventListener('wheel', handleMouseWheel);
        };
    }, [cameraPosition]);

    useFrame(() => {
        // Interpolation pour un mouvement fluide
        camera.position.lerp(new THREE.Vector3(0, 1, cameraPosition[2]), 0.1);

        
    });
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
		<Environment background files={"./baked.hdr"} />
		<directionalLight
        color="#faedcd" // La couleur de la lumière
        intensity={3} // L'intensité de la lumière
        position={[3, 2, 0.5]} // La position de la lumière
		castShadow
      />
		<ModelEnvironement introVisible={cameraPosition[2]} setOpenLair={setOpenLair} updateLairData={updateLairData} openLair={openLair}/>
		<ambientLight intensity={0.5}/>
		</>
	);
};

export default Experience;