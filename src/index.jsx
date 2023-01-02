import React from "react"
import ReactDOM from "react-dom/client"
import "./style.scss"
import App from "./App"
import { SheetProvider } from "./context/sheetContext"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <SheetProvider>
      <App />
    </SheetProvider>
  </React.StrictMode>
)
