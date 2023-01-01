import { useState } from "react"
import { useSheetContext } from "../context/sheetContext"
import {
  ZapparCamera,
  InstantTracker,
  ZapparCanvas,
  BrowserCompatibility,
  Loader,
} from "@zappar/zappar-react-three-fiber"

import Spinner from "./Spinner"
import Mesh from "./Mesh"

const AR = () => {
  const [placementMode, setPlacementMode] = useState(true)
  const [isSpinning, setIsSpinning] = useState(true)

  const { sheet, updateSheet } = useSheetContext()

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
          {sheet &&
            sheet.map((page, index) => (
              <Mesh key={index} page={page} index={index} />
            ))}
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
      {!isSpinning && (
        <button onClick={() => updateSheet(0)}>Get La Dispute</button>
      )}
      {!isSpinning && <button onClick={() => updateSheet(1)}>Get Hammy</button>}
    </>
  )
}

export default AR
