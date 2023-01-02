import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Modal, Select } from "antd"
import { useSheetContext } from "../context/sheetContext"

const Home = () => {
  let navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSheet, setSelectedSheet] = useState()

  const { sheet, updateSheet } = useSheetContext()

  return (
    <div className="home">
      <div className="home__button-container">
        <button onClick={() => setIsModalOpen(true)}>Select Sheet</button>
        <button
          disabled={!sheet}
          onClick={() => navigate("/ar")}
          className={`${!sheet && "btn-disabled"}`}
        >
          Launch AR
        </button>
      </div>
      <Modal
        title="Select a Sheet"
        open={isModalOpen}
        onOk={() => {
          updateSheet(selectedSheet)
          setIsModalOpen(false)
        }}
        okText="Confirm"
        onCancel={() => setIsModalOpen(false)}
      >
        <Select
          placeholder="Select a sheet"
          optionFilterProp="children"
          onChange={(value) => setSelectedSheet(value)}
          options={[
            {
              value: 0,
              label: "La Dispute - Yann Tiersen",
            },
            {
              value: 1,
              label: "Hammy's Boogie - Hammy Howell",
            },
          ]}
        />
      </Modal>
    </div>
  )
}

export default Home
