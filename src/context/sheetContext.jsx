import React, { useState, useContext } from "react"

import laDispute1 from "../assets/la-dispute-1.png"
import laDispute2 from "../assets/la-dispute-2.png"
import laDispute3 from "../assets/la-dispute-3.png"

import hammy1 from "../assets/hammy-1.png"

const sheets = [[laDispute1, laDispute2, laDispute3], [hammy1]]

const SheetContext = React.createContext()

const SheetProvider = ({ children }) => {
  const [sheet, setSheet] = useState()

  const updateSheet = (newSheetIndex) => {
    setSheet(sheets[newSheetIndex])
  }

  return (
    <SheetContext.Provider value={{ sheet, updateSheet }}>
      {children}
    </SheetContext.Provider>
  )
}

const useSheetContext = () => {
  return useContext(SheetContext)
}

export { SheetProvider, useSheetContext }
