import { Canvas } from "@react-three/fiber"
import Experience from "./components/Setup/Experience"
import Header from "./components/Header/Header"
import Footer from "./components/Setup/Footer"

function App() {

  return (
    <>
    <Header/>
    <Footer/>
     <Canvas
      shadows
     >
      <Experience/>
     </Canvas>
     
    </>
  )
}

export default App
