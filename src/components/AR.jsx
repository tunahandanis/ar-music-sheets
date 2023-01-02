import { useState } from "react"
import { useSheetContext } from "../context/sheetContext"
import {
  ZapparCamera,
  InstantTracker,
  ZapparCanvas,
  BrowserCompatibility,
} from "@zappar/zappar-react-three-fiber"

import Spinner from "./Spinner"
import Mesh from "./Mesh"
import Nav from "./Nav"
import { Modal, Select } from "antd"

const AR = () => {
  const { sheet, sheetIndex, updateSheet } = useSheetContext()

  const [placementMode, setPlacementMode] = useState(true)
  const [isSpinning, setIsSpinning] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSheet, setSelectedSheet] = useState(sheet)

  const openModal = () => setIsModalOpen(true)

  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <Nav isAr openModal={openModal} />

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
      <Modal
        title="Select a Sheet"
        open={isModalOpen}
        onOk={() => {
          updateSheet(selectedSheet)
          setIsModalOpen(false)
        }}
        okText="Confirm"
        onCancel={() => setIsModalOpen(false)}
      >
        <Select
          placeholder="Select a sheet"
          optionFilterProp="children"
          defaultValue={sheetIndex ?? null}
          onChange={(value) => setSelectedSheet(value)}
          options={[
            {
              value: 0,
              label: "La Dispute - Yann Tiersen",
            },
            {
              value: 1,
              label: "Hammy's Boogie - Hammy Howell",
            },
          ]}
        />
      </Modal>
    </>
  )
}

export default AR
