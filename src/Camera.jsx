import { PerspectiveCamera } from "@react-three/drei";

const Camera = () => {
	return (
		<PerspectiveCamera
			makeDefault 
			position={[ 0, 1, 13]}
			/>
	);
};

export default Camera;