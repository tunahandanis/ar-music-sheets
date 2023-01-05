import { Link } from "react-router-dom"
import { SettingOutlined } from "@ant-design/icons"
import logoBlack from "../assets/logo-black.png"
import logoWhite from "../assets/logo-white.png"

const Nav = ({ isAr, openModal }) => {
  return (
    <nav>
      <Link to="/" className={`${isAr && "arNavHome"}`}>
        <img src={isAr ? logoBlack : logoWhite} alt="logo" />
      </Link>
      <SettingOutlined style={{ fontSize: "2rem" }} onClick={openModal} />
    </nav>
  )
}

export default Nav
