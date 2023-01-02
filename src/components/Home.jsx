import { useNavigate } from "react-router-dom"

const Home = () => {
  let navigate = useNavigate()

  return (
    <div className="home">
      <div className="home__button-container">
        <button>Select Sheet</button>
        <button onClick={() => navigate("/ar")}>Launch AR</button>
      </div>
    </div>
  )
}

export default Home
