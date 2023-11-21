import { OrbitControls, Environment, Sparkles } from "@react-three/drei";
import ModelEnvironement from "../Model/Environement";
import Camera from "../Camera/Camera";
import { useEffect, useState, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Experience = ({ setScrollVisible, setOpenLair, updateLairData, openLair }) => {
    const [cameraPosition, setCameraPosition] = useState([0, 1, 13]);
    const { camera } = useThree();
    const touchYRef = useRef(0);

    const handleMouseWheel = (event) => {
        let newPositionZ = cameraPosition[2] + (event.deltaY > 0 ? -0.1 : 0.1);
        newPositionZ = Math.max(-3, Math.min(newPositionZ, 13)); // Limiter entre -3 et 13
        setCameraPosition([0, 1, newPositionZ]);
    };

    const handleTouchStart = (event) => {
        touchYRef.current = event.touches[0].clientY;
    };

    const handleTouchMove = (event) => {
        const currentTouchY = event.touches[0].clientY;
        let newPositionZ = cameraPosition[2] - (touchYRef.current - currentTouchY) * 0.01;
        newPositionZ = Math.max(-3, Math.min(newPositionZ, 13)); // Limiter entre -3 et 13
        setCameraPosition([0, 1, newPositionZ]);
        touchYRef.current = currentTouchY;
    };

    useEffect(() => {
        window.addEventListener('wheel', handleMouseWheel);
        window.addEventListener('touchstart', handleTouchStart, { passive: false });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleMouseWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, [cameraPosition]);

    useFrame(() => {
        camera.position.lerp(new THREE.Vector3(0, 1, cameraPosition[2]), 0.1);
    });

    useEffect(() => {
        setScrollVisible(cameraPosition[2] <= 12);
    }, [cameraPosition, setScrollVisible]);

    return (
        <>
            <Camera />
            <Sparkles
                size={3}
                scale={[10, 10, 20]}
                position-y={1}
                speed={0.6}
                count={200}
            />
            <Environment background files={"./baked.hdr"} />
            <directionalLight
                color="#faedcd"
                intensity={3}
                position={[3, 2, 0.5]}
                castShadow
            />
            <ModelEnvironement
                introVisible={cameraPosition[2]}
                setOpenLair={setOpenLair}
                updateLairData={updateLairData}
                openLair={openLair}
            />
            <ambientLight intensity={0.5} />
        </>
    );
};

export default Experience;
