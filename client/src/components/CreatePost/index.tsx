import { useState } from "react";
import { useSelector } from "react-redux";

import { authSelector } from "@/redux/selectors";

import Modal from "@/common/Modal";
import ProfileImg from "@/common/ProfileImg";
import PostForm from "../PostForm";
import "./style.scss";

function CreatePost() {
  const { user } = useSelector(authSelector);
  const { firstName, profilePicture } = user!;

  const [formVisible, setFormVisible] = useState(false);
  const showForm = () => {
    setFormVisible(true);
  };
  const hideForm = () => {
    setFormVisible(false);
  };

  return (
    <>
      <div className="createPost">
        <div className="top">
          <ProfileImg profilePicture={profilePicture} alt="profile" />
          <button onClick={showForm}>What's on your mind, {firstName}?</button>
        </div>

        <ul className="bottom">
          <li className="todo">
            <img src="/createPost/live.png" alt="live icon" />
            <span>Live video</span>
          </li>
          <li className="todo">
            <img src="/createPost/photo.png" alt="photo icon" />
            <span>Photo/video</span>
          </li>
          <li className="todo">
            <img src="/createPost/feeling.png" alt="feeling icon" />
            <span>Feeling/activity</span>
          </li>
        </ul>
      </div>

      {formVisible && (
        <Modal title="Create post" onCancel={hideForm}>
          <PostForm afterSubmit={hideForm} />
        </Modal>
      )}
    </>
  );
}

export default CreatePost;
