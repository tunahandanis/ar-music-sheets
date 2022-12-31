import { Suspense, useState } from "react"
import { Link } from "react-router-dom"
import AR from "./AR"
import { Loader } from "@zappar/zappar-react-three-fiber"

const Home = () => {
  const [arOn, setArOn] = useState(false)
  return (
    <Suspense fallback={<Loader onLoad={() => console.log("loaded")} />}>
      {/* <Link to="/ar">Go to AR</Link> */}

      {arOn ? (
        <AR />
      ) : (
        <button className="arToggleBtn" onClick={() => setArOn(true)}>
          Go to AR
        </button>
      )}
    </Suspense>
  )
}

export default Home
