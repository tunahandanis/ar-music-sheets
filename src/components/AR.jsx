import { useRef, useState, useEffect } from "react"
import { useSheetContext } from "../context/sheetContext"
import { useMetronomeContext } from "../context/metronomeContext"
import {
  ZapparCamera,
  InstantTracker,
  ZapparCanvas,
  BrowserCompatibility,
} from "@zappar/zappar-react-three-fiber"

import * as tfjs from "@tensorflow/tfjs"

import Spinner from "./Spinner"
import Mesh from "./Mesh"
import Nav from "./Nav"
import { Modal, Select, InputNumber, Slider, Segmented } from "antd"
import { PlayCircleOutlined, PauseCircleOutlined } from "@ant-design/icons"

import * as speech from "@tensorflow-models/speech-commands"

const AR = () => {
  const { sheet, sheetIndex, updateSheet } = useSheetContext()
  const { isRunning, startStop, slideTempo, tempo } = useMetronomeContext()

  const [sheetPlacementMode, setSheetPlacementMode] = useState(true)
  const [isMultiple, setIsMultiple] = useState(true)
  const [isMultipleSelected, setIsMultipleSelected] = useState()
  const [isSpinning, setIsSpinning] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSheet, setSelectedSheet] = useState()
  const [selectedPageSize, setSelectedPageSize] = useState(2.5)
  const [pageSize, setPageSize] = useState(2.5)
  const [currentPage, setCurrentPage] = useState(0)

  const [model, setModel] = useState(null)
  const [labels, setLabels] = useState(null)

  const currentPageRef = useRef(currentPage)
  const sheetRef = useRef(sheet)

  const loadModel = async () => {
    const recognizer = await speech.create("BROWSER_FFT")
    console.log("Model Loaded")
    await recognizer.ensureModelLoaded()
    console.log(recognizer.wordLabels())
    setModel(recognizer)
    setLabels(recognizer.wordLabels())
  }

  useEffect(() => {
    loadModel()
  }, [])

  useEffect(() => {
    currentPageRef.current = currentPage
    sheetRef.current = sheet
  }, [currentPage, sheet])

  function argMax(arr) {
    return arr.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1]
  }

  const recognizeCommands = async () => {
    console.log("Listening for commands")
    model.listen(
      (result) => {
        // console.log(labels[argMax(Object.values(result.scores))])
        const newAction = labels[argMax(Object.values(result.scores))]
        console.log(newAction)
        if (
          newAction === "right" &&
          sheetRef.current &&
          currentPageRef.current < sheetRef.current.length - 1
        ) {
          console.log(currentPageRef.current)
          setCurrentPage((prev) => prev + 1)
        }

        if (
          newAction === "left" &&
          sheetRef.current &&
          currentPageRef.current > 0
        ) {
          console.log(currentPageRef.current)

          setCurrentPage((prev) => prev - 1)
        }
      },
      { includeSpectrogram: true, probabilityThreshold: 0.9 }
    )
  }

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
            isMultiple &&
            sheet.map((page, index) => (
              <Mesh key={index} page={page} index={index} pageSize={pageSize} />
            ))}
          {sheet && !isMultiple && (
            <Mesh
              key={0}
              index={0}
              page={sheet[currentPage]}
              pageSize={pageSize}
            />
          )}
        </InstantTracker>

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
          if (selectedSheet !== undefined) {
            updateSheet(selectedSheet)
          }

          if (selectedPageSize !== undefined) {
            setPageSize(selectedPageSize)
          }

          if (isMultipleSelected !== undefined) {
            setIsMultiple(isMultipleSelected)
          }

          recognizeCommands()

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
        <Segmented
          className="segmented"
          options={["Multiple", "Single"]}
          defaultValue="Multiple"
          onChange={(value) => {
            if (value === "Multiple") setIsMultipleSelected(true)
            else setIsMultipleSelected(false)
          }}
          block
        />
      </Modal>
    </>
  )
}

export default AR
