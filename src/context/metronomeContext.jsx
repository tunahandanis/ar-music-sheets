import React, { useState, useEffect, useRef, useContext } from "react"

import silence from "../assets/silence.mp3"

import { AudioContext } from "standardized-audio-context"

const MetronomeContext = React.createContext()

const MetronomeProvider = ({ children }) => {
  const [isRunning, setIsRunning] = useState(false)
  const [tempo, setTempo] = useState(60)

  const intervalRef = useRef()
  const audioContext = useRef(null)
  const tempoRef = useRef(tempo)

  useEffect(() => {
    tempoRef.current = tempo
  }, [tempo])

  let timeBetweenBeats

  let nextNoteTime = 0.0

  const turnOn = () => {
    setIsRunning(true)
  }

  const turnOff = () => {
    setIsRunning(false)
  }

  const slideTempo = (e) => {
    setTempo(e)
  }

  const start = () => {
    if (isRunning) return

    if (audioContext.current === null) {
      let audio = new Audio(silence)
      audio.play()

      audioContext.current = new AudioContext()
    }

    turnOn()

    nextNoteTime = audioContext.current.currentTime + 0.1

    intervalRef.current = setInterval(scheduler, 25)
  }

  const stop = () => {
    turnOff()

    clearInterval(intervalRef.current)
  }

  const startStop = () => {
    if (isRunning) stop()
    else start()
  }

  const scheduler = () => {
    while (nextNoteTime < audioContext.current.currentTime + 0.1) {
      scheduleNote(nextNoteTime)
      nextNote()
    }
  }

  const scheduleNote = (time) => {
    const osc = audioContext.current.createOscillator()

    osc.frequency.value = 800

    osc.connect(audioContext.current.destination)

    osc.start(time)
    osc.stop(time + 0.025)
  }

  const nextNote = () => {
    timeBetweenBeats = 60.0 / tempoRef.current

    nextNoteTime += timeBetweenBeats
  }

  return (
    <MetronomeContext.Provider
      value={{
        isRunning,
        startStop,
        tempo,
        slideTempo,
      }}
    >
      {children}
    </MetronomeContext.Provider>
  )
}

const useMetronomeContext = () => {
  return useContext(MetronomeContext)
}

export { MetronomeProvider, useMetronomeContext }
