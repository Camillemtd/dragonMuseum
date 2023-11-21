import { Canvas } from "@react-three/fiber";
import Experience from "./components/Setup/Experience";
import Header from "./components/Header/Header";
import Footer from "./components/Setup/Footer";
import { useState } from "react";
import Lair from "./components/Lair";
import dragonData from "./data/dragonData";
import Loader from "./components/Setup/Loader";

function App() {
  const [scrollVisible, setScrollVisible] = useState(false);
  const [openLair, setOpenLair] = useState(false);
  const [lairData, setLairData] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 

  // Ouvrir et fermer le composant Lair
  const toggleLair = () => {
    setOpenLair(!openLair);
  };

  const handleCanvasLoaded = () => {
    setIsLoading(false);
  };

  // Fonction pour mettre à jour les données de Lair
  const updateLairData = (category) => {
    const filteredData = dragonData.filter(
      (item) => item.category === category
    );
    setLairData(filteredData);
  };

  return (
    <>
    {isLoading && <Loader/>}
      {openLair && (
        <Lair isOpen={openLair} toggleLair={toggleLair} data={lairData} />
      )}
      <Header openMenu={openMenu} setOpenMenu={setOpenMenu}/>
      <Footer scrollVisible={scrollVisible} />
      <Canvas shadows onCreated={handleCanvasLoaded}>
        <Experience
          setScrollVisible={setScrollVisible}
          setOpenLair={setOpenLair}
          updateLairData={updateLairData}
          openLair={openLair}
          openMenu={openMenu}
        />
      </Canvas>
    </>
  );
}

export default App;
