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
        position={[0.6, 2.2, 15]}
        scale={4}
      >
        {/* <meshMatcapMaterial matcap={matcapTexture} color={"#d9d9d9"} /> */}
      </mesh>
	)
};

export default Dragon;