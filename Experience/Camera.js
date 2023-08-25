import * as THREE from "three";
import Experience from "./Experience";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.createPerspectiveCamera();
    this.createOrthographicCamera();
    this.setOrbitControls();
  }

  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(35, this.sizes.aspectRatio, 0.1, 100);
    this.scene.add(this.perspectiveCamera);
    this.perspectiveCamera.position.x = 29;
    this.perspectiveCamera.position.y = 14;
    this.perspectiveCamera.position.z = 12;

  }

  createOrthographicCamera() {
    this.frustum = 5;
    this.orthographicCamera = new THREE.OrthographicCamera(
      (-this.sizes.aspectRatio * this.sizes.frustum) / 2,
      (this.sizes.aspectRatio * this.sizes.frustum) / 2,
      this.sizes.frustum / 2,
      -this.sizes.frustum / 2,
      -50,
      50
    );
    // this.orthographicCamera = new THREE.PerspectiveCamera(35, this.sizes.aspectRatio, 0.1, 100);

    this.orthographicCamera.position.y = 3.5;
    this.orthographicCamera.position.z = 5;
    this.orthographicCamera.rotation.x = -Math.PI / 6;

    this.scene.add(this.orthographicCamera);

    // this.helper = new THREE.CameraHelper(this.orthographicCamera);
    // this.scene.add(this.helper);

    // const size = 20;
    // const divisions = 20;
    // const gridHelper = new THREE.GridHelper(size, divisions);
    // this.scene.add(gridHelper);

    // const axesHelper = new THREE.AxesHelper(10);
    // this.scene.add(axesHelper);

  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.enableZoom = true;
  }

  resize() {
    this.perspectiveCamera.aspect = this.sizes.aspectRatio;
    this.perspectiveCamera.updateProjectionMatrix();
    this.orthographicCamera.left = (-this.sizes.aspectRatio * this.frustum) / 2;
    this.orthographicCamera.right = (this.sizes.aspectRatio * this.frustum) / 2;
    this.orthographicCamera.top = this.frustum / 2;
    this.orthographicCamera.bottom = -this.frustum / 2;
    this.orthographicCamera.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
    // this.helper.matrixWorldNeedsUpdate = true;
    // this.helper.update();
    // this.helper.position.copy(this.perspectiveCamera.position);
    // this.helper.rotation.copy(this.perspectiveCamera.rotation);
  }
}