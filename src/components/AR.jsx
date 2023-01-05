import { useRef, useState, useEffect } from "react"
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
import { Modal, Select, InputNumber, Slider, Segmented } from "antd"
import { PlayCircleOutlined, PauseCircleOutlined } from "@ant-design/icons"

import * as tf from "@tensorflow/tfjs"
import * as speech from "@tensorflow-models/speech-commands"

// import img from "../assets/music-stand-white.png"

/* import * as tf from "@tensorflow/tfjs"
import * as handpose from "@tensorflow-models/handpose"
import { drawHand } from "../util/util"
 */
/* import { passGesture } from "../handGestures/Pass"
import { prevGesture } from "../handGestures/Prev" */

/* import * as fp from "fingerpose"
import Webcam from "react-webcam" */

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
  const [action, setAction] = useState(null)
  const [labels, setLabels] = useState(null)

  /* const cameraRef = useRef()
  const intervalRef = useRef()
 */

  const currentPageRef = useRef(currentPage)
  const sheetRef = useRef(sheet)

  const [count, setCount] = useState(0)

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

  /* const runHandpose = async () => {} */

  /* const detect = async (net) => {
    // Check data is available
    if (isMultiple) return

    if (
      typeof cameraRef.current !== "undefined" &&
      cameraRef.current !== null &&
      cameraRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = cameraRef.current.video
      const videoWidth = cameraRef.current.video.videoWidth
      const videoHeight = cameraRef.current.video.videoHeight

      // Set video width
      cameraRef.current.video.width = videoWidth
      cameraRef.current.video.height = videoHeight

      // Make Detections
      const hand = await net.estimateHands(video)
      // console.log(hand);

      ///////// NEW STUFF ADDED GESTURE HANDLING

      if (hand.length > 0) {
        const GE = new fp.GestureEstimator([passGesture])
        const gesture = await GE.estimate(hand[0].landmarks, 4)
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          if (currentPage < sheet.length - 1) {
            setCurrentPage((prev) => prev + 1)
            console.log(currentPage)
            console.log(sheet.length)
          }

          const confidence = gesture.gestures.map(
            (prediction) => prediction.confidence
          )
          const maxConfidence = confidence.indexOf(
            Math.max.apply(null, confidence)
          )
        }
      }

      if (hand.length > 0) {
        const GE = new fp.GestureEstimator([prevGesture])
        const gesture = await GE.estimate(hand[0].landmarks, 4)
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          if (currentPage > 0) {
            setCurrentPage((prev) => prev - 1)
          }

          const confidence = gesture.gestures.map(
            (prediction) => prediction.confidence
          )
          const maxConfidence = confidence.indexOf(
            Math.max.apply(null, confidence)
          )
        }
      }

      ///////// NEW STUFF ADDED GESTURE HANDLING
    }
  } */

  /* useEffect(() => {
    let intervalId
    const runHandpose = async () => {
      const net = await handpose.load()
      console.log("Handpose model loaded.")
      //  Loop and detect hands
      intervalId = setInterval(() => {
        detect(net)
      }, 1000)
    }

    runHandpose()

    return () => clearInterval(intervalId)
  }, [isMultiple, currentPage]) */

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
      {/* {!isMultiple && (
        <Webcam
          ref={cameraRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 1,
            height: 1,
          }}
          videoConstraints={{
            facingMode: "environment",
          }}
        />
      )} */}
    </>
  )
}

export default AR
