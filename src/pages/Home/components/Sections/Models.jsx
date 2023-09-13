import { useState, useRef } from 'react'
import { OrthographicCamera, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'

export function ReverseEngineeringModel(props) {
  const ref = useRef()
  const [hovered, spread] = useHover()

  const [animationProgress, setAnimationProgress] = useState(0);

  // console.log(useGLTF('/models/re.glb'));

  const model = useGLTF('/models/re.glb');

  // const springs = useSpring({ scale: active ? 1.5 : 1 })

  let mixer
  if (model.animations.length) {
    mixer = new THREE.AnimationMixer(model.scene);
    model.animations.forEach((clip) => {
      const action = mixer.clipAction(clip);
      action.play();
    });
  }

  useFrame((state, delta) => {
    mixer?.setTime(animationProgress);
    // console.log(delta);
    // const a = clock.getElapsedTime()
    // console.log(a);
  });

  return (

    <group ref={ref} {...props} {...spread} dispose={null}>
        
      <primitive
        object={model.scene} />
        <mesh
          onPointerMove={(e) => {
            var pos = e.intersections[0].uv;
            var distanceFromCenter = Math.sqrt((pos.x - 0.5) * (pos.x - 0.5) + (pos.y - 0.5) * (pos.y - 0.5));
            setAnimationProgress(1 - distanceFromCenter);
          }}
        >
          <planeGeometry args={[6, 6]} />
          {/* <meshBasicMaterial color="black" opacity={0.5} transparent={true} /> */}
        </mesh>
     </group>
    
  );

  // if (resources.isLoaded()) {
  //   return (
  //     <primitive object={resources.items.reverseEngineering.scene} />
  //   )
  // }
}

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
