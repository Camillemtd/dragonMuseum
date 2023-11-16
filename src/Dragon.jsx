import { useGLTF } from "@react-three/drei";

const Dragon = () => {
	const dragonStatue = useGLTF("./model/dragonstatut.glb");
	const dragonGeometry = dragonStatue.nodes.model.geometry;
	const dragonMaterial = dragonStatue.nodes.model.material;
	return (
		<mesh
        geometry={dragonGeometry}
        material={dragonMaterial}
        rotation-y={Math.PI}
        position={[0.2, 2.6, 12.5]}
        scale={3.8}
      >
        {/* <meshMatcapMaterial matcap={matcapTexture} color={"#d9d9d9"} /> */}
      </mesh>
	)
};

export default Dragon;