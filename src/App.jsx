import { Canvas } from "@react-three/fiber";
import Experience from "./components/Setup/Experience";
import Header from "./components/Header/Header";
import Footer from "./components/Setup/Footer";
import { useState } from "react";

function App() {
  const [scrollVisible, setScrollVisible] = useState(false)
  return (
    <>
      <Header />
      <Footer scrollVisible={scrollVisible}/>
      <Canvas shadows>
        <Experience setScrollVisible={setScrollVisible}/>
      </Canvas>
    </>
  );
}

export default App;
