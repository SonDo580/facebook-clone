import { useState } from "react";

import Modal from "@/common/Modal";
import "./style.scss";
import PostForm from "./PostForm";

function CreatePost() {
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
          <img src="/samples/profiles/doraemon.png" alt="profile picture" />
          <button onClick={showForm}>What's on your mind, Mon?</button>
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
