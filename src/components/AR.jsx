import React, { useState } from "react"
import {
  ZapparCamera,
  InstantTracker,
  ZapparCanvas,
  BrowserCompatibility,
} from "@zappar/zappar-react-three-fiber"
import * as THREE from "three"
import { useLoader } from "react-three-fiber"

import img from "../assets/transparent.png"
import Spinner from "./Spinner"

const AR = () => {
  const [placementMode, setPlacementMode] = useState(true)
  const [isSpinning, setIsSpinning] = useState(true)
  const texture = useLoader(THREE.TextureLoader, img)
  texture.generateMipmaps = false

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
          <mesh>
            <planeBufferGeometry attach="geometry" args={[2.5, 2.5]} />
            <meshBasicMaterial attach="material" map={texture} transparent />
          </mesh>
          <mesh position={[2.5, 0, 0]}>
            <planeBufferGeometry attach="geometry" args={[2.5, 2.5]} />
            <meshBasicMaterial attach="material" map={texture} transparent />
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
