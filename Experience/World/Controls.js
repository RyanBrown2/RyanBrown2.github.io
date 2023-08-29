import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/all";

export default class Controls {
	constructor() {
		this.experience = new Experience();
    this.sizes = this.experience.sizes;
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;
		this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.reverseEngineering = this.experience.world.reverseEngineering.actualModel;
    GSAP.registerPlugin(ScrollTrigger);

    this.pageScroll = 0;

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    }

    this.position = new THREE.Vector3(0, 0, 0);
    this.lookAheadPosition = new THREE.Vector3(0, 0, 0);

		this.setPath();
    this.onWheel();
	}

	setPath() {
    const cameraStartHeight = -this.sizes.frustum / 2;

    this.curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, this.camera.orthographicCamera.bottom, 0),
      new THREE.Vector3(0, -10, 0),
    ]);

    const points = this.curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

    const curveObject = new THREE.Line(geometry, material);
    // this.scene.add(curveObject);
    
	}

  onWheel() {
    window.addEventListener("wheel", (e) => {
      if (e.deltaY > 0) {
        this.lerp.target += 0.01;
      } else {
        this.lerp.target -= 0.01;
      }
    });

  }

	resize() {}

	update() {
    this.lerp.current = GSAP.utils.interpolate(this.lerp.current, this.lerp.target, this.lerp.ease);

    this.lerp.target = GSAP.utils.clamp(0, 1, this.lerp.target);
    this.lerp.current =  GSAP.utils.clamp(0, 1, this.lerp.current);
    this.curve.getPointAt(this.lerp.current, this.position);

    this.camera.orthographicCamera.position.copy(this.position);
  }
}