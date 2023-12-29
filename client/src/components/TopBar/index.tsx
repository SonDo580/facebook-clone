import { Link } from "react-router-dom";

import {
  FaAngleDown,
  FaFacebookMessenger,
  FaSearch,
  FaUser,
} from "react-icons/fa";
import {
  MdNotifications,
  MdOutlineHome,
  MdOutlineOndemandVideo,
  MdOutlineStore,
} from "react-icons/md";
import { RiGroup2Line } from "react-icons/ri";
import { CgMenuGridR } from "react-icons/cg";

import { PATHS } from "@/config/paths";
import "./style.scss";

function TopBar() {
  return (
    <header className="topbar">
      <div className="left">
        <Link to={PATHS.home}>
          <img src="/icons/logo.svg" alt="facebook-logo" />
        </Link>
        <div className="search todo">
          <FaSearch />
        </div>
      </div>

      <ul className="middle">
        <li className="active">
          <MdOutlineHome />
        </li>
        <li className="todo">
          <MdOutlineOndemandVideo />
        </li>
        <li className="todo">
          <MdOutlineStore />
        </li>
        <li className="todo">
          <RiGroup2Line />
        </li>
      </ul>

      <ul className="right">
        <li className="todo">
          <CgMenuGridR />
        </li>
        <li className="todo">
          <FaFacebookMessenger />
          <span className="badge">3</span>
        </li>
        <li className="todo">
          <MdNotifications />
          <span className="badge">4</span>
        </li>
        <li className="account">
          <img
            src="/samples/profiles/doraemon.png"
            alt="profile"
            className="profile"
          />
          <span className="down">
            <FaAngleDown />
          </span>
        </li>
      </ul>
    </header>
  );
}

export default TopBar;
