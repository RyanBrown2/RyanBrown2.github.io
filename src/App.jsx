import { useState } from 'react'
import { Canvas } from '@react-three/fiber'

import HomePage from './pages/Home/Home'
import Background from './components/Background/Background'

function App() {
  return (
    <>
      <HomePage/>
      <Background />
    </>
  )
}

export default App
