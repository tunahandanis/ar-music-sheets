import * as THREE from "three"
import { useLoader } from "react-three-fiber"

const Mesh = ({ page, index }) => {
  const texture = useLoader(THREE.TextureLoader, page)
  texture.generateMipmaps = false
  return (
    <mesh position={[2.5 * index, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[2.5, 2.5]} />
      <meshBasicMaterial attach="material" map={texture} transparent />
    </mesh>
  )
}

export default Mesh
