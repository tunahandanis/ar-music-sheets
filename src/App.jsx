import AR from "./components/AR"
import Home from "./components/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Suspense } from "react"
import { Loader } from "@zappar/zappar-react-three-fiber"
import Nav from "./components/Nav"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <>
              <Nav />
              <Home />
            </>
          }
        />
        <Route
          path="ar"
          element={
            <Suspense fallback={<Loader />}>
              <AR />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
