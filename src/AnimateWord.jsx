import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

const AnimatedLetter = ({ letter, index, basePosition }) => {
  const ref = useRef();
  const [animationStarted, setAnimationStarted] = useState(false);
  const [yPos, setYPos] = useState(-0.9); // Départ de l'animation en dessous de la position de base
  const [opacity, setOpacity] = useState(0); // Opacité initiale à 0
  const [scale, setScale] = useState(0);

  useEffect(() => {
    // Démarrer l'animation de chaque lettre avec un délai
    const timeoutId = setTimeout(() => {
      setAnimationStarted(true);
    }, 200 * index); // Chaque lettre commence 500ms après la précédente

    return () => clearTimeout(timeoutId);
  }, [index]);

  useFrame(() => {
    if (animationStarted) {
      if (yPos < 0) {
        setYPos(yPos + 0.05); // Vitesse de l'animation
        setOpacity(opacity + 0.1); // Augmenter l'opacité progressivement
        setScale(Math.min(scale + 0.05, 1));
      }
    }
  });

  return (
    <Text
      ref={ref}
      font="./font/BARSADY-Bold.woff"
      position={[basePosition.x + index * -0.8, basePosition.y + yPos, basePosition.z]}
      rotation-y={Math.PI}
      fontSize={1.5}
      color={"white"}
      scale={scale}
      material-opacity={opacity} // Appliquer l'opacité au matériau
      material-transparent={true} // Activer la transparence du matériau
    >
      {letter}
    </Text>
  );
};

const AnimatedWord = ({ word, basePosition }) => {
  return (
    <>
      {word.split('').map((letter, index) => (
        <AnimatedLetter
          key={index}
          letter={letter}
          index={index}
          basePosition={basePosition}
        />
      ))}
    </>
  );
};

export default AnimatedWord;