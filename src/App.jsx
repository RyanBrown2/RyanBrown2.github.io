import { useState } from 'react'
import { Canvas } from '@react-three/fiber'

import HomePage from './pages/Home/Home'
import Background from './components/Background/Background'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <HomePage/>
      <Background />
    </>
    
    // <div id="canvas-container">
    //   <Canvas>
    //     <Box />
    //   </Canvas>
    // </div>
  )
}

export default App
