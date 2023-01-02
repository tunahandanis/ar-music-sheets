import React from "react"
import ReactDOM from "react-dom/client"
import "./style.scss"
import App from "./App"
import { SheetProvider } from "./context/sheetContext"
import { MetronomeProvider } from "./context/metronomeContext"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <SheetProvider>
      <MetronomeProvider>
        <App />
      </MetronomeProvider>
    </SheetProvider>
  </React.StrictMode>
)
