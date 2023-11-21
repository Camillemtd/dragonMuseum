import { Html, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";

const Dragon = ({ setOpenLair, updateLairData, openLair }) => {
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

  const geometryCircle = new THREE.CircleGeometry(0.1, 32);
  const materialCircle = new THREE.MeshBasicMaterial({ color: "white" });

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

  const handleClick = (category) => {
    updateLairData(category);
    setOpenLair(true);
  };
  

  const [rotationDragon, setRotationDragon] = useState(Math.PI);
  const [positionDragon, setPositionDragon] = useState([0.6, 3, 13]);

  useEffect(() => {
    const handleResize = () => {
      setRotationDragon(window.innerWidth < 400 ? Math.PI * 0.5 : Math.PI);
      setPositionDragon(
        window.innerWidth < 400
          ? new THREE.Vector3(0, 3, 13)
          : new THREE.Vector3(0.6, 3, 13)
      );
    };

    // Définir la rotation initiale
    handleResize();

    // Ajouter l'écouteur d'événement
    window.addEventListener("resize", handleResize);

    // Nettoyer l'écouteur d'événement
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <group>
      <mesh
        geometry={dragonGeometry}
        material={dragonMaterial}
        rotation-y={rotationDragon}
        position={positionDragon}
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
      {currentTitle && !openLair && (
        <Html position={[0, 3, 8.1]} rotation-y={Math.PI} center>
          <div className="title text-white text-9xl h-20 hidden md:block">{currentTitle}</div>
        </Html>
      )}
      <group
        ref={groupRef1}
        position={[1.2, 4.3, 8]}
        onPointerOver={(e) => handlePointerOver(e, groupRef1)}
        onPointerOut={handlePointerOut}
        onClick={() => handleClick("Elemental")}
      >
        <mesh
          rotation-y={Math.PI}
          geometry={geometryCircle}
          material={materialCircle}
        />
        <mesh geometry={geometryRing} material={materialRing} ref={ringRef1} />
      </group>
      <group
        ref={groupRef2}
        position={[0.5, 1.5, 8]}
        onPointerOver={(e) => handlePointerOver(e, groupRef2)}
        onPointerOut={handlePointerOut}
        onClick={() => handleClick("Mythical")}
      >
        <mesh
          rotation-y={Math.PI}
          geometry={geometryCircle}
          material={materialCircle}
        />
        <mesh geometry={geometryRing} material={materialRing} ref={ringRef2} />
      </group>
      <group
        ref={groupRef3}
        position={[-0.8, 4.5, 8]}
        onPointerOver={(e) => handlePointerOver(e, groupRef3)}
        onPointerOut={handlePointerOut}
        onClick={() => handleClick("Fantasy")}
      >
        <mesh
          rotation-y={Math.PI}
          geometry={geometryCircle}
          material={materialCircle}
        />
        <mesh geometry={geometryRing} material={materialRing} ref={ringRef3} />
      </group>
    </group>
  );
};

export default Dragon;
