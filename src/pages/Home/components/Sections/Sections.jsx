import React, { Component, Suspense, useRef } from "react";
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
  useTexture,
  OrthographicCamera
} from '@react-three/drei'


import "./style.css";

import { ReverseEngineeringModel } from "./Models";
import { Col, Row } from "react-bootstrap";

const Sections = () => {
  // constructor(props) {
  //   super(props);
  //   this.ref = React.createRef();
  const ref = useRef();
  const reverseEngineeringRef = useRef();
  const webDevRef = useRef();
  const aiRef = useRef();
  const roboticsRef = useRef();

  //   this.reverseEngineeringRef = React.createRef();
  //   // this.testView = React.createRef();


  //   // const [ref, view1, view2, view3, view4, view5, view6] = useRefs()
  // }
  
  // render() {

    const Common = () => (
      <>
        <ambientLight intensity={10} />
        <OrthographicCamera
          makeDefault
          zoom={50}
          top={200}
          bottom={-200}
          left={200}
          right={-200}
          near={1}
          far={2000}
          position={[0, 0, 10]} 
          />
      </>
    )

    return (
      <div ref={ref} id="sections">

      
      <Row>
        <Col lg={6} className='section left'>
          <div className="section-title">Reverse Engineering</div>
          <div className="section-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, quisquam? Ullam nam natus, soluta sed optio dolorem veritatis possimus numquam, suscipit nihil modi cupiditate! Voluptatum sint quis in perferendis necessitatibus.</div>
        </Col>
        <Col lg={6} ref={reverseEngineeringRef}/>
      </Row>

      <Row>
        <Col lg={6} ref={webDevRef} />
        <Col lg={6} className='section right'>
          <div className="section-title">Web Development</div>
          <div className="section-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, quisquam? Ullam nam natus, soluta sed optio dolorem veritatis possimus numquam, suscipit nihil modi cupiditate! Voluptatum sint quis in perferendis necessitatibus.</div>
        </Col>
      </Row>
      
      <Row>
        <Col lg={6} className='section left'>
          <div className="section-title">Artificial Intelligence</div>
          <div className="section-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, quisquam? Ullam nam natus, soluta sed optio dolorem veritatis possimus numquam, suscipit nihil modi cupiditate! Voluptatum sint quis in perferendis necessitatibus.</div>
        </Col>
        <Col lg={6} ref={aiRef} />
      </Row>

      <Row>
        <Col lg={6} ref={roboticsRef} />
        <Col lg={6} className='section right'>
          <div className="section-title">Robotics</div>
          <div className="section-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, quisquam? Ullam nam natus, soluta sed optio dolorem veritatis possimus numquam, suscipit nihil modi cupiditate! Voluptatum sint quis in perferendis necessitatibus.</div>
        </Col>
      </Row>

        {/* <div ref={reverseEngineeringRef} className=""/> */}
        {/* <ReverseEngineering />
        <WebDevelopment />
        <AI />
        <Robotics /> */}
        {/* <ExperienceComponent ref={this.ref}/> */}
        <Canvas eventSource={ref} className="canvas">
          <Suspense fallback={null}>
          <View track={reverseEngineeringRef}>
            <Common/>
            <ReverseEngineeringModel scale={4} position={[0, 0, 0]} />
          </View>
          <Preload all />
          </Suspense>
        </Canvas>
        
      </div>
    );
}

export default Sections;