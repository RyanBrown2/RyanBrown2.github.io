import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";

export default class UnitCube {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;
		this.model = this.resources.items.unitCube;
		this.actualModel = this.model.scene;
		this.time = this.experience.time;
		  
    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };
	
		this.setModel();
	}

	setModel() {
		this.actualModel.children.forEach(child => {
			this._recurseChild(child);
		});
		// this.actualModel.position.set(3, 0, 0);
		this.scene.add(this.actualModel);
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
	}


	resize() {}

	update() {}

}