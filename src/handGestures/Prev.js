import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose"

// Define Gesture Description
export const prevGesture = new GestureDescription("prev")

// Thumb
prevGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.5)
prevGesture.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 0.5)

// Index
prevGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 0.75)
prevGesture.addDirection(Finger.Index, FingerDirection.HorizontalRight, 0.5)

// Pinky
prevGesture.addCurl(Finger.Pinky, FingerCurl.NoCurl, 0.75)
prevGesture.addDirection(Finger.Pinky, FingerDirection.HorizontalRight, 0.5)

// Middle
prevGesture.addCurl(Finger.Middle, FingerCurl.NoCurl, 0.75)
prevGesture.addDirection(Finger.Middle, FingerDirection.HorizontalRight, 0.5)

//Ring
prevGesture.addCurl(Finger.Ring, FingerCurl.NoCurl, 0.75)
prevGesture.addDirection(Finger.Ring, FingerDirection.HorizontalRight, 0.5)
