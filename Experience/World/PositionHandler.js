import * as THREE from 'three';
import Experience from '../Experience';

export default class PositionHandler {

  constructor() {
    this.experience = new Experience();
		this.sizes = this.experience.sizes;
		this.scene = this.experience.scene;
		this.canvas = this.experience.canvas;
		this.camera = this.experience.camera;

		this.nextHeight = 0;
  }

	/**
	 * @param {HTMLElement} element 
	 */
	positionNextSection(element) {
		const elementXPos = element.clientWidth / 2;
		const elementYPos = (element.clientHeight / 2) + this.nextHeight;

		const elementObject = new THREE.Object3D();
		elementObject.position.copy(this.camera.getScenePosition(elementXPos, elementYPos));
		this.scene.add(elementObject);

		this.nextHeight += element.clientHeight;

	}


}