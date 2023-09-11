import { forwardRef, useImperativeHandle, useRef } from "react";
import Experience from "./Experience";
import { Canvas } from "@react-three/fiber";

import {
  View,
  Preload,
  OrbitControls,
  PerspectiveCamera,
  CameraShake,
  PivotControls,
  Environment,
  Center,
  useTexture
} from '@react-three/drei'

import { ReverseEngineeringModel } from "./Models";

const ExperienceComponent = forwardRef(function ExperienceComponent(props, ref) {

  const reverseEngineeringRef = useRef();

  // const eventRef = ref.current;

  const Common = ({ color }) => (
    <>
      {color && <color attach="background" args={[color]} />}
      <ambientLight intensity={0.5} />
      <pointLight position={[20, 30, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="blue" />
      <Environment preset="dawn" />
      <PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
    </>
  )

  useImperativeHandle(ref, () => {
    return {
      reverseEngineering() { console.log("Reverse Engineering"); }
    };
  });


  return (
    // <Canvas ref={eventRef} className="canvas">
    <Canvas className="canvas">
      <View track={reverseEngineeringRef}>
      {/* <View> */}
        <Common color="lightpink" />
        <PivotControls lineWidth={3} depthTest={false} displayValues={false} scale={2}>
          <ReverseEngineeringModel scale={4} position={[0, -1.6, 5]} />
        </PivotControls>
        <OrbitControls makeDefault />
      </View>
      <Preload all />
    </Canvas>
  );
}, []);

export default ExperienceComponent;