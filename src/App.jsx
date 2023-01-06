import AR from "./components/AR"
import Home from "./components/Home"
import { HashRouter, Routes, Route } from "react-router-dom"
import { Suspense } from "react"
import { Loader } from "@zappar/zappar-react-three-fiber"
import Nav from "./components/Nav"

function App() {
  return (
    <HashRouter>
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
    </HashRouter>
  )
}

export default App
