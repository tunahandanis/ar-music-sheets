import React, { useState } from "react"
import {
  ZapparCamera,
  InstantTracker,
  ZapparCanvas,
  BrowserCompatibility,
} from "@zappar/zappar-react-three-fiber"
import * as THREE from "three"
import { useLoader } from "react-three-fiber"

import img from "./logo512.png"

function App() {
  const [placementMode, setPlacementMode] = useState(true)
  const texture = useLoader(THREE.TextureLoader, img)
  texture.generateMipmaps = false

  return (
    <>
      <BrowserCompatibility />
      <ZapparCanvas>
        <ZapparCamera />
        <InstantTracker
          placementMode={placementMode}
          placementCameraOffset={[0, 0, -5]}
        >
          <mesh>
            <planeBufferGeometry attach="geometry" args={[2.5, 2.5]} />
            <meshBasicMaterial
              attach="material"
              map={texture}
              transparent
              toneMapped={false}
            />
          </mesh>
        </InstantTracker>
        <directionalLight position={[2.5, 8, 5]} intensity={1.5} />
      </ZapparCanvas>
      <div
        id="zappar-button"
        role="button"
        onKeyPress={() => {
          setPlacementMode((currentPlacementMode) => !currentPlacementMode)
        }}
        tabIndex={0}
        onClick={() => {
          setPlacementMode((currentPlacementMode) => !currentPlacementMode)
        }}
      >
        Tap here to
        {placementMode ? " place " : " pick up "}
        the object
      </div>
    </>
  )
}

export default App
