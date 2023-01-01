import React, { useState } from "react"
import {
  ZapparCamera,
  InstantTracker,
  ZapparCanvas,
  BrowserCompatibility,
} from "@zappar/zappar-react-three-fiber"
import * as THREE from "three"
import { useLoader } from "react-three-fiber"

/* import img1 from "../assets/la-dispute-1.png"
import img2 from "../assets/la-dispute-2.png"
import img3 from "../assets/la-dispute-3.png" */

import hammy1 from "../assets/hammy-1.png"

import Spinner from "./Spinner"

const AR = () => {
  const [placementMode, setPlacementMode] = useState(true)
  const [isSpinning, setIsSpinning] = useState(true)

  /* const texture1 = useLoader(THREE.TextureLoader, img1)
  texture1.generateMipmaps = false

  const texture2 = useLoader(THREE.TextureLoader, img2)
  texture2.generateMipmaps = false

  const texture3 = useLoader(THREE.TextureLoader, img3)
  texture3.generateMipmaps = false */

  const hammyTexture1 = useLoader(THREE.TextureLoader, hammy1)
  hammyTexture1.generateMipmaps = false

  return (
    <>
      {isSpinning && <Spinner />}
      <BrowserCompatibility />
      <ZapparCanvas>
        <ZapparCamera
          onFirstFrame={() => {
            setIsSpinning(false)
          }}
        />
        <InstantTracker
          placementMode={placementMode}
          placementCameraOffset={[0, 0, -5]}
        >
          {/* <mesh>
            <planeBufferGeometry attach="geometry" args={[2.5, 2.5]} />
            <meshBasicMaterial attach="material" map={texture1} transparent />
          </mesh>
          <mesh position={[2.5, 0, 0]}>
            <planeBufferGeometry attach="geometry" args={[2.5, 2.5]} />
            <meshBasicMaterial attach="material" map={texture2} transparent />
          </mesh>
          <mesh position={[5, 0, 0]}>
            <planeBufferGeometry attach="geometry" args={[2.5, 2.5]} />
            <meshBasicMaterial attach="material" map={texture3} transparent />
          </mesh> */}
          <mesh>
            <planeBufferGeometry attach="geometry" args={[2.5, 2.5]} />
            <meshBasicMaterial
              attach="material"
              map={hammyTexture1}
              transparent
            />
          </mesh>
        </InstantTracker>
        <directionalLight position={[2.5, 8, 5]} intensity={1.5} />
      </ZapparCanvas>
      {!isSpinning && (
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
      )}
    </>
  )
}

export default AR
