import {
  useGLTF,
  useTexture,
  MeshReflectorMaterial,
  Text,
  useMatcapTexture,
  Html,
} from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import Dragon from "./Dragon";

const Environement = ({ introVisible }) => {
  const glb = useGLTF("./model/dragon.glb");

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
          object.name !== "arene"
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
        <circleGeometry args={[10, 32]} />
        <MeshReflectorMaterial
          resolution={512}
          blur={[10000, 10000]}
          mixBlur={1}
          mirror={0.5}
          color={"#c2c5aa"}
        />
      </mesh>
      <Dragon />
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
      <group>
        <Html
          font="./font/BARSADY-Bold.woff"
          position-y={3}
          rotation-y={Math.PI}
          fontSize={1.5}
          color={"white"}
          center
        >
          <div
            className={`w-screen flex flex-col justify-center items-center titleIntro ${introVisible <= 12 ? 'fade-out' : 'fade-in'} `}
          >
            <div className=" text-white text-9xl mr-72">Dragon</div>

            <div className=" text-white text-9xl ml-80">Museum</div>
            <div className=" text-amber-950 text-3xl w-72 ml-40">
              by Metard Camille
            </div>
          </div>
        </Html>
      </group>
    </group>
  );
};

export default Environement;
