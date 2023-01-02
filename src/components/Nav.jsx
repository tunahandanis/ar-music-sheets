import { Link } from "react-router-dom"
import { SettingOutlined } from "@ant-design/icons"

const Nav = ({ isAr }) => {
  return (
    <nav>
      <Link to="/" className={`${isAr && "arNavHome"}`}>
        Home
      </Link>
      <SettingOutlined style={{ fontSize: "2rem" }} />
    </nav>
  )
}

export default Nav
