import * as THREE from "three"
import { useLoader } from "react-three-fiber"

const Mesh = ({ page, index, pageSize }) => {
  const texture = useLoader(THREE.TextureLoader, page)
  texture.generateMipmaps = false
  return (
    <mesh position={[pageSize * index, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[pageSize, pageSize]} />
      <meshBasicMaterial attach="material" map={texture} transparent />
    </mesh>
  )
}

export default Mesh
