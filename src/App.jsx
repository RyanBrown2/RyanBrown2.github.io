import { useState } from 'react'
import { Canvas } from '@react-three/fiber'

import Sizes from './util/Sizes'
import Experience from './components/Experience';

function App() {

  // init sizes
  var sizes = new Sizes();

  return (
    <div id="app">
      <Canvas>
        <color attach="background" args={['#000']} />
        <Experience />
      </Canvas>
    </div>
  )
}

export default App
