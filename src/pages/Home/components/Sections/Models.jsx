import { useState, useRef } from 'react'
import { OrthographicCamera, useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'
import { useGesture } from '@use-gesture/react'
import * as THREE from 'three'
import { clamp } from 'three/src/math/MathUtils'

import assets from './assets'
import Sizes from '../../../../util/Sizes'
import ThreeUtil from '../../../../util/ThreeUtil'

export function ReverseEngineeringModel(props) {
	const ref = useRef();
	const cameraRef = useRef();
	const [hovered, spread] = useHover();

	const { viewport } = useThree();

	const [animationProgress, setAnimationProgress] = useState(0);

	const sizes = new Sizes();
	const assetData = assets.reverseEngineering;

	const model = useGLTF(assetData.path);

	let mixer
	if (model.animations.length) {
		mixer = new THREE.AnimationMixer(model.scene);
		model.animations.forEach((clip) => {
			const action = mixer.clipAction(clip);
			action.play();
		});
	}
	useFrame((state, delta) => {
		mixer?.setTime(animationProgress * assetData.animationScale);
		// model.materials.MagGlass.opacity = 1 - animationProgress;
		// model.scene.children[2].material.opacity = 1 - animationProgress;


		const scaleX = viewport.width / 6;
		const scaleY = viewport.height / 3;

		const scaleFactor = Math.min(scaleX, scaleY);

		ref.current.scale.set(scaleFactor, scaleFactor, scaleFactor);

	});

	return (
		<>
		<ambientLight intensity={3} />
		<OrthographicCamera
			ref={cameraRef}
			makeDefault
			zoom={20}
			top={200}
			bottom={-200}
			left={200}
			right={-200}
			near={1}
			far={2000}
			position={[0, 0, 10]} 
			/>
		<group ref={ref} {...props} {...spread} dispose={null}>
			<primitive
				object={model.scene} />
			
			<mesh
				onPointerMove={(e) => {
					var pos = e.intersections[0].uv;
					var distanceFromCenter = Math.sqrt((pos.x - 0.5) * (pos.x - 0.5) + (pos.y - 0.5) * (pos.y - 0.5));
					var progress = 1 - clamp(distanceFromCenter * 2, 0, 1);
					setAnimationProgress(progress);
				}}
				onPointerLeave={(e) => {
					setAnimationProgress(0);
				}}
				position={[0, 0, 1]}
				>
					<planeGeometry args={[6, 6]}/>
					<meshBasicMaterial color="white" opacity={0} transparent={true} />
				</mesh>
		 </group>
		</>
	);

	// if (resources.isLoaded()) {
	//   return (
	//     <primitive object={resources.items.reverseEngineering.scene} />
	//   )
	// }
}


const Common = ({zoom}) => (
	<>
		<ambientLight intensity={3} />
		<OrthographicCamera
			makeDefault
			zoom={zoom}
			top={20}
			bottom={-20}
			left={20}
			right={-20}
			near={1}
			far={2000}
			position={[0, 0, 10]} 
			/>
	</>
)

export function Soda(props) {
	const ref = useRef()
	const [hovered, spread] = useHover()
	const { nodes, materials } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/soda-bottle/model.gltf')
	useFrame((state, delta) => (ref.current.rotation.y += delta))
	return (
		<group ref={ref} {...props} {...spread} dispose={null}>
			<mesh geometry={nodes.Mesh_sodaBottle.geometry}>
				<meshStandardMaterial color={hovered ? 'red' : 'green'} roughness={0.33} metalness={0.8} envMapIntensity={2} />
			</mesh>
			<mesh geometry={nodes.Mesh_sodaBottle_1.geometry} material={materials.red} material-envMapIntensity={0} />
		</group>
	)
}

function useHover() {
	const [hovered, hover] = useState(false)
	return [hovered, { onPointerOver: (e) => hover(true), onPointerOut: () => hover(false) }]
}

export function Duck(props) {
	const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/duck/model.gltf')
	return <primitive object={scene} {...props} />
}

export function Candy(props) {
	const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/candy-bucket/model.gltf')
	useFrame((state, delta) => (scene.rotation.z = scene.rotation.y += delta))
	return <primitive object={scene} {...props} />
}

export function Flash(props) {
	const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/lightning/model.gltf')
	useFrame((state, delta) => (scene.rotation.y += delta))
	return <primitive object={scene} {...props} />
}

export function Apple(props) {
	const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/apple-half/model.gltf')
	useFrame((state, delta) => (scene.rotation.y += delta))
	return <primitive object={scene} {...props} />
}

export function Target(props) {
	const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/target-stand/model.gltf')
	useFrame((state, delta) => (scene.rotation.y += delta))
	return <primitive object={scene} {...props} />
}
