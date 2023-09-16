import React, { Component, Suspense, useRef } from "react";
import { Canvas, useThree } from '@react-three/fiber'
import { Col, Row } from "react-bootstrap";

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
import ThreeUtil from "../../../../util/ThreeUtil";


const Sections = () => {
	
	const ref = useRef();
	const reverseEngineeringRef = useRef();
	const webDevRef = useRef();
	const aiRef = useRef();
	const roboticsRef = useRef();


		return (
			<div ref={ref} id="sections">

			<Row id="reverse-engineering-section">
				<Col lg={6} className="g-lg-0 align-self-center">
					<div className="section left">
						<div className="section-title">Reverse Engineering</div>
						<div className="section-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, quisquam? Ullam nam natus, soluta sed optio dolorem veritatis possimus numquam, suscipit nihil modi cupiditate! Voluptatum sint quis in perferendis necessitatibus.</div>
					</div>
				</Col>
				<Col lg={6} className="graphic d-none d-lg-block">
					<div ref={reverseEngineeringRef} />
				</Col>
			</Row>

			<Row>
				<Col lg={6} ref={webDevRef} className="graphic d-none d-lg-block"/>
				<Col lg={6} className="g-lg-0 align-self-center">
					<div className='section right'>
						<div className="section-title">Web Development</div>
						<div className="section-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, quisquam? Ullam nam natus, soluta sed optio dolorem veritatis possimus numquam, suscipit nihil modi cupiditate! Voluptatum sint quis in perferendis necessitatibus.</div>
					</div>
				</Col>
			</Row>

			<Row>
				<Col lg={6} className="g-lg-0 align-self-center">
					<div className='section left'>
						<div className="section-title">Artificial Intelligence</div>
						<div className="section-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, quisquam? Ullam nam natus, soluta sed optio dolorem veritatis possimus numquam, suscipit nihil modi cupiditate! Voluptatum sint quis in perferendis necessitatibus.</div>
					</div>
				</Col>
				<Col lg={6} ref={aiRef} className="graphic d-none d-lg-block"/>
			</Row>

			<Row>
				<Col lg={6} ref={roboticsRef} className="graphic d-none d-lg-block"/>
				<Col lg={6} className="g-lg-0 align-self-center">
					<div className='section right'>
						<div className="section-title">Robotics</div>
						<div className="section-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, quisquam? Ullam nam natus, soluta sed optio dolorem veritatis possimus numquam, suscipit nihil modi cupiditate! Voluptatum sint quis in perferendis necessitatibus.</div>
					</div>
				</Col>
			</Row>

			<Canvas eventSource={ref} className="canvas">
				<Suspense fallback={null}>
				<View track={reverseEngineeringRef}>
					<ReverseEngineeringModel scale={4} position={[0, 0, 0]} />
				</View>
				<Preload all />
				</Suspense>
			</Canvas>
				
			</div>
		);
}

export default Sections;