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

    this.orthographicCamera.position.z = 5;
    this.orthographicCamera.position.y = this.orthographicCamera.bottom;

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

  /**
   * Get the width and height of the orthographic camera
   * @returns {THREE.Vector2} width and height of the camera
   */
  getCameraSize() {
    return new THREE.Vector2(
      Math.abs(this.orthographicCamera.right - this.orthographicCamera.left),
      Math.abs(this.orthographicCamera.top - this.orthographicCamera.bottom)
    );
  }

  /**
   * Project a pixel coordinate to a 3D coordinate based on the orthographic camera
   * @param {*} x pixel coordinate
   * @param {*} y pixel coordinate
   * @param {*} depth depth in the scene
   * @returns {THREE.Vector3} 3D coordinate
   */
  getScenePosition(x, y, depth=0) {
    // normalize device coordinates
    var ndcX = (x / this.sizes.width) * 2 - 1;
    var ndcY = -(y / this.sizes.height) * 2 + 1;

    // convert to world space
    var vec = new THREE.Vector3(ndcX, ndcY, depth);
    vec.unproject(this.orthographicCamera);
    return vec;

    // // calc scene position
    // const dir = vec.sub(this.orthographicCamera.position).normalize();
    // const distance = -this.orthographicCamera.position.z / dir.z;
    // const scenePos = this.orthographicCamera.position.clone().add(dir.multiplyScalar(distance));
    // return scenePos;
  }

  /**
   * Project a 3D coordinate to a pixel coordinate based on the orthographic camera
   * @param {THREE.Vector3} pos 
   * @returns {THREE.Vector2} pixel coordinate
   */
  getPixelPosition(pos) {
    var widthHalf = this.sizes.width / 2;
    var heightHalf = this.sizes.height / 2;
    var vec = pos.clone();
    vec.project(this.orthographicCamera);
    var returnVec = new THREE.Vector2(
      (vec.x * widthHalf) + widthHalf,
      -(vec.y * heightHalf) + heightHalf
    );
    return returnVec;
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
    // this.helper.position.copy(this.orthographicCamera.position);
    // this.helper.rotation.copy(this.orthographicCamera.rotation);
  }
}