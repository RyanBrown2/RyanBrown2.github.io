import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";

export default class ReverseEngineering {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.sizes = this.experience.sizes;
		this.resources = this.experience.resources;
		this.camera = this.experience.camera;
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

		this.calcPixelCenter();
	}

	setModel() {
		this.actualModel.children.forEach(child => {
			this._recurseChild(child);
		});
		// this.actualModel.position.set(3, 0, 0);
		this.scene.add(this.actualModel);
		this.actualModel.scale.set(0.279104, 0.279104, 0.279104);
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
		this.mixer.timeScale = 80/24;
		for (let i = 0; i < this.model.animations.length; i++) {

			const clip = this.model.animations[i];
			const action = this.mixer.clipAction(clip);
			action.play();
		}
	}

	onMouseMove() {
		window.addEventListener("mousemove", (e) => {
			var maxDist = 0.3;
			var pixelX = (e.clientX - this.pixelCenter.x)/ this.sizes.width;
			var pixelY = (e.clientY - this.pixelCenter.y)/ this.sizes.height;
			// var pixelDist = Math.sqrt(Math.pow(e.clientX - this.pixelCenter.x, 2) + Math.pow(e.clientY - this.pixelCenter.y, 2));
			var dist = Math.sqrt(Math.pow(pixelX, 2) + Math.pow(pixelY, 2));
			this.lerp.target = dist/maxDist;
		});
	}

	/**
	 * Find the pixel coordinate of the center of the object
	 */
	calcPixelCenter() {
		this.center = new THREE.Vector3(0.5, 0.5, 0.5);
		this.center.multiply(this.actualModel.scale);
		
		this.center.add(this.actualModel.position);
		this.pixelCenter = this.camera.getPixelPosition(this.center);
		// console.log(this.pixelCenter);
		const test = document.createElement("div");
		test.id = "pos-test";
		test.style.position = "absolute";
		test.style.top = this.pixelCenter.y + "px";
		test.style.left = this.pixelCenter.x + "px";

		document.body.appendChild(test);

	}

	resize() {
		this.actualModel.scale.set(0.279104, 0.279104, 0.279104);
		this.calcPixelCenter();
	}

	update() {
		// this.calcPixelCenter();
    this.lerp.current = GSAP.utils.interpolate(this.lerp.current, this.lerp.target, this.lerp.ease);

		// this.actualModel.rotation.y = this.lerp.current;

		this.lerp.current = GSAP.utils.clamp(0, 1, this.lerp.current);

		// this.mixer.update(this.time.delta.seconds);			
		this.mixer.setTime(1 - this.lerp.current);
	}

}