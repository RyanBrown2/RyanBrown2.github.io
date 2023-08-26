import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";

export default class ReverseEngineering {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;
		this.model = this.resources.items.re;
		this.actualModel = this.model.scene;
		this.time = this.experience.time;
		  
    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };
	
		this.setModel();
		this.setAnimation();
		this.onMouseMove();
	}

	setModel() {
		this.actualModel.children.forEach(child => {
			this._recurseChild(child);
		});
		// this.actualModel.position.set(3, 0, 0);
		// this.scene.add(this.actualModel);
		// this.actualModel.scale.set(0.1, 0.1, 0.1);
	}

	_recurseChild(child) {
		child.castShadow = true;
		child.receiveShadow = true;

		if (child instanceof THREE.Group) {
			child.children.forEach(groupChild => {
				this._recurseChild(groupChild);
			});
		}

		// if (child.name === "ScreenTop" || child.name === "ScreenBottom") {
		// 	child.material = new THREE.MeshBasicMaterial({
		// 		map: this.resources.items.screen,
		// 	});
		// }
		
	}

	setAnimation() {
		this.mixer = new THREE.AnimationMixer(this.actualModel);
		for (let i = 0; i < this.model.animations.length; i++) {

			const clip = this.model.animations[i];
			const action = this.mixer.clipAction(clip);
			// action.play();
		}
	}

	onMouseMove() {
		window.addEventListener("mousemove", (e) => {
			// todo: fix this
			this.rotation = (2*(e.clientX - (window.innerWidth / 2)) / window.innerWidth) * 0.1;
			this.lerp.target = this.rotation;
		});
	}

	resize() {}

	update() {
    this.lerp.current = GSAP.utils.interpolate(this.lerp.current, this.lerp.target, this.lerp.ease);

		this.actualModel.rotation.y = this.lerp.current;

		this.mixer.update(this.time.delta.seconds);
	}

}