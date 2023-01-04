import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose"

// Define Gesture Description
export const passGesture = new GestureDescription("pass")

// Thumb
passGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.5)
passGesture.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 0.5)

// Index
passGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 0.5)
passGesture.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 0.5)
passGesture.addDirection(Finger.Index, FingerDirection.HorizontalRight, 0.5)

// Pinky
passGesture.addCurl(Finger.Pinky, FingerCurl.NoCurl, 0.5)
passGesture.addDirection(Finger.Pinky, FingerDirection.HorizontalLeft, 0.5)
passGesture.addDirection(Finger.Pinky, FingerDirection.HorizontalRight, 0.5)

// Middle
passGesture.addCurl(Finger.Middle, FingerCurl.NoCurl, 0.5)
passGesture.addDirection(Finger.Middle, FingerDirection.HorizontalLeft, 0.5)
passGesture.addDirection(Finger.Middle, FingerDirection.HorizontalRight, 0.5)

//Ring
passGesture.addCurl(Finger.Ring, FingerCurl.NoCurl, 0.5)
passGesture.addDirection(Finger.Ring, FingerDirection.HorizontalLeft, 0.5)
passGesture.addDirection(Finger.Ring, FingerDirection.HorizontalRight, 0.5)
