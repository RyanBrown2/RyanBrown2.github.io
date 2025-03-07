import * as THREE from 'three';
import './style.scss'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { createLimitPan } from './util/OrbitControlsUtil';

const canvas = document.querySelector('#experience-canvas')

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

const scene = new THREE.Scene();

// Loaders

const textureLoader = new THREE.TextureLoader();

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);

const textureMap = {
  First: {
    day: "/textures/First.webp",
    // night: "/textures/"
  },
  Second: {
    day: "/textures/Second.webp",
    // night: "/textures/"
  },
  Third: {
    day: "/textures/Third.webp",
    // night: "/textures/"
  }

}

const loadedTextures = {
  day: {},
  night: {}
}

Object.entries(textureMap).forEach(([key, paths]) => {
  const dayTexture = textureLoader.load(paths.day);
  dayTexture.flipY = false;
  loadedTextures.day[key] = dayTexture;
});

loader.load("/models/room.glb", (glb) => {
  glb.scene.traverse((child) => {
    if (child.isMesh) {
      Object.keys(textureMap).forEach(key => {
        if (child.name.includes(key)) {
          const material = new THREE.MeshBasicMaterial({
            map: loadedTextures.day[key]
          });
          child.material = material;
        }
      })
    }
  });;

  scene.add(glb.scene);

});

// ---------- SETUP LIGHTING ----------
// For now using lighting from https://threejs.org/examples/#webgl_lights_hemisphere
scene.background = new THREE.Color().setHSL( 0.6, 0, 1 );
scene.fog = new THREE.Fog( scene.background, 1, 5000 );

const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 2 );
hemiLight.color.setHSL( 0.6, 1, 0.6 );
hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
hemiLight.position.set( 0, 50, 0 );
scene.add( hemiLight );

const dirLight = new THREE.DirectionalLight( 0xffffff, 3 );
dirLight.color.setHSL( 0.1, 1, 0.95 );
dirLight.position.set( - 1, 1.75, 1 );
dirLight.position.multiplyScalar( 30 );
scene.add( dirLight );

dirLight.castShadow = true;

dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;

const d = 50;

dirLight.shadow.camera.left = - d;
dirLight.shadow.camera.right = d;
dirLight.shadow.camera.top = d;
dirLight.shadow.camera.bottom = - d;

dirLight.shadow.camera.far = 3500;
dirLight.shadow.bias = - 0.0001;

// GROUND

const groundGeo = new THREE.PlaneGeometry( 10000, 10000 );
const groundMat = new THREE.MeshLambertMaterial( { color: 0xffffff } );
groundMat.color.setHSL( 0.095, 1, 0.75 );

const ground = new THREE.Mesh( groundGeo, groundMat );
ground.position.y = - 33;
ground.rotation.x = - Math.PI / 2;
ground.receiveShadow = true;
scene.add( ground );

// SKYDOME

const vertexShader = document.getElementById( 'vertexShader' ).textContent;
const fragmentShader = document.getElementById( 'fragmentShader' ).textContent;
const uniforms = {
  'topColor': { value: new THREE.Color( 0x0077ff ) },
  'bottomColor': { value: new THREE.Color( 0xffffff ) },
  'offset': { value: 33 },
  'exponent': { value: 0.6 }
};
uniforms[ 'topColor' ].value.copy( hemiLight.color );

scene.fog.color.copy( uniforms[ 'bottomColor' ].value );

const skyGeo = new THREE.SphereGeometry( 1000, 32, 15 );
const skyMat = new THREE.ShaderMaterial( {
  uniforms: uniforms,
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  side: THREE.BackSide
} );

const sky = new THREE.Mesh( skyGeo, skyMat );
scene.add( sky );

// ---------- END SETUP LIGHTING ----------

const camera = new THREE.PerspectiveCamera( 75, sizes.width / sizes.height , 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
renderer.setSize( sizes.width, sizes.height );
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;

document.body.appendChild( renderer.domElement );

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.15;

// Set starting positions based on screen size
if (window.innerWidth < 768) {
  camera.position.set(5.011558695227119, 2.990081239112556, 4.80380085188688);
  controls.target.set(-0.13228971485785346, 0.4686035244663677, -0.11783050532381764);
} else {
  camera.position.set(3.3734282795950787, 1.7620280304294986, 3.2200717379937034);
  controls.target.set(-0.13228971485785346, 0.4686035244663677, -0.11783050532381764);

}

// Control ranges
controls.minDistance = 1;
controls.maxDistance = 10;
controls.minPolarAngle = 0;
controls.maxPolarAngle = Math.PI / 2;
controls.minAzimuthAngle = 0;
controls.maxAzimuthAngle = Math.PI / 2;

// Pan limits
const panRange = 1.5;
const panLimit = createLimitPan({ camera, controls, THREE });
controls.addEventListener('change', () => {
  panLimit({
    minX: -panRange,
    maxX: panRange,
    minY: 0,
    maxY: 2,
    minZ: -panRange,
    maxZ: panRange
  });
});


controls.update();

// Event listeners
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

const render = () => {
  controls.update();
  // console.log('Camera position:', camera.position);
  // console.log('Orbit controls:', controls.target);
  // console.log('Orbit controls:', controls.getPolarAngle() * (180 / Math.PI), controls.getAzimuthalAngle() * (180 / Math.PI));

	renderer.render( scene, camera );

  window.requestAnimationFrame(render);
}

render();