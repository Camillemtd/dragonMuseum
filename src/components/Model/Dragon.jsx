import { Html, Text, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

const Dragon = () => {
  /**
   * Dragon Model
   */
  const dragonStatue = useGLTF("./model/dragonstatut.glb");
  const dragonGeometry = dragonStatue.nodes.model.geometry;
  const dragonMaterial = dragonStatue.nodes.model.material;
  const dragonTexture = useTexture(
    "./texture/dragon/Tiles_Wall_001_basecolor.jpg"
  );
  const dragonNormal = useTexture("./texture/dragon/Tiles_Wall_001_normal.jpg");
  const dragonAmbiant = useTexture(
    "./texture/dragon/Tiles_Wall_001_ambientOcclusion.jpg"
  );
  const dragonRoughness = useTexture(
    "./texture/dragon/Tiles_Wall_001_roughness.jpg"
  );
  dragonTexture.repeat.set(15, 15);
  dragonTexture.wrapS = THREE.RepeatWrapping;
  dragonTexture.wrapT = THREE.RepeatWrapping;

  /**
   * Navigation
   */

  // Texture
  const elementaireTexture = useTexture("./encyclopedie/feu.png");
  const mythiqueTexture = useTexture("./encyclopedie/arcenciel.png");
  const fantaisieTexture = useTexture("./encyclopedie/foret.png");

  const geometryCircle = new THREE.CircleGeometry(0.1, 32);
  const materialCircle = new THREE.MeshBasicMaterial({ color: "white" });

  const geometryImage = new THREE.CircleGeometry(0.095, 32)

  const geometryRing = new THREE.RingGeometry(0.1, 0.095, 32);
  const materialRing = new THREE.MeshBasicMaterial({
    color: "white",
    side: THREE.DoubleSide,
  });

  const ringRef1 = useRef();
  const ringRef2 = useRef();
  const ringRef3 = useRef();
  const [lastAnimationTime1, setLastAnimationTime1] = useState(0);
  const [isAnimating1, setIsAnimating1] = useState(true);
  const [lastAnimationTime2, setLastAnimationTime2] = useState(0);
  const [isAnimating2, setIsAnimating2] = useState(true);
  const [lastAnimationTime3, setLastAnimationTime3] = useState(0);
  const [isAnimating3, setIsAnimating3] = useState(true);
  const [currentTitle, setCurrentTitle] = useState("");

  const animateRing = (
    ringRef,
    lastAnimationTime,
    setLastAnimationTime,
    isAnimating,
    setIsAnimating,
    state
  ) => {
    if (!ringRef.current) return;

    if (state.clock.elapsedTime - lastAnimationTime > 2) {
      setIsAnimating(true);
      setLastAnimationTime(state.clock.elapsedTime);
    }

    if (isAnimating) {
      const scale = ringRef.current.scale.x;
      if (scale < 2) {
        ringRef.current.scale.set(scale + 0.015, scale + 0.015, scale + 0.015);
      } else {
        ringRef.current.scale.set(1, 1, 1);
        setIsAnimating(false);
      }
    }
  };

  useFrame((state, delta) => {
    animateRing(
      ringRef1,
      lastAnimationTime1,
      setLastAnimationTime1,
      isAnimating1,
      setIsAnimating1,
      state
    );
    animateRing(
      ringRef2,
      lastAnimationTime2,
      setLastAnimationTime2,
      isAnimating2,
      setIsAnimating2,
      state
    );
    animateRing(
      ringRef3,
      lastAnimationTime3,
      setLastAnimationTime3,
      isAnimating3,
      setIsAnimating3,
      state
    );
  });

  const groupRef1 = useRef();
  const groupRef2 = useRef();
  const groupRef3 = useRef();

  const [hoveredGroup, setHoveredGroup] = useState(null);
console.log(currentTitle);
  useFrame(() => {
    [groupRef1, groupRef2, groupRef3].forEach((ref) => {
      if (ref.current) {
        const scale = ref.current.scale.x;
        const targetScale = ref.current === hoveredGroup ? 5 : 1;
        const nextScale = THREE.MathUtils.lerp(scale, targetScale, 0.1);
        ref.current.scale.set(nextScale, nextScale, nextScale);
      }
    });
  });

  const handlePointerOver = (e, groupRef) => {
    e.stopPropagation();
    setHoveredGroup(groupRef.current);
    document.body.style.cursor = "pointer";

    if (groupRef.current === groupRef1.current) {
      setCurrentTitle("Élémentaire");
    } else if (groupRef.current === groupRef2.current) {
      setCurrentTitle("Mythique");
    } else if (groupRef.current === groupRef3.current) {
      setCurrentTitle("Fantaisique");
    }
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    setHoveredGroup(null);
    setCurrentTitle("");
    document.body.style.cursor = "auto";
  };
  return (
    <group>
      <mesh
        geometry={dragonGeometry}
        material={dragonMaterial}
        rotation-y={Math.PI}
        position={[0.6, 3, 13]}
        scale={5}
      >
        <meshPhysicalMaterial
          map={dragonTexture}
          roughness={0.5}
          aoMap={dragonAmbiant}
          aoMapIntensity={0.3}
          roughnessMap={dragonRoughness}
          normalMap={dragonNormal}
          normalScale={[1, 1]}
          receiveShadow
          castShadow
        />
      </mesh>
      {currentTitle && (
        <Html
          position={[0, 3, 8.1]}
          rotation-y={Math.PI}
          center
        >
          <div className="title text-white text-9xl">
            {currentTitle}
          </div>
          
        </Html>
      )}
      <group
        ref={groupRef1}
        position={[1.8, 4.3, 8]}
        onPointerOver={(e) => handlePointerOver(e, groupRef1)}
        onPointerOut={handlePointerOut}
      >
        <mesh
          rotation-y={Math.PI}
          geometry={geometryCircle}
          material={materialCircle}
        />
        <mesh geometry={geometryRing} material={materialRing} ref={ringRef1} />
        {/* <mesh geometry={geometryCircle} rotation-y={Math.PI} scale={2}>
          <meshBasicMaterial map={elementaireTexture}/>
        </mesh> */}
      </group>
      <group
        ref={groupRef2}
        position={[0.5, 1.5, 8]}
        onPointerOver={(e) => handlePointerOver(e, groupRef2)}
        onPointerOut={handlePointerOut}
      >
        <mesh
          rotation-y={Math.PI}
          geometry={geometryCircle}
          material={materialCircle}
          renderOrder={1}
        />
        <mesh geometry={geometryRing} material={materialRing} ref={ringRef2} renderOrder={1} />
        {/* <mesh geometry={geometryImage} rotation-y={Math.PI}  renderOrder={2}>
          <meshBasicMaterial map={mythiqueTexture}/>
        </mesh> */}
      </group>
      <group
  ref={groupRef3}
  position={[-1.5, 4, 8]}
  onPointerOver={(e) => handlePointerOver(e, groupRef3)}
  onPointerOut={handlePointerOut}
>
  {/* <mesh
    geometry={geometryImage}
    rotation-y={Math.PI}
    renderOrder={2} // Plus élevé pour être au-dessus
  >
    <meshBasicMaterial map={fantaisieTexture}/>
  </mesh> */}

  <mesh
    rotation-y={Math.PI}
    geometry={geometryCircle}
    material={materialCircle}
    renderOrder={1}
  />
  <mesh
    geometry={geometryRing}
    material={materialRing}
    ref={ringRef3}
    renderOrder={1}
  />
</group>
    </group>
  );
};

export default Dragon;
