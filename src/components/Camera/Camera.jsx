import { PerspectiveCamera } from "@react-three/drei";

const Camera = () => {
	return (
		<PerspectiveCamera
			makeDefault 
			position={[ 0, 1, 13]}
			rotation-y={0.01}
			/>
	);
};

export default Camera;