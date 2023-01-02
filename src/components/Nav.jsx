import { Link } from "react-router-dom"
import { SettingOutlined } from "@ant-design/icons"

const Nav = ({ isAr, openModal }) => {
  return (
    <nav>
      <Link to="/" className={`${isAr && "arNavHome"}`}>
        Home
      </Link>
      <SettingOutlined style={{ fontSize: "2rem" }} onClick={openModal} />
    </nav>
  )
}

export default Nav
