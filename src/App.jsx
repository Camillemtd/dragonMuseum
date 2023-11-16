import { Canvas } from "@react-three/fiber"
import Experience from "./Experience"
import Header from "./Header"

function App() {

  return (
    <>
    <Header/>
     <Canvas
      shadows
     >
      <Experience/>
     </Canvas>
     
    </>
  )
}

export default App
