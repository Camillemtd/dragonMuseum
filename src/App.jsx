import { Canvas } from "@react-three/fiber"
import Experience from "./Experience"
import Header from "./Header"
import Footer from "./Footer"

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
