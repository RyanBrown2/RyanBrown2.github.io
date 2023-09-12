import { UseCanvas, ScrollScene } from '@14islands/r3f-scroll-rig'
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export const TestComponent = () => {
  const el = useRef()
  return (
    <>
      <div ref={el}>Track me!</div>
      {/* <UseCanvas>
        <ScrollScene track={el}>
          {(props) => (
            <mesh {...props}>
              <planeGeometry />
              <meshBasicMaterial color="turquoise" />
            </mesh>
          )}
        </ScrollScene>
      </UseCanvas> */}
    </>
  );
}

function SpinningBoxSection() {
  const el = useRef()
  return (
    <section>
      <div ref={el} className="Placeholder ScrollScene"></div>
      <UseCanvas>
        <ScrollScene track={el}>{(props) => <SpinningBoxWebGL {...props} />}</ScrollScene>
      </UseCanvas>
    </section>
  )
}

function SpinningBoxWebGL({ scale, scrollState }) {
  const mesh = useRef()
  useFrame(() => {
    mesh.current.rotation.y = scrollState.progress * Math.PI * 2
  })
  return (
    <group scale={scale.xy.min() * 0.5}>
      <mesh ref={mesh}>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>
    </group>
  )
}

export { SpinningBoxSection }