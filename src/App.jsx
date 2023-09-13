import { useState } from 'react'
import { Canvas } from '@react-three/fiber'

import HomePage from './pages/Home/Home'
import Background from './components/Background/Background'

import Sizes from './util/sizes'

function App() {

  // init sizes
  var sizes = new Sizes();

  return (
    <>
      <HomePage/>
      <Background />
    </>
  )
}

export default App
