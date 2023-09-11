import React, { Component } from "react";
import { Canvas, useThree } from '@react-three/fiber'

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

import ReverseEngineering from "./components/ReverseEngineering";
import WebDevelopment from "./components/WebDevelopment";
import AI from "./components/AI";
import Robotics from "./components/Robotics";

import "./style.css";

import { ReverseEngineeringModel, Soda } from './graphic/Models';

import ExperienceComponent from "../Experience/ExperienceComponent";

export default class Sections extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    // this.testView = React.createRef();

    this.experienceRef = React.createRef();

    this.reverseEngineeringRef = React.createRef();

    // const [ref, view1, view2, view3, view4, view5, view6] = useRefs()
  }
  
  render() {

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

    console.log(this.experienceRef.current);
    
    return (
      <div ref={this.ref} id="sections">
        <div ref={this.experienceRef} className="view translateX"/>
        <ReverseEngineering />
        <WebDevelopment />
        <AI />
        <Robotics />
        <ExperienceComponent ref={this.experienceRef}/>
        {/* <Canvas eventSource={this.ref} className="canvas">
          <View track={this.testView}>
            <Common color="lightpink" />
            <PivotControls lineWidth={3} depthTest={false} displayValues={false} scale={2}>
              <ReverseEngineeringModel scale={4} position={[0, -1.6, 5]} />
            </PivotControls>
            <OrbitControls makeDefault />
          </View>
          <Preload all />
        </Canvas> */}
        
      </div>
    );
  }
}