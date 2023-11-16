import {
  useGLTF,
  useTexture,
  MeshReflectorMaterial,
  Text,
  useMatcapTexture,
} from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import Dragon from "./Dragon";
import AnimateWord from "./AnimateWord";

const Environement = () => {
  const glb = useGLTF("./model/dragon.glb");

  console.log(glb);
  /**
   * Textures
   */
  // Texture floor
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

  // Water Texture
  const waterTexture = useTexture("./texture/water/Water_002_COLOR.jpg");
  const waterNormal = useTexture("./texture/water/Water_002_NORM.jpg");
  const waterAmbiant = useTexture("./texture/water/Water_002_OCC.jpg");
  const waterHeight = useTexture("./texture/water/Water_002_DISP.png");
  const waterRoughness = useTexture("./texture/water/Water_002_ROUGH.jpg");

  /**
   * Sphere
   */
  const sphereMaterial = new THREE.MeshStandardMaterial();
  const sphereGeometry = new THREE.SphereGeometry(1, 32, 16);

  const positions = [
    { x: 4, y: 5, z: -6.5 },
    { x: -4, y: 2, z: -7.5 },
    { x: 6, y: 4, z: -7 },
    { x: -5, y: 5, z: -6.5 },
    { x: 4, y: 2, z: -7.5 },
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
            ></primitive>
          );
        }
      })}
      <mesh
        rotation-y={Math.PI}
        rotation-x={Math.PI * 0.5}
        receiveShadow
        castShadow
        position={[0, 0, -2.7]}
      >
        <planeGeometry args={[20, 15, 100, 100]} />

        <MeshReflectorMaterial
          resolution={512}
          blur={[10000, 10000]}
          mixBlur={1}
          mirror={0.5}
          color={"#c2c5aa"}
        />
      </mesh>
      <mesh
        rotation-y={Math.PI}
        rotation-x={Math.PI * 0.5}
        receiveShadow
        castShadow
        position={[0, -0.2, 12]}
      >
        <circleGeometry args={[9, 32]} />
        <meshPhysicalMaterial
          roughness={0.5}
          metalness={0.3}
          aoMap={floorAmbient}
          aoMapIntensity={0.3}
          displacementMap={floorHight}
          displacementScale={0.23}
          roughnessMap={floorRoughness}
          normalMap={floorNormal}
          normalScale={[1, 1]}
          receiveShadow
          castShadow
          color={"#c2c5aa"}
        />
      </mesh>
      <Dragon />
      <mesh position={[0, 0.2, 12]}>
        <cylinderGeometry args={[3.2, 3.2, 0.1]} />
        {/* <MeshReflectorMaterial
          resolution={512}
          blur={[1000, 1000]}
          mixBlur={1}
          mirror={0.5}
          color={"skyblue"}
        /> */}
        <meshBasicMaterial opacity={0.5} transparent={true} color={"blue"} />
      </mesh>
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
      {/* <Text
        font="./font/BARSADY-Regular.woff"
        position={[1.8, 4.5, -7]}
        rotation-y={Math.PI}
        fontSize={1.5}
        color={"white"}
      >
        Dragon
      </Text> */}
      <AnimateWord word="Dragon" basePosition={{ x: 3.5, y: 4.5, z: -7 }} />
      <AnimateWord word="Museum" basePosition={{ x: -0.005, y: 3.2, z: -7 }} />
      {/* <Text
        font="./font/BARSADY-Regular.woff"
        position={[-1.55, 3.2, -7]}
        rotation-y={Math.PI}
        fontSize={1.5}
        color={"white"}
      >
        Museum
        <meshStandardMaterial
          emissive={"white"} 
          emissiveIntensity={1} 
          metalness={0.1} 
          roughness={0.5}
          color={"white"}
        />
      </Text> */}
      <Text
        font="./font/BARSADY-Regular.woff"
        position={[2.9, 3.6, -7]}
        rotation-y={Math.PI}
        fontSize={0.3}
        color="black"
      >
        by Metard Camille
      </Text>
      <ambientLight />
    </group>
  );
};

export default Environement;
