import AR from "./components/AR"
import Home from "./components/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="ar" element={<AR />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
