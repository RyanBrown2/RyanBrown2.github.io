import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'

// import 

import HomePage from './pages/Home/Home'
import Background from './components/Background/Background'
import { GlobalCanvas, SmoothScrollbar } from '@14islands/r3f-scroll-rig'
import NewHomePage from './pages/NewHome/NewHome'

function App() {
  const eventSource = useRef();
  const [isTouch, setTouch] = useState(false)
  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
    setTouch(isTouch)
  }, [])

  return (
    <div ref={eventSource}>
      <GlobalCanvas
        // eventSource={eventSource}
      >
        <ambientLight intensity={0.5} />
      </GlobalCanvas>

      {isTouch && (
              <section>
                <p style={{ color: 'orange' }}>
                  You are on a touch device which means the WebGL won't sync with the native scroll. Consider disabling ScrollScenes for
                  touch devices, or experiment with the `smoothTouch` setting on Lenis.
                </p>
              </section>
            )}
            {/* <div id="test" style={{
              height: "3000px",
            }}></div> */}
      
      <SmoothScrollbar>
        {(bind) => (
          <div {...bind}>
            <div id="test" style={{
              height: "3000px",
            }}>
              test
            </div>
          </div>
        )}
      </SmoothScrollbar>

      {/* <SmoothScrollbar> */}

        {/* <Background /> */}
        {/* <NewHomePage /> */}
      {/* </SmoothScrollbar> */}
      
      {/* <HomePage/>
      <Background /> */}
    </div>
  )
}

export default App
