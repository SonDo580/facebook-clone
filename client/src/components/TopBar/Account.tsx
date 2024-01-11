import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { FaMoon } from "react-icons/fa";
import { MdFeedback, MdHelp, MdSettings } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";

import { logoutInit, resetError } from "@/redux/auth/authSlice";
import { authSelector } from "@/redux/selectors";
import ProfileImg from "@/common/ProfileImg";

function Account() {
  const dispatch = useDispatch();
  const { user, errorMsg } = useSelector(authSelector);
  const { firstName, lastName, profilePicture } = user!;

  const handleLogout = () => {
    dispatch(logoutInit());
  };

  useEffect(() => {
    if (errorMsg) {
      toast.error(errorMsg);
      dispatch(resetError());
    }
  }, [dispatch, errorMsg]);

  return (
    <div className="account">
      <ul className="items">
        <li>
          <ProfileImg
            profilePicture={profilePicture}
            alt="profile"
            className="profile"
          />
          <span className="name">
            {firstName} {lastName}
          </span>
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
