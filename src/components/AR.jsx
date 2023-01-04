import { useState } from "react"
import { useSheetContext } from "../context/sheetContext"
import { useMetronomeContext } from "../context/metronomeContext"
import {
  ZapparCamera,
  InstantTracker,
  ZapparCanvas,
  BrowserCompatibility,
} from "@zappar/zappar-react-three-fiber"

import Spinner from "./Spinner"
import Mesh from "./Mesh"
import Nav from "./Nav"
import { Modal, Select, InputNumber, Slider } from "antd"
import { PlayCircleOutlined, PauseCircleOutlined } from "@ant-design/icons"
// import img from "../assets/music-stand-white.png"

const AR = () => {
  const { sheet, sheetIndex, updateSheet } = useSheetContext()
  const { isRunning, startStop, slideTempo, tempo } = useMetronomeContext()

  const [sheetPlacementMode, setSheetPlacementMode] = useState(true)
  // const [standPlacementMode, setStandPlacementMode] = useState(true)
  const [isSpinning, setIsSpinning] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSheet, setSelectedSheet] = useState(sheet)
  const [selectedPageSize, setSelectedPageSize] = useState(2.5)
  const [pageSize, setPageSize] = useState(2.5)

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
          placementMode={sheetPlacementMode}
          placementCameraOffset={[0, 0, -5]}
        >
          {sheet &&
            sheet.map((page, index) => (
              <Mesh key={index} page={page} index={index} pageSize={pageSize} />
            ))}
        </InstantTracker>
        {/* <InstantTracker
          placementMode={standPlacementMode}
          placementCameraOffset={[0, 0, -5]}
        >
          <Mesh
            page={img}
            pageSize={3}
            index={0}
            meshTiltZ={-0.2}
            meshTiltY={-0.6}
          />
        </InstantTracker> */}
        <directionalLight position={[2.5, 8, 5]} intensity={1.5} />
      </ZapparCanvas>
      {!isSpinning && (
        <button
          onClick={() => {
            setSheetPlacementMode(
              (currentPlacementMode) => !currentPlacementMode
            )
          }}
          className="placement-toggle"
        >
          {sheetPlacementMode ? "Place " : "Pick up "}
          the sheet
        </button>
      )}

      <Modal
        title="Select a Sheet"
        open={isModalOpen}
        onOk={() => {
          updateSheet(selectedSheet)
          setPageSize(selectedPageSize)
          closeModal()
        }}
        okText="Confirm"
        onCancel={closeModal}
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
        <InputNumber
          min={1}
          max={10}
          defaultValue={pageSize}
          onChange={(value) => setSelectedPageSize(value)}
          step={0.5}
        />
        <div className="metronome">
          <p className="metronome__tempo">{tempo} BPM</p>
          <Slider
            defaultValue={60}
            min={30}
            max={250}
            onChange={(value) => slideTempo(value)}
          />

          {isRunning ? (
            <PauseCircleOutlined
              onClick={startStop}
              style={{ fontSize: "1.9rem" }}
            />
          ) : (
            <PlayCircleOutlined
              onClick={startStop}
              style={{ fontSize: "1.9rem" }}
            />
          )}
        </div>
      </Modal>
    </>
  )
}

export default AR
