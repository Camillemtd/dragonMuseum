import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const Environement = () => {
  const glb = useGLTF("./model/dragon.glb");
  const dragonStatue = useGLTF("./model/dragonstatut.glb");
  const dragonGeometry = dragonStatue.nodes.model.geometry;
  const dragonMaterial = dragonStatue.nodes.model.material;
  console.log(glb);
  const floorTexture = useTexture(
    "./texture/floor/Wall_Stone_019_basecolor.jpg"
  );
  const floorNormal = useTexture("./texture/floor/Wall_Stone_019_normal.jpg");
  const floorAmbient = useTexture(
    "./texture/floor/Wall_Stone_019_ambientOcclusion.jpg"
  );
  const floorHight = useTexture("./texture/floor/Wall_Stone_019_height.png");
  const floorRoughness = useTexture(
    "./texture/floor/Wall_Stone_019_roughness.jpg"
  );

  const sphereMaterial = new THREE.MeshStandardMaterial();
  const sphereGeometry = new THREE.SphereGeometry(1, 32, 16);

  const positions = [
    { x: 3, y: 5, z: -6 },
    { x: -3, y: 2, z: -7.5 },
    { x: 5, y: 4, z: -7 },
    { x: -4, y: 5, z: -6 },
    { x: 3, y: 2, z: -7.5 },
  ];
  const scales = [0.3, 0.9, 0.5, 0.4, 0.8];

  const meshRefs = [useRef(), useRef(), useRef(), useRef(), useRef()];

  const speed = 0.004;

  useFrame(() => {
    meshRefs.forEach((ref) => {
      if (ref.current) {
        if (ref.current.position.y >= 6 || ref.current.position.y <= 0.5) {
          ref.current.userData.direction *= -1;
        }
        ref.current.position.y += ref.current.userData.direction * speed;
      }
    });
  });

  return (
    <group position={[0, -2, -1]} rotation-y={Math.PI} scale={1}>
      {Object.keys(glb.nodes).map((key, index) => {
        const object = glb.nodes[key];
        if (
          object.isMesh &&
          object.name !== "floor" &&
          object.name !== "floor2" &&
          object.name !== "water"
        ) {
          return (
            <primitive
              key={index}
              object={object}
              castShadow
              receiveShadow
              map={floorTexture}
            />
          );
        }
      })}
      <mesh
        rotation-y={Math.PI}
        rotation-x={Math.PI * 0.5}
        receiveShadow
        castShadow
        position-z={-4}
      >
        <planeGeometry args={[20, 20, 100, 100]} />
        <meshPhysicalMaterial
          roughness={0.5}
          metalness={0.3}
          aoMap={floorAmbient}
          aoMapIntensity={0.3}
          displacementMap={floorHight}
          displacementScale={0.1}
          //   roughnessMap={floorRoughness}
          normalMap={floorNormal}
          normalScale={[0.5, 0.5]}
          color={"#fff8c7"}
          receiveShadow
          castShadow
        />
      </mesh>
      <mesh
        rotation-y={Math.PI}
        rotation-x={Math.PI * 0.5}
        receiveShadow
        castShadow
        position={[0, -0.1, 12]}
      >
        <circleGeometry args={[8.5, 32]} />
        <meshPhysicalMaterial
          roughness={0.5}
          metalness={0.3}
          aoMap={floorAmbient}
          aoMapIntensity={0.3}
          displacementMap={floorHight}
          displacementScale={0.15}
          roughnessMap={floorRoughness}
          normalMap={floorNormal}
          normalScale={[1, 1]}
          color={"#fff8c7"}
          receiveShadow
          castShadow
        />
      </mesh>
      <mesh
        geometry={dragonGeometry}
        material={dragonMaterial}
        rotation-y={Math.PI}
        position={[0.2, 2.6, 12.5]}
        scale={3.8}
      />
      {meshRefs.map((ref, index) => (
        <mesh
          key={index}
          ref={ref}
          geometry={sphereGeometry}
          material={sphereMaterial}
          position={[
            positions[index].x,
            positions[index].y,
            positions[index].z,
          ]}
          castShadow
          scale={scales[index]}
          userData={{ direction: 1 }}
        />
      ))}
    </group>
  );
};

export default Environement;
