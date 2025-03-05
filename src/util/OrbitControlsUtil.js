
// https://discourse.threejs.org/t/how-to-limit-pan-in-orbitcontrols-for-orthographiccamera/9061/15
export function createLimitPan({ camera, controls, THREE }) {
  const v = new THREE.Vector3();
  const minPan = new THREE.Vector3();
  const maxPan = new THREE.Vector3();
  return ({
      maxX = Infinity,
      minX = -Infinity,
      maxY = Infinity,
      minY = -Infinity,
      maxZ = Infinity,
      minZ = -Infinity
  }) => {
      minPan.set(minX, minY, minZ)
      maxPan.set(maxX, maxY, maxZ)
      v.copy(controls.target)
      controls.target.clamp(minPan, maxPan)
      v.sub(controls.target)
      camera.position.sub(v)
  }
}