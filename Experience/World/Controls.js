import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/all";

export default class Controls {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;
		this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.reverseEngineering = this.experience.world.reverseEngineering.actualModel;
    GSAP.registerPlugin(ScrollTrigger);

    this.progress = 0;

    this.position = new THREE.Vector3(0, 0, 0);
    this.lookAheadPosition = new THREE.Vector3(0, 0, 0);
  
		this.setPath();
    this.onWheel();
	}

	setPath() {
    this.timeline = new GSAP.timeline({
      scrollTrigger: {
        trigger: "#re-sec",
        scrub: 0.5,
        // markers: true,
        start: "top bottom",
        end: "bottom bottom",
      },
    });

    this.timeline.fromTo(this.reverseEngineering.position, {
      x: 8,
    }, {
      x: 2,
    });

    // const re_out = new GSAP.timeline({
    //   scrollTrigger: {
    //     trigger: "#re-sec",
    //     scrub: 0.5,
    //     markers: true,
    //     start: "bottom bottom",
    //     end: "bottom bottom",
    //   },
    // });

    // this.timeline.from(this.reverseEngineering.position, {
    //   x: 5,
    // });

    // this.timeline.to(this.reverseEngineering.position, {
    //   x: 2,
    // });
    // this.timeline = new GSAP.timeline(); 
    // this.timeline.to(this.reverseEngineering.position, {
    //   x: 5,
    //   ScrollTrigger: {
    //     trigger: ".section-divider",
    //     markers: true,
    //     start: "top top",
    //     end: "bottom bottom",
    //   }
    // });
	}

  onWheel() {
  }

	resize() {}

	update() {
  }
}