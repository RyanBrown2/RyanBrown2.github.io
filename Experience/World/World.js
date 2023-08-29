import * as THREE from "three";
import { CSS2DRenderer, CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";

import Experience from "../Experience.js";

import Environment from "./Environment.js";
import Controls from "./Controls.js";
import ReverseEngineering from "./ReverseEngineering.js";
import UnitCube from "./UnitCube.js";

export default class World {
	constructor() {
		this.experience = new Experience();
		this.sizes = this.experience.sizes;
		this.scene = this.experience.scene;
		this.canvas = this.experience.canvas;
		this.camera = this.experience.camera;
		this.resources = this.experience.resources;
		this.positionHandler = this.experience.positionHandler;

		this.resources.on("ready", () => {
			this.environment = new Environment();
			this.reverseEngineering = new ReverseEngineering();
			this.controls = new Controls();
			// this.unitCube = new UnitCube();
			this.cssRenderer = new CSS2DRenderer();
			this.cssRenderer.setSize(this.sizes.width, this.sizes.height);
			this.cssRenderer.domElement.style.position = "absolute";
			this.cssRenderer.domElement.style.top = 0;
			this.cssRenderer.domElement.style.pointerEvents = "none";
			document.body.appendChild(this.cssRenderer.domElement);

			this.calcPositions();
		});
	}

	calcPositions() {

		var startHeight = 0;

		// Hero
		const heroElement = document.getElementById("hero");

		const heroXPos = heroElement.clientWidth / 2;
		const heroYPos = (heroElement.clientHeight / 2);

		const heroObject = new CSS2DObject(heroElement);
		heroObject.position.copy(this.camera.getScenePosition(heroXPos, heroYPos));
		this.scene.add(heroObject);

		startHeight += this.camera.getScenePosition(heroXPos, heroYPos*2).y;


		// Reverse Engineering Section
		this.applyScale(this.reverseEngineering.actualModel, 0.25);
		const reModelHeight = this.getObjectSize(this.reverseEngineering.actualModel).y;
		
		this.reverseEngineering.actualModel.position.setY(startHeight - reModelHeight / 2);
		this.reverseEngineering.actualModel.position.setX(this.camera.getCameraSize().x/4);

		const reverseEngineeringElement = document.getElementById("re-sec");
		const reXPos = reverseEngineeringElement.clientWidth / 2;
		const reYPos = this.camera.getPixelPosition(this.reverseEngineering.actualModel.position).y;
		
		// const position = new THREE.Vector3(0, 0, 0);
		// position.copy(this.camera.getScenePosition(reXPos, reYPos));

		const reverseEngineeringTextObject = new CSS2DObject(reverseEngineeringElement);
		reverseEngineeringTextObject.position.copy(this.camera.getScenePosition(reXPos, reYPos));
		this.scene.add(reverseEngineeringTextObject);
		this.reverseEngineering.calcPixelCenter();
		startHeight -= reModelHeight;
	}

	/**
	 * Get the height of an object
	 * @param {THREE.Mesh} object 
	 * @returns {THREE.Vector3} height of the object
	 */
	getObjectSize(object) {
		let measure = new THREE.Vector3();
		let box = new THREE.Box3().setFromObject(object);
		// let box = object.getSize(measure);
		box.getSize(measure);
		return measure;
	}

	/**
	 * Apply a scale to an object
	 * @param {THREE.Object3D} object 
	 * @param {number} scale % of the window width that the object should take up
	 */
	applyScale(object, scale) {
    const objectSize = this.getObjectSize(object);
		const objectWidth = objectSize.x;
		const cameraWidth = this.camera.getCameraSize().x;
		const newScale = cameraWidth * scale / objectWidth;
		object.scale.set(newScale, newScale, newScale);
	}

	resize() {
		if (this.reverseEngineering) {
			this.reverseEngineering.resize();
		}
		if (this.cssRenderer) {
			this.cssRenderer.setSize(this.sizes.width, this.sizes.height);
			this.calcPositions();
		}

	}

	update() {
		if (this.reverseEngineering) {
			this.reverseEngineering.update();
		}

		if (this.controls) {
			this.controls.update();
		}

		if (this.cssRenderer) {
			// this.cssRenderer.render(this.scene, this.camera.perspectiveCamera);
			this.cssRenderer.render(this.scene, this.camera.orthographicCamera);
		}
	}
}