import React, { useState } from "react"
import {
  ZapparCamera,
  InstantTracker,
  ZapparCanvas,
  BrowserCompatibility,
} from "@zappar/zappar-react-three-fiber"
import * as THREE from "three"
import { useLoader } from "react-three-fiber"

import img from "./assets/transparent.png"

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
        tabIndex={0}
        onClick={() => {
          setPlacementMode((currentPlacementMode) => !currentPlacementMode)
        }}
      >
        {placementMode ? "Place " : "Pick up "}
        the sheet
      </div>
    </>
  )
}

export default App
