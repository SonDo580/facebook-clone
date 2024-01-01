import { useDispatch } from "react-redux";

import { FaMoon } from "react-icons/fa";
import { MdFeedback, MdHelp, MdSettings } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";

import { logoutInit } from "@/redux/auth/authSlice";

function Account() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutInit());
  };

  return (
    <div className="account">
      <ul className="items">
        <li>
          <img
            src="/samples/profiles/doraemon.png"
            alt="profile"
            className="profile"
          />
          <span className="name">Mon the Mighty Cat</span>
        </li>
        <li className="todo">
          <MdSettings />
          <span>Settings & privacy</span>
        </li>
        <li className="todo">
          <MdHelp />
          <span>Help & support</span>
        </li>
        <li className="todo">
          <FaMoon />
          <span>Display & accessibility</span>
        </li>
        <li className="todo">
          <MdFeedback />
          <span>Give feedback</span>
        </li>
        <li onClick={handleLogout}>
          <IoLogOut />
          <span>Log Out</span>
        </li>
      </ul>
    </div>
  );
}

export default Account;
